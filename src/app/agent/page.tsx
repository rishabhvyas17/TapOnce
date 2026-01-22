/**
 * @file Agent Dashboard Home
 * @description Overview page for agents with stats and quick actions
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.1 for agent dashboard requirements
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    ShoppingCart,
    TrendingUp,
    Wallet,
    CreditCard,
    Plus,
    ListOrdered,
    DollarSign,
    Copy,
    Share2,
    CheckCircle,
    ArrowRight
} from 'lucide-react'
import { getAgentByProfileId, Agent } from '@/lib/services/agents'
import { getRecentOrdersByAgentId, OrderListItem } from '@/lib/services/orders'
import { createClient } from '@/lib/supabase/client'

const statusColors: Record<string, string> = {
    pending_approval: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    printing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-orange-100 text-orange-800',
    delivered: 'bg-teal-100 text-teal-800',
    paid: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800'
}

const statusLabels: Record<string, string> = {
    pending_approval: 'Pending',
    approved: 'Approved',
    printing: 'Printing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    paid: 'Paid',
    rejected: 'Rejected'
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
}

export default function AgentDashboard() {
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(true)
    const [agent, setAgent] = useState<Agent | null>(null)
    const [recentOrders, setRecentOrders] = useState<OrderListItem[]>([])

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const agentData = await getAgentByProfileId(user.id)
                if (agentData) {
                    setAgent(agentData)
                    const orders = await getRecentOrdersByAgentId(agentData.id, 5)
                    setRecentOrders(orders)
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleCopyCode = () => {
        if (agent) {
            navigator.clipboard.writeText(agent.referralCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleShare = () => {
        if (agent) {
            const shareUrl = `https://taponce.in/agent-signup?ref=${agent.referralCode}`
            const message = `Join TapOnce as a Sales Agent! Use my referral code: ${agent.referralCode}\n\nSign up here: ${shareUrl}`
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading your dashboard...</div>
            </div>
        )
    }

    if (!agent) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Unable to load agent data</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )
    }

    // Calculate amount received (total earnings - available balance)
    const amountReceived = agent.totalEarnings - agent.availableBalance

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold">Welcome back, {agent.fullName}!</h1>
                <p className="text-muted-foreground">Here's your sales overview</p>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Sales */}
                <div className="p-5 bg-white rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Sales</span>
                    </div>
                    <p className="text-3xl font-bold">{agent.totalSales}</p>
                    <p className="text-xs text-muted-foreground mt-1">Cards sold lifetime</p>
                </div>

                {/* Total Earnings */}
                <div className="p-5 bg-white rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-green-100">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Earnings</span>
                    </div>
                    <p className="text-3xl font-bold">{formatCurrency(agent.totalEarnings)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime commission</p>
                </div>

                {/* Available Balance */}
                <div className="p-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl text-white shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white/20">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm text-white/80">Available Balance</span>
                    </div>
                    <p className="text-3xl font-bold">{formatCurrency(agent.availableBalance)}</p>
                    <p className="text-xs text-white/70 mt-1">Ready to withdraw</p>
                </div>

                {/* Amount Received */}
                <div className="p-5 bg-white rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <CreditCard className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Amount Received</span>
                    </div>
                    <p className="text-3xl font-bold">{formatCurrency(amountReceived)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total payouts</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/agent/orders/new">
                    <Button className="w-full h-14 text-lg" size="lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Submit New Order
                    </Button>
                </a>
                <a href="/agent/orders">
                    <Button variant="outline" className="w-full h-14 text-lg" size="lg">
                        <ListOrdered className="w-5 h-5 mr-2" />
                        View My Orders
                    </Button>
                </a>
                <a href="/agent/payouts">
                    <Button variant="outline" className="w-full h-14 text-lg" size="lg">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Request Payout
                    </Button>
                </a>
            </div>

            {/* Referral Code Section */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-medium opacity-90">Your Referral Code</h3>
                        <p className="text-4xl font-bold mt-2 tracking-wider">{agent.referralCode}</p>
                        <p className="text-sm opacity-70 mt-2">Share with potential sub-agents to earn override commissions</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={handleCopyCode}
                            className="gap-2"
                        >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy Code'}
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={handleShare}
                            className="gap-2"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-semibold">Recent Orders</h3>
                    <a href="/agent/orders" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
                <div className="divide-y">
                    {recentOrders.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No orders yet. Submit your first order to get started!
                        </div>
                    ) : (
                        recentOrders.map((order) => (
                            <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            {order.customerName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{order.customerName}</p>
                                        <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-medium">{formatCurrency(order.salePrice)}</p>
                                        <p className="text-xs text-muted-foreground">{formatRelativeTime(order.createdAt)}</p>
                                    </div>
                                    <Badge className={statusColors[order.status] || 'bg-gray-100'}>
                                        {statusLabels[order.status] || order.status}
                                    </Badge>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
