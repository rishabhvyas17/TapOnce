/**
 * @file Kanban Board Component
 * @description Main Kanban board for order management
 * 
 * @owner Dev 1
 * @module admin/orders
 */

'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { KanbanColumn } from './KanbanColumn'
import { OrderDetailModal } from './OrderDetailModal'
import type { OrderCard, OrderDetail } from '@/types/kanban'
import type { OrderStatus } from '@/types/order'
import { KANBAN_STATUSES } from '@/config/order-statuses'

interface KanbanBoardProps {
    initialOrders: OrderCard[]
}

export function KanbanBoard({ initialOrders }: KanbanBoardProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [orders, setOrders] = useState<OrderCard[]>(initialOrders)
    const [selectedOrder, setSelectedOrder] = useState<OrderCard | null>(null)
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null)
    const [filterAgent, setFilterAgent] = useState<string>('')
    const [filterPayment, setFilterPayment] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState('')

    // Group orders by status
    const ordersByStatus = useMemo(() => {
        let filtered = orders

        // Apply filters
        if (filterAgent) {
            filtered = filtered.filter((o) =>
                filterAgent === 'direct' ? o.isDirectSale : o.agentReferralCode === filterAgent
            )
        }
        if (filterPayment) {
            filtered = filtered.filter((o) => o.paymentStatus === filterPayment)
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (o) =>
                    o.customerName.toLowerCase().includes(query) ||
                    o.orderNumber.toString().includes(query) ||
                    o.customerPhone.includes(query)
            )
        }

        return KANBAN_STATUSES.reduce((acc, status) => {
            acc[status] = filtered.filter((o) => o.status === status)
            return acc
        }, {} as Record<OrderStatus, OrderCard[]>)
    }, [orders, filterAgent, filterPayment, searchQuery])

    // Get unique agents for filter
    const uniqueAgents = useMemo(() => {
        const agents = new Set<string>()
        orders.forEach((o) => {
            if (o.agentReferralCode) agents.add(o.agentReferralCode)
        })
        return Array.from(agents).sort()
    }, [orders])

    // Handle order click
    const handleOrderClick = async (order: OrderCard) => {
        setSelectedOrder(order)
        // Fetch full details
        try {
            const res = await fetch(`/api/admin/orders/${order.id}`)
            const data = await res.json()
            setOrderDetail(data)
        } catch (error) {
            console.error('Error fetching order details:', error)
        }
    }

    // Handle status change
    const handleStatusChange = async (newStatus: OrderStatus, additionalData?: any) => {
        if (!selectedOrder) return

        try {
            const res = await fetch(`/api/admin/orders/${selectedOrder.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, ...additionalData }),
            })

            if (res.ok) {
                // Update local state
                setOrders((prev) =>
                    prev.map((o) =>
                        o.id === selectedOrder.id ? { ...o, status: newStatus } : o
                    )
                )
                setSelectedOrder(null)
                setOrderDetail(null)

                // Refresh data
                startTransition(() => {
                    router.refresh()
                })
            }
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    // Handle drag and drop
    const handleDrop = async (orderId: string, newStatus: OrderStatus) => {
        const order = orders.find((o) => o.id === orderId)
        if (!order || order.status === newStatus) return

        // Optimistically update UI
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        )

        // Call API
        try {
            const res = await fetch(`/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })

            if (!res.ok) {
                // Revert on failure
                setOrders((prev) =>
                    prev.map((o) => (o.id === orderId ? { ...o, status: order.status } : o))
                )
            } else {
                startTransition(() => {
                    router.refresh()
                })
            }
        } catch (error) {
            // Revert on error
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status: order.status } : o))
            )
        }
    }

    // Stats
    const totalOrders = orders.length
    const pendingOrders = ordersByStatus.pending_approval?.length || 0
    const todayRevenue = orders
        .filter((o) => o.status === 'delivered' || o.status === 'paid')
        .reduce((sum, o) => sum + o.salePrice, 0)

    return (
        <div className="flex flex-col h-full">
            {/* Header with Stats */}
            <div className="p-4 bg-white border-b">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    {/* Stats */}
                    <div className="flex gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold">{totalOrders}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Approval</p>
                            <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue (Delivered)</p>
                            <p className="text-2xl font-bold text-green-600">
                                ₹{todayRevenue.toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3 flex-wrap">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm w-48"
                        />

                        {/* Agent Filter */}
                        <select
                            value={filterAgent}
                            onChange={(e) => setFilterAgent(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">All Agents</option>
                            <option value="direct">Direct Sales</option>
                            {uniqueAgents.map((agent) => (
                                <option key={agent} value={agent}>
                                    {agent}
                                </option>
                            ))}
                        </select>

                        {/* Payment Filter */}
                        <select
                            value={filterPayment}
                            onChange={(e) => setFilterPayment(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">All Payments</option>
                            <option value="pending">Pending</option>
                            <option value="advance_paid">Advance Paid</option>
                            <option value="paid">Paid</option>
                            <option value="cod">COD</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto p-4">
                <div className="flex gap-4 h-full min-w-max">
                    {KANBAN_STATUSES.map((status) => (
                        <KanbanColumn
                            key={status}
                            status={status}
                            orders={ordersByStatus[status] || []}
                            onOrderClick={handleOrderClick}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>
            </div>

            {/* Order Detail Modal */}
            {orderDetail && (
                <OrderDetailModal
                    order={orderDetail}
                    isOpen={!!orderDetail}
                    onClose={() => {
                        setSelectedOrder(null)
                        setOrderDetail(null)
                    }}
                    onStatusChange={handleStatusChange}
                />
            )}

            {/* Loading Overlay */}
            {isPending && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40">
                    <div className="bg-white rounded-lg px-6 py-4 shadow-lg">
                        Updating...
                    </div>
                </div>
            )}
        </div>
    )
}
