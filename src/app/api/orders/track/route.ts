/**
 * @file Track Order API Route
 * @description Allows customers to track their order status using order number + email
 * 
 * @owner Dev 1
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

interface TrackOrderRequest {
    orderNumber: string
    email: string
}

export async function POST(request: NextRequest) {
    try {
        const { orderNumber, email }: TrackOrderRequest = await request.json()

        if (!orderNumber || !email) {
            return NextResponse.json(
                { error: 'Order number and email are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            )
        }

        // Parse order number (remove # prefix if present)
        const cleanOrderNumber = orderNumber.replace(/^#/, '').trim()

        const supabase = createAdminClient()

        // Find order by order number and customer email
        const { data: order, error } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                customer_name,
                customer_email,
                status,
                payment_status,
                sale_price,
                line1_text,
                line2_text,
                shipping_address,
                tracking_number,
                portfolio_slug,
                created_at,
                approved_at,
                shipped_at,
                delivered_at,
                is_direct_sale,
                special_instructions
            `)
            .eq('order_number', cleanOrderNumber)
            .ilike('customer_email', email.trim())
            .single()

        if (error || !order) {
            return NextResponse.json(
                { error: 'Order not found. Please check your order number and email.' },
                { status: 404 }
            )
        }

        // Build status timeline
        const timeline = buildStatusTimeline(order)

        return NextResponse.json({
            success: true,
            order: {
                orderNumber: order.order_number,
                customerName: order.customer_name,
                status: order.status,
                statusLabel: getStatusLabel(order.status),
                paymentStatus: order.payment_status,
                total: order.sale_price,
                cardDetails: {
                    line1: order.line1_text,
                    line2: order.line2_text
                },
                shippingAddress: order.shipping_address,
                trackingNumber: order.tracking_number,
                profileSlug: order.portfolio_slug,
                timeline,
                estimatedDelivery: getEstimatedDelivery(order)
            }
        })

    } catch (error) {
        console.error('Track order error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}

// Helper: Get human-readable status label
function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        'pending_approval': 'Order Received',
        'approved': 'Order Confirmed',
        'printing': 'Card Being Printed',
        'printed': 'Card Ready',
        'ready_to_ship': 'Ready for Dispatch',
        'shipped': 'Shipped',
        'delivered': 'Delivered',
        'paid': 'Completed',
        'rejected': 'Order Rejected',
        'cancelled': 'Order Cancelled'
    }
    return labels[status] || status
}

// Helper: Build timeline of order events
function buildStatusTimeline(order: any): Array<{
    status: string
    label: string
    completed: boolean
    date?: string
}> {
    const statusOrder = [
        'pending_approval',
        'approved',
        'printing',
        'ready_to_ship',
        'shipped',
        'delivered'
    ]

    const currentIndex = statusOrder.indexOf(order.status)

    return statusOrder.map((status, index) => {
        let date: string | undefined

        // Add actual dates where we have them
        if (status === 'pending_approval') {
            date = order.created_at
        } else if (status === 'approved') {
            date = order.approved_at
        } else if (status === 'shipped') {
            date = order.shipped_at
        } else if (status === 'delivered') {
            date = order.delivered_at
        }

        return {
            status,
            label: getStatusLabel(status),
            completed: index <= currentIndex,
            date
        }
    })
}

// Helper: Calculate estimated delivery
function getEstimatedDelivery(order: any): string | null {
    // If already delivered or cancelled, no estimate needed
    if (['delivered', 'paid', 'rejected', 'cancelled'].includes(order.status)) {
        return null
    }

    // Calculate based on order creation date
    const createdAt = new Date(order.created_at)
    const estimatedDate = new Date(createdAt)
    estimatedDate.setDate(estimatedDate.getDate() + 7) // 5-7 business days

    const today = new Date()
    if (estimatedDate < today) {
        // Already past estimated, show "Soon"
        return 'Soon'
    }

    return estimatedDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    })
}
