/**
 * @file Order Types for Kanban
 * @description Extended order types for the Kanban board
 * 
 * @owner Dev 1
 * @module admin/orders
 */

import type { OrderStatus, PaymentStatus } from '@/types/order'

export interface OrderCard {
    id: string
    orderNumber: number
    customerName: string
    customerCompany?: string
    customerPhone: string
    customerPhotoUrl?: string
    cardDesignName: string
    salePrice: number
    commissionAmount: number
    status: OrderStatus
    paymentStatus: PaymentStatus
    isDirectSale: boolean
    isBelowMsp: boolean
    agentName?: string
    agentReferralCode?: string
    createdAt: string
    updatedAt: string
    daysInStatus: number
}

export interface KanbanColumn {
    id: OrderStatus
    title: string
    color: string
    icon: string
    orders: OrderCard[]
}

export interface OrderDetail extends OrderCard {
    customerEmail: string
    customerWhatsapp?: string
    line1Text?: string
    line2Text?: string
    mspAtOrder: number
    overrideCommission: number
    portfolioSlug?: string
    shippingAddress?: {
        line1: string
        line2?: string
        city: string
        state: string
        pincode: string
    }
    trackingNumber?: string
    specialInstructions?: string
    adminNotes?: string
    rejectionReason?: string
    approvedAt?: string
    shippedAt?: string
    deliveredAt?: string
    paidAt?: string
}
