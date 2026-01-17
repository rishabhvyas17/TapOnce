/**
 * @file Kanban Column Component
 * @description Column in the Kanban board displaying orders of a specific status
 * 
 * @owner Dev 1
 * @module admin/orders
 */

'use client'

import { OrderCard } from './OrderCard'
import type { OrderCard as OrderCardType } from '@/types/kanban'
import type { OrderStatus } from '@/types/order'
import { getStatusConfig } from '@/config/order-statuses'

interface KanbanColumnProps {
    status: OrderStatus
    orders: OrderCardType[]
    onOrderClick: (order: OrderCardType) => void
    onDrop?: (orderId: string, newStatus: OrderStatus) => void
}

export function KanbanColumn({
    status,
    orders,
    onOrderClick,
    onDrop,
}: KanbanColumnProps) {
    const config = getStatusConfig(status)
    const orderCount = orders.length

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.currentTarget.classList.add('bg-blue-50')
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('bg-blue-50')
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.currentTarget.classList.remove('bg-blue-50')
        const orderId = e.dataTransfer.getData('orderId')
        if (orderId && onDrop) {
            onDrop(orderId, status)
        }
    }

    return (
        <div
            className="flex-shrink-0 w-72 bg-gray-50 rounded-lg flex flex-col max-h-full"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Column Header */}
            <div
                className={`p-3 border-b flex items-center gap-2 sticky top-0 bg-gray-50 rounded-t-lg z-10 border-l-4 ${config.color.replace('text-', 'border-')}`}
            >
                <span className="text-lg">{config.icon}</span>
                <h3 className="font-semibold text-gray-700 flex-1">{config.label}</h3>
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}
                >
                    {orderCount}
                </span>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {orders.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No orders
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData('orderId', order.id)
                            }}
                        >
                            <OrderCard order={order} onClick={() => onOrderClick(order)} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
