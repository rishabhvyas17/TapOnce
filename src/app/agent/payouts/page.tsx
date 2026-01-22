/**
 * @file Payout Management
 * @description View balance and request withdrawals
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.7
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Wallet,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    ArrowUpRight,
    CreditCard,
    Banknote
} from 'lucide-react'
import { getAgentByProfileId, getAgentPayouts, Agent } from '@/lib/services/agents'
import { createClient } from '@/lib/supabase/client'

interface Payout {
    id: string
    amount: number
    paymentMethod: string | null
    status: string
    createdAt: string
    adminNotes: string | null
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

function formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const paymentMethodIcons: Record<string, typeof CreditCard> = {
    'upi': CreditCard,
    'bank_transfer': Banknote,
    'cash': DollarSign
}

const paymentMethodLabels: Record<string, string> = {
    'upi': 'UPI',
    'bank_transfer': 'Bank Transfer',
    'cash': 'Cash'
}

export default function PayoutManagementPage() {
    const [loading, setLoading] = useState(true)
    const [agent, setAgent] = useState<Agent | null>(null)
    const [payouts, setPayouts] = useState<Payout[]>([])
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [isRequesting, setIsRequesting] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    // Fetch agent data and payout history
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const agentData = await getAgentByProfileId(user.id)
                if (agentData) {
                    setAgent(agentData)
                    const payoutHistory = await getAgentPayouts(agentData.id)
                    setPayouts(payoutHistory)
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleRequestPayout = async () => {
        if (!agent || agent.availableBalance <= 0) return

        setIsRequesting(true)
        // For now, just show success - in real app would call API to create payout request
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsRequesting(false)
        setShowRequestModal(false)
        setShowSuccessModal(true)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading payout data...</div>
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

    // Calculate totals
    const totalWithdrawn = payouts
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0)
    const pendingBalance = agent.totalEarnings - agent.availableBalance - totalWithdrawn

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Payouts</h1>
                <p className="text-muted-foreground">View your earnings and request withdrawals</p>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Available Balance - Main Card */}
                <div className="md:col-span-2 p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/20">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg text-white/90">Available Balance</span>
                    </div>
                    <p className="text-4xl font-bold">{formatCurrency(agent.availableBalance)}</p>
                    <p className="text-sm text-white/70 mt-2">Ready to withdraw</p>

                    <Button
                        variant="secondary"
                        size="lg"
                        className="mt-4 w-full sm:w-auto"
                        onClick={() => setShowRequestModal(true)}
                        disabled={agent.availableBalance <= 0}
                    >
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Request Payout
                    </Button>
                </div>

                {/* Pending Balance */}
                <div className="p-5 bg-white rounded-xl border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-yellow-100">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Pending</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(Math.max(0, pendingBalance))}</p>
                    <p className="text-xs text-muted-foreground mt-1">From unpaid orders</p>
                </div>

                {/* Total Earnings */}
                <div className="p-5 bg-white rounded-xl border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Earnings</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(agent.totalEarnings)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime commission</p>
                </div>
            </div>

            {/* Withdrawal Summary */}
            <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                <div>
                    <p className="text-sm text-blue-700">Total Withdrawn</p>
                    <p className="text-xl font-bold text-blue-800">{formatCurrency(totalWithdrawn)}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-blue-700">Payouts Made</p>
                    <p className="text-xl font-bold text-blue-800">{payouts.filter(p => p.status === 'completed').length}</p>
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-xl border">
                <div className="p-4 border-b">
                    <h3 className="font-semibold">Payout History</h3>
                </div>

                {payouts.length === 0 ? (
                    <div className="p-8 text-center">
                        <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No payouts yet</h3>
                        <p className="text-muted-foreground">
                            Your payout history will appear here
                        </p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {payouts.map((payout) => {
                            const PaymentIcon = paymentMethodIcons[payout.paymentMethod || 'upi'] || CreditCard
                            const methodLabel = paymentMethodLabels[payout.paymentMethod || 'upi'] || payout.paymentMethod || 'Unknown'

                            return (
                                <div
                                    key={payout.id}
                                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50"
                                >
                                    {/* Left - Payout Info */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${payout.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                                            }`}>
                                            {payout.status === 'completed' ? (
                                                <CheckCircle className="w-6 h-6 text-green-600" />
                                            ) : (
                                                <Clock className="w-6 h-6 text-yellow-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">{formatCurrency(payout.amount)}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <PaymentIcon className="w-4 h-4" />
                                                <span>{methodLabel}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center - Details */}
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">{payout.adminNotes || 'No notes'}</p>
                                    </div>

                                    {/* Right - Date & Status */}
                                    <div className="text-right">
                                        <Badge className={payout.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                            {payout.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDate(payout.createdAt)} at {formatTime(payout.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Request Payout Modal */}
            <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Payout</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="p-4 bg-green-50 rounded-lg text-center mb-4">
                            <p className="text-sm text-green-700">Amount to Withdraw</p>
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(agent.availableBalance)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Admin will process your payout via UPI, Bank Transfer, or Cash.
                            You'll receive a notification once completed.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRequestModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleRequestPayout} disabled={isRequesting}>
                            {isRequesting ? 'Requesting...' : 'Request Payout'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            Payout Requested!
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 text-center">
                        <p className="text-4xl font-bold text-green-600 mb-2">
                            {formatCurrency(agent.availableBalance)}
                        </p>
                        <p className="text-muted-foreground">
                            Your payout request has been sent to admin.
                            You'll be notified once it's processed.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowSuccessModal(false)} className="w-full">
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
