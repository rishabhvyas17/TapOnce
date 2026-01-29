/**
 * @file Order Tracking Page
 * @description Public page for customers to track their order status
 * 
 * @owner Dev 1
 */

'use client'

import { useState } from 'react'
import { Search, Package, Printer, Truck, CheckCircle, Clock, ArrowLeft, MapPin, ExternalLink, AlertCircle } from 'lucide-react'
import Link from 'next/link'

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
                throw new Error(data.error || 'Failed to track order')
            }

            setOrder(data.order)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status: string, isCompleted: boolean) => {
        const iconClass = isCompleted ? 'text-emerald-400' : 'text-zinc-600'
        const icons: Record<string, React.ReactNode> = {
            'pending_approval': <Clock className={`h-5 w-5 ${iconClass}`} />,
            'approved': <CheckCircle className={`h-5 w-5 ${iconClass}`} />,
            'printing': <Printer className={`h-5 w-5 ${iconClass}`} />,
            'ready_to_ship': <Package className={`h-5 w-5 ${iconClass}`} />,
            'shipped': <Truck className={`h-5 w-5 ${iconClass}`} />,
            'delivered': <CheckCircle className={`h-5 w-5 ${iconClass}`} />
        }
        return icons[status] || <Clock className={`h-5 w-5 ${iconClass}`} />
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

    // Search Form View
    if (!order) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="h-14 w-14 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                                <Package className="h-7 w-7 text-violet-400" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">Track Your Order</h1>
                            <p className="text-zinc-400">Enter your order details to see the current status</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleTrack} className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Order Number</label>
                                <input
                                    type="text"
                                    placeholder="#12001"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Tracking...
                                    </>
                                ) : (
                                    <>
                                        <Search className="h-5 w-5" />
                                        Track Order
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-xs text-zinc-500 mt-6">
                            Can't find your order? <a href="https://wa.me/919876543210" className="text-violet-400 hover:underline">Contact support</a>
                        </p>
                    </div>
                </div>
            </main>
        )
    }

    // Order Details View
    return (
        <main className="min-h-screen bg-[#050505] text-white p-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => setOrder(null)}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Track Another Order
                </button>

                {/* Order Header */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-zinc-400 text-sm">Order Number</p>
                            <p className="text-2xl font-bold">#{order.orderNumber}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'delivered' || order.status === 'paid'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : order.status === 'rejected' || order.status === 'cancelled'
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-violet-500/20 text-violet-400'
                            }`}>
                            {order.statusLabel}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-zinc-400">Name on Card</p>
                            <p className="text-white font-medium">{order.cardDetails.line1}</p>
                        </div>
                        <div>
                            <p className="text-zinc-400">Total Amount</p>
                            <p className="text-white font-medium">₹{order.total}</p>
                        </div>
                    </div>

                    {order.estimatedDelivery && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-zinc-400 text-sm">Estimated Delivery</p>
                            <p className="text-emerald-400 font-medium">{order.estimatedDelivery}</p>
                        </div>
                    )}
                </div>

                {/* Status Timeline */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-6">
                    <h2 className="font-bold mb-6">Order Timeline</h2>

                    <div className="space-y-0">
                        {order.timeline.map((step, index) => (
                            <div key={step.status} className="flex gap-4">
                                {/* Icon and Line */}
                                <div className="flex flex-col items-center">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-emerald-500/20' : 'bg-zinc-800'
                                        }`}>
                                        {getStatusIcon(step.status, step.completed)}
                                    </div>
                                    {index < order.timeline.length - 1 && (
                                        <div className={`w-0.5 h-8 ${step.completed ? 'bg-emerald-500/50' : 'bg-zinc-800'
                                            }`} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-6">
                                    <p className={`font-medium ${step.completed ? 'text-white' : 'text-zinc-500'}`}>
                                        {step.label}
                                    </p>
                                    {step.date && (
                                        <p className="text-xs text-zinc-500">{formatDate(step.date)}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tracking Number */}
                {order.trackingNumber && (
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-6">
                        <h2 className="font-bold mb-4">Shipping Details</h2>
                        <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-violet-400" />
                            <div>
                                <p className="text-zinc-400 text-sm">Tracking Number</p>
                                <p className="text-white font-mono">{order.trackingNumber}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Link (if available) */}
                {order.profileSlug && (
                    <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl p-6">
                        <h2 className="font-bold mb-2">Your Digital Profile is Ready!</h2>
                        <p className="text-zinc-400 text-sm mb-4">
                            Your public profile is live. You can customize it now.
                        </p>
                        <Link
                            href={`/dashboard`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-full text-sm font-medium hover:bg-violet-500 transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Customize Your Profile
                        </Link>
                    </div>
                )}

                {/* Help */}
                <div className="text-center mt-8">
                    <p className="text-zinc-500 text-sm">
                        Need help? <a href="https://wa.me/919876543210" className="text-violet-400 hover:underline">Chat with us on WhatsApp</a>
                    </p>
                </div>
            </div>
        </main>
    )
}
