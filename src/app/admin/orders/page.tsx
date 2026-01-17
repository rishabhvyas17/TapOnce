/**
 * @file Admin Orders Page - Kanban Board
 * @description Drag-and-drop order management across fulfillment pipeline
 * 
 * @owner Dev 1
 * @module admin/orders
 * 
 * @see ProductRequirementsDocument.txt Section 6.1.1 for Kanban requirements
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/admin/KanbanBoard'
import type { OrderCard } from '@/types/kanban'
import type { OrderStatus } from '@/types/order'

async function getOrders(): Promise<OrderCard[]> {
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

function calculateDaysInStatus(updatedAt: string): number {
    const updated = new Date(updatedAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - updated.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

export default async function AdminOrdersPage() {
    const orders = await getOrders()

    return (
        <div className="h-[calc(100vh-4rem)]">
            <KanbanBoard initialOrders={orders} />
        </div>
    )
}
