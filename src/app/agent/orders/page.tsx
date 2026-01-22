/**
 * @file Agent Orders List
 * @description Order tracking page for agents
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.3
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Plus,
    Search,
    Phone,
    Eye,
    RefreshCw,
    X,
    Package
} from 'lucide-react'
import { getAgentByProfileId } from '@/lib/services/agents'
import { getOrders, OrderListItem } from '@/lib/services/orders'
import { createClient } from '@/lib/supabase/client'

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
    pending_approval: { label: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: '✅' },
    printing: { label: 'Printing', color: 'bg-blue-100 text-blue-800', icon: '🖨️' },
    printed: { label: 'Printed', color: 'bg-purple-100 text-purple-800', icon: '📦' },
    shipped: { label: 'Shipped', color: 'bg-orange-100 text-orange-800', icon: '🚚' },
    delivered: { label: 'Delivered', color: 'bg-teal-100 text-teal-800', icon: '🎉' },
    paid: { label: 'Paid', color: 'bg-emerald-100 text-emerald-800', icon: '💰' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: '❌' },
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

function getTimeAgo(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return formatDate(dateString)
}

export default function AgentOrdersPage() {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState<OrderListItem[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [dateFilter, setDateFilter] = useState('all')

    // Fetch orders for current agent
    useEffect(() => {
        async function fetchOrders() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const agent = await getAgentByProfileId(user.id)
                if (agent) {
                    const response = await getOrders({ agentId: agent.id })
                    setOrders(response.orders)
                }
            }
            setLoading(false)
        }
        fetchOrders()
    }, [])

    // Filter orders (client-side)
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            // Search filter
            const matchesSearch =
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.orderNumber.toString().includes(searchQuery)

            // Status filter
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter

            // Date filter
            let matchesDate = true
            if (dateFilter === '7days') {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                matchesDate = new Date(order.createdAt) >= weekAgo
            } else if (dateFilter === '30days') {
                const monthAgo = new Date()
                monthAgo.setDate(monthAgo.getDate() - 30)
                matchesDate = new Date(order.createdAt) >= monthAgo
            }

            return matchesSearch && matchesStatus && matchesDate
        })
    }, [orders, searchQuery, statusFilter, dateFilter])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading orders...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Orders</h1>
                    <p className="text-muted-foreground">Track and manage your submitted orders</p>
                </div>
                <a href="/agent/orders/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Submit New Order
                    </Button>
                </a>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or order #..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending_approval">Pending Approval</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="printing">Printing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">No orders found</h3>
                    <p className="text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== 'all'
                            ? 'Try adjusting your filters'
                            : 'Submit your first order to get started'}
                    </p>
                    {!searchQuery && statusFilter === 'all' && (
                        <a href="/agent/orders/new">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Submit New Order
                            </Button>
                        </a>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => {
                        const status = statusConfig[order.status] || { label: order.status, color: 'bg-gray-100', icon: '📋' }

                        return (
                            <div
                                key={order.id}
                                className={`bg-white rounded-xl border p-4 hover:shadow-md transition-shadow ${order.isBelowMsp ? 'border-yellow-300 bg-yellow-50/50' : ''
                                    }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    {/* Left - Order Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                                            {status.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{order.customerName}</h3>
                                                {order.isBelowMsp && (
                                                    <Badge variant="outline" className="text-yellow-600 border-yellow-400 text-xs">
                                                        Below MSP
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Order #{order.orderNumber} • {order.cardDesign?.name || 'Unknown Design'}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {getTimeAgo(order.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center - Price & Commission */}
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground">Sale Price</p>
                                            <p className="font-bold">{formatCurrency(order.salePrice)}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground">Commission</p>
                                            <p className={`font-bold ${order.commissionAmount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                                                {order.commissionAmount > 0 ? formatCurrency(order.commissionAmount) : '—'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right - Status & Actions */}
                                    <div className="flex items-center gap-3">
                                        <Badge className={status.color}>
                                            {status.label}
                                        </Badge>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" title="Call Customer">
                                                <a href={`tel:${order.customerPhone}`}>
                                                    <Phone className="w-4 h-4" />
                                                </a>
                                            </Button>
                                            {order.status === 'rejected' && (
                                                <Button variant="outline" size="icon" title="Resubmit">
                                                    <RefreshCw className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {order.status === 'pending_approval' && (
                                                <Button variant="outline" size="icon" title="Cancel" className="text-red-500 hover:text-red-600">
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
