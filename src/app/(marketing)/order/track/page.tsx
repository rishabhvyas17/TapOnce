/**
 * @file Order Tracking Page
 * @description Public page for customers to track their order status
 */

'use client'

import React, { useState } from 'react'
import { Search, Package, Printer, Truck, CheckCircle, Clock, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

interface OrderDetails {
    orderNumber: number
    customerName: string
    status: string
    statusLabel: string
    paymentStatus: string
    total: number
    cardDetails: {
        line1: string
        line2: string
    }
    shippingAddress: any
    trackingNumber: string | null
    profileSlug: string | null
    timeline: Array<{
        status: string
        label: string
        completed: boolean
        date?: string
    }>
    estimatedDelivery: string | null
}

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [order, setOrder] = useState<OrderDetails | null>(null)

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/orders/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderNumber, email })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to locate order')
            }

            setOrder(data.order)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status: string, isCompleted: boolean) => {
        const iconClass = isCompleted ? 'text-primary' : 'text-zinc-650'
        const icons: Record<string, React.ReactNode> = {
            'pending_approval': <Clock className={`h-4.5 w-4.5 ${iconClass}`} />,
            'approved': <CheckCircle className={`h-4.5 w-4.5 ${iconClass}`} />,
            'printing': <Printer className={`h-4.5 w-4.5 ${iconClass}`} />,
            'ready_to_ship': <Package className={`h-4.5 w-4.5 ${iconClass}`} />,
            'shipped': <Truck className={`h-4.5 w-4.5 ${iconClass}`} />,
            'delivered': <CheckCircle className={`h-4.5 w-4.5 ${iconClass}`} />
        }
        return icons[status] || <Clock className={`h-4.5 w-4.5 ${iconClass}`} />
    }

    const formatDate = (date?: string) => {
        if (!date) return null
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <main className="min-h-screen bg-background text-white selection:bg-white selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 py-24 lg:py-32 flex items-center justify-center">
                <div className="w-full max-w-lg">
                    {/* Back Link */}
                    <div className="mb-6 flex justify-start">
                        {order ? (
                            <button
                                onClick={() => setOrder(null)}
                                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Track Another Order
                            </button>
                        ) : (
                            <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Back to Home
                            </Link>
                        )}
                    </div>

                    {!order ? (
                        /* Search Form View */
                        <div className="bg-zinc-900/10 border border-white/[0.04] rounded-2xl p-6 md:p-8 space-y-6">
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                                    <Package className="h-6 w-6 text-primary" />
                                </div>
                                <h1 className="text-xl font-bold tracking-tight">Track Your Order</h1>
                                <p className="text-zinc-400 text-xs font-normal">Enter your order ID and email to view current delivery status.</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleTrack} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Order ID</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 12001"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        className="w-full px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all font-medium"
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 text-xs text-rose-450 bg-rose-500/10 rounded-xl border border-rose-500/20 font-medium">
                                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold bg-white text-black hover:bg-zinc-100 transition-colors disabled:opacity-50 text-sm"
                                >
                                    {loading ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Tracking...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="h-4 w-4" />
                                            Track Order
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="text-center text-[10px] text-zinc-550">
                                Need help? <a href="https://wa.me/919876543210" className="text-primary hover:underline font-semibold">Chat with support on WhatsApp</a>
                            </p>
                        </div>
                    ) : (
                        /* Order Details View */
                        <div className="space-y-5">
                            {/* Order Header */}
                            <div className="bg-zinc-900/10 border border-white/[0.04] rounded-2xl p-5 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Order ID</p>
                                        <p className="text-xl font-bold text-white">#{order.orderNumber}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                        order.status === 'delivered'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : order.status === 'rejected' || order.status === 'cancelled'
                                                ? 'bg-rose-500/10 text-rose-450 border border-rose-500/20'
                                                : 'bg-primary/10 text-primary border border-primary/20'
                                    }`}>
                                        {order.statusLabel}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-xs font-normal">
                                    <div>
                                        <p className="text-zinc-500 mb-0.5">Name on Card</p>
                                        <p className="text-white font-semibold">{order.cardDetails.line1}</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 mb-0.5">Total Amount</p>
                                        <p className="text-white font-semibold">₹{order.total}</p>
                                    </div>
                                </div>

                                {order.estimatedDelivery && (
                                    <div className="pt-3.5 border-t border-white/[0.06]">
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Estimated Delivery</p>
                                        <p className="text-emerald-450 font-semibold text-xs">{order.estimatedDelivery}</p>
                                    </div>
                                )}
                            </div>

                            {/* Status Timeline */}
                            <div className="bg-zinc-900/10 border border-white/[0.04] rounded-2xl p-5">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-350 mb-5">Order Timeline</h2>

                                <div className="space-y-0">
                                    {order.timeline.map((step, index) => (
                                        <div key={step.status} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                                                    step.completed 
                                                        ? 'bg-primary/10 border-primary/30' 
                                                        : 'bg-zinc-900/40 border-white/[0.06]'
                                                }`}>
                                                    {getStatusIcon(step.status, step.completed)}
                                                </div>
                                                {index < order.timeline.length - 1 && (
                                                    <div className={`w-[1px] h-6 ${step.completed ? 'bg-primary/30' : 'bg-white/[0.06]'}`} />
                                                )}
                                            </div>

                                            <div className="flex-1 pb-5 font-normal text-xs">
                                                <p className={`font-semibold ${step.completed ? 'text-white' : 'text-zinc-500'}`}>
                                                    {step.label}
                                                </p>
                                                {step.date && (
                                                    <p className="text-[10px] text-zinc-550 mt-0.5">{formatDate(step.date)}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tracking Number */}
                            {order.trackingNumber && (
                                <div className="bg-zinc-900/10 border border-white/[0.04] rounded-2xl p-5 flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Tracking Number</p>
                                        <p className="text-white font-mono text-xs font-semibold">{order.trackingNumber}</p>
                                    </div>
                                </div>
                            )}

                            {/* Profile Link (if available) */}
                            {order.profileSlug && (
                                <div className="bg-primary/[0.02] border border-primary/20 rounded-2xl p-5 space-y-3">
                                    <h2 className="text-sm font-semibold text-white">Your Digital Profile is Ready!</h2>
                                    <p className="text-zinc-400 text-xs font-normal">
                                        Your public profile has been generated. You can customize and personalize your details now.
                                    </p>
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center justify-center px-4 py-2 bg-white text-black rounded-lg text-xs font-semibold hover:bg-zinc-150 transition-colors"
                                    >
                                        Customize Profile
                                    </Link>
                                </div>
                            )}

                            {/* Help */}
                            <div className="text-center pt-2 text-xs font-normal">
                                <p className="text-zinc-550">
                                    Need help? <a href="https://wa.me/919876543210" className="text-primary hover:underline font-semibold">Chat with support on WhatsApp</a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
