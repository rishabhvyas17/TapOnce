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

import { useState } from 'react'
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
    QrCode,
    ArrowRight,
    CheckCircle
} from 'lucide-react'

// Mock agent data - will be replaced with real data from Supabase
const mockAgentData = {
    name: 'Prince Yadav',
    referralCode: 'PRINCE10',
    totalSales: 42,
    totalEarnings: 12600,
    availableBalance: 2300,
    amountReceived: 10300
}

// Mock recent orders
const mockRecentOrders = [
    { id: '1', orderNumber: 12050, customerName: 'Rahul Verma', status: 'pending_approval', amount: 800, date: '2 hours ago' },
    { id: '2', orderNumber: 12049, customerName: 'Priya Sharma', status: 'approved', amount: 750, date: '1 day ago' },
    { id: '3', orderNumber: 12048, customerName: 'Amit Kumar', status: 'delivered', amount: 900, date: '3 days ago' },
]

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

export default function AgentDashboard() {
    const [copied, setCopied] = useState(false)
    const agent = mockAgentData

    const handleCopyCode = () => {
        navigator.clipboard.writeText(agent.referralCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = () => {
        const shareUrl = `https://taponce.in/agent-signup?ref=${agent.referralCode}`
        const message = `Join TapOnce as a Sales Agent! Use my referral code: ${agent.referralCode}\n\nSign up here: ${shareUrl}`
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold">Welcome back, {agent.name}!</h1>
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
                    <p className="text-3xl font-bold">{formatCurrency(agent.amountReceived)}</p>
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
                    {mockRecentOrders.map((order) => (
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
                                    <p className="font-medium">{formatCurrency(order.amount)}</p>
                                    <p className="text-xs text-muted-foreground">{order.date}</p>
                                </div>
                                <Badge className={statusColors[order.status]}>
                                    {statusLabels[order.status]}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
