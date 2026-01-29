/**
 * @file Checkout Page - Order Details & Payment
 * @description Clean checkout experience with order summary
 * 
 * Features:
 * - Contact form (name, email, phone, address)
 * - Order summary with card preview
 * - COD/Online payment toggle
 * - Estimated delivery
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ChevronLeft, CreditCard, Truck, Shield, Check,
    User, Mail, Phone, MapPin, Home, ArrowRight,
    Package, Sparkles, Clock, Info
} from 'lucide-react'

interface OrderData {
    profession: string
    templateId: string
    templateName: string
    material: string
    name: string
    title: string
    logoUrl?: string
}

const materialPrices: Record<string, number> = {
    metal: 999,
    pvc: 599,
    wood: 799
}

const materialNames: Record<string, string> = {
    metal: 'Premium Metal',
    pvc: 'Premium PVC',
    wood: 'Bamboo Wood'
}

export default function CheckoutPage() {
    const router = useRouter()

    // Order data from session
    const [orderData, setOrderData] = useState<OrderData | null>(null)

    // Form state
    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod')
    const [loading, setLoading] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)

    // Load order data
    useEffect(() => {
        const savedOrder = sessionStorage.getItem('order_data')
        const savedUser = sessionStorage.getItem('onboarding_user')

        if (savedOrder) {
            setOrderData(JSON.parse(savedOrder))
        }

        if (savedUser) {
            const user = JSON.parse(savedUser)
            setCustomerName(user.name || '')
            setEmail(user.email || '')
        }
    }, [])

    const price = orderData ? materialPrices[orderData.material] || 999 : 999
    const shipping = 0 // Free shipping
    const total = price + shipping

    const isFormValid =
        customerName.length >= 2 &&
        email.includes('@') &&
        phone.length >= 10 &&
        address.length >= 5 &&
        city.length >= 2 &&
        pincode.length >= 6 &&
        agreeTerms

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid || !orderData) return

        setLoading(true)

        // TODO: Submit order to API
        // For now, simulate success
        await new Promise(r => setTimeout(r, 1500))

        // Save order details for confirmation page
        const orderId = 'ORD' + Date.now().toString().slice(-8)
        sessionStorage.setItem('completed_order', JSON.stringify({
            orderId,
            ...orderData,
            customer: { name: customerName, email, phone, address, city, pincode },
            total,
            paymentMethod
        }))

        router.push(`/order/success?id=${orderId}`)
    }

    if (!orderData) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">No order in progress</h1>
                    <p className="text-zinc-500 mb-6">Start by choosing your profession and designing your card.</p>
                    <Link
                        href="/get-started"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 rounded-xl font-medium hover:bg-violet-600 transition-colors"
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen min-h-[100dvh] bg-[#050505] text-white pb-safe">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link
                            href={`/design/${orderData.profession}`}
                            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                        <Link href="/" className="text-lg md:text-xl font-bold hidden sm:block">
                            Tap<span className="text-violet-400">Once</span>
                        </Link>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="h-1.5 w-5 md:h-2 md:w-8 rounded-full bg-violet-500" />
                        <div className="h-1.5 w-5 md:h-2 md:w-8 rounded-full bg-violet-500" />
                        <div className="h-1.5 w-5 md:h-2 md:w-8 rounded-full bg-violet-500" />
                        <div className="h-1.5 w-5 md:h-2 md:w-8 rounded-full bg-zinc-800" />
                    </div>

                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-zinc-400">
                        <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                        <span className="hidden sm:inline">Secure Checkout</span>
                        <span className="sm:hidden">Secure</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 md:py-8">
                {/* Mobile: Order summary first, then form */}
                {/* Desktop: Side by side */}
                <div className="flex flex-col-reverse lg:flex-row lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    {/* Left: Form */}
                    <div className="order-2 lg:order-1">
                        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Checkout</h1>

                        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <User className="w-5 h-5 text-violet-400" />
                                    Contact Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={e => setCustomerName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 md:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors text-base"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3 md:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-violet-400" />
                                    Shipping Address
                                </h2>

                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Street Address *</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="123, Main Street, Building Name"
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">City *</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                            placeholder="Mumbai"
                                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">PIN Code *</label>
                                        <input
                                            type="text"
                                            value={pincode}
                                            onChange={e => setPincode(e.target.value)}
                                            placeholder="400001"
                                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-violet-400" />
                                    Payment Method
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`
                                            p-4 rounded-xl border text-left transition-all
                                            ${paymentMethod === 'cod'
                                                ? 'border-violet-500 bg-violet-500/10'
                                                : 'border-zinc-800 hover:border-zinc-700'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Truck className="w-6 h-6 text-zinc-400" />
                                            <div>
                                                <p className="font-bold">Cash on Delivery</p>
                                                <p className="text-xs text-zinc-500">Pay when you receive</p>
                                            </div>
                                            {paymentMethod === 'cod' && (
                                                <Check className="w-5 h-5 text-violet-400 ml-auto" />
                                            )}
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('online')}
                                        className={`
                                            p-4 rounded-xl border text-left transition-all
                                            ${paymentMethod === 'online'
                                                ? 'border-violet-500 bg-violet-500/10'
                                                : 'border-zinc-800 hover:border-zinc-700'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-6 h-6 text-zinc-400" />
                                            <div>
                                                <p className="font-bold">Pay Online</p>
                                                <p className="text-xs text-zinc-500">UPI, Card, Netbanking</p>
                                            </div>
                                            {paymentMethod === 'online' && (
                                                <Check className="w-5 h-5 text-violet-400 ml-auto" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={e => setAgreeTerms(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-violet-500 focus:ring-violet-500"
                                />
                                <span className="text-sm text-zinc-400">
                                    I agree to the <Link href="/terms" className="text-violet-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>
                                </span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className="w-full py-4 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Pay'}
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6">
                            <h2 className="text-lg font-bold">Order Summary</h2>

                            {/* Card Preview */}
                            <div className="aspect-[1.6/1] bg-gradient-to-br from-violet-900 via-purple-900 to-black rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <div className="w-8 h-8 rounded-lg bg-white/10" />
                                        <div className="w-6 h-6 rounded-full bg-white/10" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{orderData.name}</p>
                                        <p className="text-white/60 text-sm">{orderData.title}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Template</span>
                                    <span>{orderData.templateName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Material</span>
                                    <span>{materialNames[orderData.material]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Name on Card</span>
                                    <span>{orderData.name}</span>
                                </div>
                                <hr className="border-zinc-800" />
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Card Price</span>
                                    <span>₹{price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Shipping</span>
                                    <span className="text-green-400">FREE</span>
                                </div>
                                <hr className="border-zinc-800" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            {/* Delivery estimate */}
                            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl">
                                <Clock className="w-5 h-5 text-violet-400" />
                                <div>
                                    <p className="text-sm font-medium">Estimated Delivery</p>
                                    <p className="text-xs text-zinc-500">5-7 business days</p>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-2 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    Free shipping across India
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    NFC-enabled premium card
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    Lifetime digital profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
