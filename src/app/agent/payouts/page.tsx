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

import { useState } from 'react'
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

// Mock agent balance data
const mockBalanceData = {
    availableBalance: 2300,
    pendingBalance: 450, // From orders not yet "Paid"
    totalEarnings: 12600,
    totalWithdrawn: 10300
}

// Mock payout history
const mockPayoutHistory = [
    {
        id: '1',
        amount: 2000,
        paymentMethod: 'UPI',
        status: 'completed',
        requestedAt: '2026-01-15T10:00:00Z',
        completedAt: '2026-01-15T14:30:00Z',
        adminNotes: 'Paid via UPI to prince@oksbi'
    },
    {
        id: '2',
        amount: 3500,
        paymentMethod: 'Bank Transfer',
        status: 'completed',
        requestedAt: '2026-01-05T09:00:00Z',
        completedAt: '2026-01-06T11:00:00Z',
        adminNotes: 'NEFT to HDFC acc ending 4521'
    },
    {
        id: '3',
        amount: 1800,
        paymentMethod: 'Cash',
        status: 'completed',
        requestedAt: '2025-12-28T16:00:00Z',
        completedAt: '2025-12-28T18:00:00Z',
        adminNotes: 'Cash handover at office'
    },
    {
        id: '4',
        amount: 3000,
        paymentMethod: 'UPI',
        status: 'completed',
        requestedAt: '2025-12-15T11:00:00Z',
        completedAt: '2025-12-15T15:00:00Z',
        adminNotes: 'Paid via UPI to prince@oksbi'
    },
]

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
    'UPI': CreditCard,
    'Bank Transfer': Banknote,
    'Cash': DollarSign
}

export default function PayoutManagementPage() {
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [isRequesting, setIsRequesting] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const balance = mockBalanceData

    const handleRequestPayout = async () => {
        if (balance.availableBalance <= 0) return

        setIsRequesting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsRequesting(false)
        setShowRequestModal(false)
        setShowSuccessModal(true)
    }

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
                    <p className="text-4xl font-bold">{formatCurrency(balance.availableBalance)}</p>
                    <p className="text-sm text-white/70 mt-2">Ready to withdraw</p>

                    <Button
                        variant="secondary"
                        size="lg"
                        className="mt-4 w-full sm:w-auto"
                        onClick={() => setShowRequestModal(true)}
                        disabled={balance.availableBalance <= 0}
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
                    <p className="text-2xl font-bold">{formatCurrency(balance.pendingBalance)}</p>
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
                    <p className="text-2xl font-bold">{formatCurrency(balance.totalEarnings)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime commission</p>
                </div>
            </div>

            {/* Withdrawal Summary */}
            <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                <div>
                    <p className="text-sm text-blue-700">Total Withdrawn</p>
                    <p className="text-xl font-bold text-blue-800">{formatCurrency(balance.totalWithdrawn)}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-blue-700">Payouts Made</p>
                    <p className="text-xl font-bold text-blue-800">{mockPayoutHistory.length}</p>
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-xl border">
                <div className="p-4 border-b">
                    <h3 className="font-semibold">Payout History</h3>
                </div>

                {mockPayoutHistory.length === 0 ? (
                    <div className="p-8 text-center">
                        <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No payouts yet</h3>
                        <p className="text-muted-foreground">
                            Your payout history will appear here
                        </p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {mockPayoutHistory.map((payout) => {
                            const PaymentIcon = paymentMethodIcons[payout.paymentMethod] || CreditCard

                            return (
                                <div
                                    key={payout.id}
                                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50"
                                >
                                    {/* Left - Payout Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">{formatCurrency(payout.amount)}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <PaymentIcon className="w-4 h-4" />
                                                <span>{payout.paymentMethod}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center - Details */}
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">{payout.adminNotes}</p>
                                    </div>

                                    {/* Right - Date & Status */}
                                    <div className="text-right">
                                        <Badge className="bg-green-100 text-green-800 mb-1">
                                            ✅ Completed
                                        </Badge>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDate(payout.completedAt)} at {formatTime(payout.completedAt)}
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
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(balance.availableBalance)}</p>
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
                            {formatCurrency(balance.availableBalance)}
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
