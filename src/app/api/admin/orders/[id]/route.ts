/**
 * @file Admin Orders API - Get Order by ID
 * @description Fetch single order details
 * 
 * @owner Dev 1
 * @module admin/orders
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const supabase = createServerSupabaseClient()

    // Verify admin role
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch order
    const { data: order, error } = await supabase
        .from('orders')
        .select(`
            *,
            card_designs (name),
            agents (
                referral_code,
                profiles (full_name)
            )
        `)
        .eq('id', params.id)
        .single()

    if (error || !order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Transform to frontend format
    const transformedOrder = {
        id: order.id,
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerCompany: order.customer_company,
        customerPhone: order.customer_phone,
        customerEmail: order.customer_email,
        customerWhatsapp: order.customer_whatsapp,
        customerPhotoUrl: order.customer_photo_url,
        cardDesignName: order.card_designs?.name || 'Unknown',
        salePrice: parseFloat(order.sale_price),
        mspAtOrder: parseFloat(order.msp_at_order),
        commissionAmount: parseFloat(order.commission_amount || 0),
        overrideCommission: parseFloat(order.override_commission || 0),
        status: order.status,
        paymentStatus: order.payment_status,
        isDirectSale: order.is_direct_sale,
        isBelowMsp: order.is_below_msp,
        agentName: order.agents?.profiles?.full_name,
        agentReferralCode: order.agents?.referral_code,
        line1Text: order.line1_text,
        line2Text: order.line2_text,
        portfolioSlug: order.portfolio_slug,
        shippingAddress: order.shipping_address,
        trackingNumber: order.tracking_number,
        specialInstructions: order.special_instructions,
        adminNotes: order.admin_notes,
        rejectionReason: order.rejection_reason,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        approvedAt: order.approved_at,
        shippedAt: order.shipped_at,
        deliveredAt: order.delivered_at,
        paidAt: order.paid_at,
        daysInStatus: calculateDaysInStatus(order.updated_at),
    }

    return NextResponse.json(transformedOrder)
}

function calculateDaysInStatus(updatedAt: string): number {
    const updated = new Date(updatedAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - updated.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}
