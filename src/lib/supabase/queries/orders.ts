/**
 * @file Order Queries
 * @description Supabase queries for orders
 * 
 * @owner Dev 1
 * @module admin/orders
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { OrderCard, OrderDetail } from '@/types/kanban'
import type { OrderStatus } from '@/config/order-statuses'

/**
 * Fetch all orders for admin Kanban board
 */
export async function getOrdersForKanban(): Promise<OrderCard[]> {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
        .from('orders')
        .select(`
      id,
      order_number,
      customer_name,
      customer_company,
      customer_phone,
      customer_photo_url,
      card_design_id,
      sale_price,
      commission_amount,
      status,
      payment_status,
      is_direct_sale,
      is_below_msp,
      agent_id,
      created_at,
      updated_at,
      card_designs (
        name
      ),
      agents (
        referral_code,
        profiles (
          full_name
        )
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching orders:', error)
        return []
    }

    return (data || []).map((order: any) => ({
        id: order.id,
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerCompany: order.customer_company,
        customerPhone: order.customer_phone,
        customerPhotoUrl: order.customer_photo_url,
        cardDesignName: order.card_designs?.name || 'Unknown',
        salePrice: parseFloat(order.sale_price),
        commissionAmount: parseFloat(order.commission_amount || 0),
        status: order.status as OrderStatus,
        paymentStatus: order.payment_status,
        isDirectSale: order.is_direct_sale,
        isBelowMsp: order.is_below_msp,
        agentName: order.agents?.profiles?.full_name,
        agentReferralCode: order.agents?.referral_code,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        daysInStatus: calculateDaysInStatus(order.updated_at),
    }))
}

/**
 * Fetch single order details
 */
export async function getOrderById(orderId: string): Promise<OrderDetail | null> {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      card_designs (name),
      agents (
        referral_code,
        profiles (full_name)
      )
    `)
        .eq('id', orderId)
        .single()

    if (error || !data) {
        console.error('Error fetching order:', error)
        return null
    }

    return {
        id: data.id,
        orderNumber: data.order_number,
        customerName: data.customer_name,
        customerCompany: data.customer_company,
        customerPhone: data.customer_phone,
        customerEmail: data.customer_email,
        customerWhatsapp: data.customer_whatsapp,
        customerPhotoUrl: data.customer_photo_url,
        cardDesignName: data.card_designs?.name || 'Unknown',
        salePrice: parseFloat(data.sale_price),
        mspAtOrder: parseFloat(data.msp_at_order),
        commissionAmount: parseFloat(data.commission_amount || 0),
        overrideCommission: parseFloat(data.override_commission || 0),
        status: data.status as OrderStatus,
        paymentStatus: data.payment_status,
        isDirectSale: data.is_direct_sale,
        isBelowMsp: data.is_below_msp,
        agentName: data.agents?.profiles?.full_name,
        agentReferralCode: data.agents?.referral_code,
        line1Text: data.line1_text,
        line2Text: data.line2_text,
        portfolioSlug: data.portfolio_slug,
        shippingAddress: data.shipping_address,
        trackingNumber: data.tracking_number,
        specialInstructions: data.special_instructions,
        adminNotes: data.admin_notes,
        rejectionReason: data.rejection_reason,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        approvedAt: data.approved_at,
        shippedAt: data.shipped_at,
        deliveredAt: data.delivered_at,
        paidAt: data.paid_at,
        daysInStatus: calculateDaysInStatus(data.updated_at),
    }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    additionalData?: Partial<{
        tracking_number: string
        admin_notes: string
        rejection_reason: string
    }>
): Promise<boolean> {
    const supabase = createServerSupabaseClient()

    const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
    }

    // Add timestamp for specific status changes
    if (newStatus === 'approved') {
        updateData.approved_at = new Date().toISOString()
    } else if (newStatus === 'shipped') {
        updateData.shipped_at = new Date().toISOString()
    } else if (newStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString()
    } else if (newStatus === 'paid') {
        updateData.paid_at = new Date().toISOString()
    }

    if (additionalData) {
        Object.assign(updateData, additionalData)
    }

    const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)

    if (error) {
        console.error('Error updating order status:', error)
        return false
    }

    return true
}

/**
 * Calculate days since last update
 */
function calculateDaysInStatus(updatedAt: string): number {
    const updated = new Date(updatedAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - updated.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}
