/**
 * @file Order Success Page Content
 * @description Client component with useSearchParams for order success
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
    Check, Package, Truck, ArrowRight, Share2,
    Copy, CheckCheck, Sparkles, User, Clock,
    Mail, Phone, MapPin
} from 'lucide-react'

// Simple confetti effect
function Confetti() {
    const [particles, setParticles] = useState<Array<{ x: number, delay: number, color: string }>>([])

    useEffect(() => {
        const newParticles = [...Array(50)].map(() => ({
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            delay: Math.random() * 0.5,
            color: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)]
        }))
        setParticles(newParticles)
    }, [])

    if (particles.length === 0) return null

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: p.x,
                        y: -20,
                        rotate: 0,
                        opacity: 1
                    }}
                    animate={{
                        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                        rotate: Math.random() * 720 - 360,
                        opacity: 0
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: p.delay,
                        ease: 'linear'
                    }}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{ backgroundColor: p.color }}
                />
            ))}
        </div>
    )
}

export default function OrderSuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const orderId = searchParams.get('id') || 'ORD00000000'

    const [showConfetti, setShowConfetti] = useState(true)
    const [copied, setCopied] = useState(false)
    const [orderData, setOrderData] = useState<any>(null)

    useEffect(() => {
        // Load order data
        const saved = sessionStorage.getItem('completed_order')
        if (saved) {
            setOrderData(JSON.parse(saved))
        }

        // Hide confetti after animation
        const timer = setTimeout(() => setShowConfetti(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderId)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <>
            {showConfetti && <Confetti />}

            <div className="container mx-auto px-4 py-12 max-w-2xl">
                {/* Success header */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                        >
                            <Check className="w-10 h-10 text-green-500" />
                        </motion.div>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Order Placed Successfully! 🎉
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-zinc-400 text-lg"
                    >
                        Your TapOnce card is being prepared
                    </motion.p>
                </motion.div>

                {/* Order ID */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-500 mb-1">Order ID</p>
                            <p className="text-xl font-mono font-bold">{orderId}</p>
                        </div>
                        <button
                            onClick={copyOrderId}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                            {copied ? (
                                <>
                                    <CheckCheck className="w-4 h-4 text-green-500" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6"
                >
                    <h3 className="font-bold mb-4">Order Status</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-sm">Confirmed</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-zinc-700" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                                <Package className="w-4 h-4 text-zinc-400" />
                            </div>
                            <span className="text-sm text-zinc-500">Processing</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-zinc-700" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                                <Truck className="w-4 h-4 text-zinc-400" />
                            </div>
                            <span className="text-sm text-zinc-500">Shipped</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6 text-sm text-zinc-400">
                        <Clock className="w-4 h-4" />
                        Estimated delivery: 5-7 business days
                    </div>
                </motion.div>

                {/* What's Next - Profile Setup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/30 rounded-2xl p-6 mb-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">Set Up Your Digital Profile</h3>
                            <p className="text-zinc-400 text-sm mb-4">
                                When someone taps your card, they'll see your digital profile.
                                Set it up now so it's ready when your card arrives!
                            </p>
                            <Link
                                href="/setup-profile"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-600 rounded-xl font-medium transition-colors"
                            >
                                Set Up Profile Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Order details */}
                {orderData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6"
                    >
                        <h3 className="font-bold mb-4">Order Details</h3>

                        <div className="space-y-4">
                            {/* Product */}
                            <div className="flex gap-4">
                                <div className="w-16 h-10 bg-gradient-to-br from-violet-900 to-purple-900 rounded-lg" />
                                <div>
                                    <p className="font-medium">{orderData.templateName}</p>
                                    <p className="text-sm text-zinc-500">{orderData.name}</p>
                                </div>
                                <p className="ml-auto font-bold">₹{orderData.total}</p>
                            </div>

                            <hr className="border-zinc-800" />

                            {/* Shipping */}
                            <div className="space-y-2 text-sm">
                                <p className="text-zinc-500">Shipping To:</p>
                                <p className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-zinc-500" />
                                    {orderData.customer?.name}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-zinc-500" />
                                    {orderData.customer?.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-zinc-500" />
                                    {orderData.customer?.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-zinc-500" />
                                    {orderData.customer?.address}, {orderData.customer?.city} - {orderData.customer?.pincode}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href={`/order/track?id=${orderId}`}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors"
                    >
                        <Truck className="w-4 h-4" />
                        Track Order
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors"
                    >
                        Back to Home
                    </Link>
                </motion.div>

                {/* Email note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-zinc-500 text-sm mt-8"
                >
                    A confirmation email has been sent to your email address.
                </motion.p>
            </div>
        </>
    )
}
