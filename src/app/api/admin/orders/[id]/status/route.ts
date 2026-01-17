/**
 * @file Admin Orders API - Update Status
 * @description Update order status with validations
 * 
 * @owner Dev 1
 * @module admin/orders
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { isValidTransition } from '@/config/order-statuses'
import type { OrderStatus } from '@/types/order'

export async function PUT(
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

    // Get current order
    const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('status')
        .eq('id', params.id)
        .single()

    if (fetchError || !order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Parse request body
    const body = await request.json()
    const newStatus = body.status as OrderStatus

    // Validate transition
    if (!isValidTransition(order.status, newStatus)) {
        return NextResponse.json(
            { error: `Invalid status transition from ${order.status} to ${newStatus}` },
            { status: 400 }
        )
    }

    // Build update payload
    const updateData: Record<string, any> = {
        status: newStatus,
        updated_at: new Date().toISOString(),
    }

    // Add timestamp for specific status changes
    if (newStatus === 'approved') {
        updateData.approved_at = new Date().toISOString()
    } else if (newStatus === 'shipped') {
        updateData.shipped_at = new Date().toISOString()
        if (body.tracking_number) {
            updateData.tracking_number = body.tracking_number
        }
    } else if (newStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString()
    } else if (newStatus === 'paid') {
        updateData.paid_at = new Date().toISOString()
        updateData.payment_status = 'paid'
    } else if (newStatus === 'rejected') {
        if (body.rejection_reason) {
            updateData.rejection_reason = body.rejection_reason
        }
    }

    // Add admin notes if provided
    if (body.admin_notes) {
        updateData.admin_notes = body.admin_notes
    }

    // Update order
    const { error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', params.id)

    if (updateError) {
        console.error('Error updating order:', updateError)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({ success: true, status: newStatus })
}
