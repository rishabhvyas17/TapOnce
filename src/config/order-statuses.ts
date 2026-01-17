/**
 * @file Order Status Definitions
 * @description Order status constants with labels and colors
 * 
 * @owner Dev 1 (primary), Dev 2 (co-owner)
 * @shared Used by Admin and Agent dashboards
 * 
 * @see ProductRequirementsDocument.txt Section 6.1.1 for Kanban columns
 */

import type { OrderStatus } from '@/types/order'

export interface OrderStatusConfig {
    value: OrderStatus
    label: string
    color: string // Tailwind color class
    bgColor: string // Tailwind background class
    icon: string // Emoji or icon name
    description: string
}

/**
 * Order statuses in pipeline order
 */
export const ORDER_STATUSES: OrderStatusConfig[] = [
    {
        value: 'pending_approval',
        label: 'Pending Approval',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
        icon: '⚠️',
        description: 'Order submitted, waiting for admin review',
    },
    {
        value: 'approved',
        label: 'Approved',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
        icon: '✅',
        description: 'Order approved, ready to send to Wekonnect',
    },
    {
        value: 'printing',
        label: 'Printing',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
        icon: '🖨️',
        description: 'Card is being printed by Wekonnect',
    },
    {
        value: 'printed',
        label: 'Printed',
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
        icon: '📦',
        description: 'Card printed, received by admin',
    },
    {
        value: 'ready_to_ship',
        label: 'Ready to Ship',
        color: 'text-indigo-700',
        bgColor: 'bg-indigo-100',
        icon: '📮',
        description: 'NFC written, card packaged',
    },
    {
        value: 'shipped',
        label: 'Shipped',
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
        icon: '🚚',
        description: 'Card shipped to customer',
    },
    {
        value: 'delivered',
        label: 'Delivered',
        color: 'text-teal-700',
        bgColor: 'bg-teal-100',
        icon: '🎉',
        description: 'Card delivered to customer',
    },
    {
        value: 'paid',
        label: 'Paid',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-100',
        icon: '💰',
        description: 'Payment received, order complete',
    },
    {
        value: 'rejected',
        label: 'Rejected',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        icon: '❌',
        description: 'Order rejected by admin',
    },
    {
        value: 'cancelled',
        label: 'Cancelled',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
        icon: '🚫',
        description: 'Order cancelled by agent',
    },
]

/**
 * Kanban column statuses (excludes rejected/cancelled)
 */
export const KANBAN_STATUSES: OrderStatus[] = [
    'pending_approval',
    'approved',
    'printing',
    'printed',
    'ready_to_ship',
    'shipped',
    'delivered',
    'paid',
]

/**
 * Get status config by value
 */
export function getStatusConfig(status: OrderStatus): OrderStatusConfig {
    return ORDER_STATUSES.find((s) => s.value === status) || ORDER_STATUSES[0]
}

/**
 * Valid status transitions
 * Key = current status, Value = allowed next statuses
 */
export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    pending_approval: ['approved', 'rejected'],
    approved: ['printing'],
    printing: ['printed'],
    printed: ['ready_to_ship'],
    ready_to_ship: ['shipped'],
    shipped: ['delivered'],
    delivered: ['paid'],
    paid: [],
    rejected: [],
    cancelled: [],
}

/**
 * Check if status transition is valid
 */
export function isValidTransition(from: OrderStatus, to: OrderStatus): boolean {
    return STATUS_TRANSITIONS[from]?.includes(to) || false
}

/**
 * Get valid transition statuses from current status
 */
export function getValidTransitions(status: OrderStatus): OrderStatus[] {
    return STATUS_TRANSITIONS[status] || []
}

/**
 * Payment status type
 */
export type PaymentStatus = 'pending' | 'advance_paid' | 'paid' | 'cod'

