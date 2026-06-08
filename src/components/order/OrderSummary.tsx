"use client"

import { ArrowRight, Shield, Truck, CreditCard, Check, Package, ChevronLeft, Loader2, PartyPopper } from "lucide-react"
import React, { useState } from "react"

interface OrderSummaryProps {
    material: "metal" | "pvc"
    name: string
    title: string
    niche: string
    templateId?: string
    templateName?: string
    logoUrl?: string
}

const materialPrices = {
    metal: 1500,
    pvc: 1000
}

const materialNames = {
    metal: "Matte Black Metal",
    pvc: "Premium PVC"
}

type CheckoutStep = 'summary' | 'shipping' | 'payment' | 'confirmation'

export default function OrderSummary({ material, name, title, niche, templateId, templateName, logoUrl }: OrderSummaryProps) {
    const [step, setStep] = useState<CheckoutStep>('summary')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [orderNumber, setOrderNumber] = useState<number | null>(null)

    const [contact, setContact] = useState({
        phone: "",
        email: "",
        whatsapp: ""
    })

    const [shipping, setShipping] = useState({
        flat: "",
        building: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [paymentMethod, setPaymentMethod] = useState<'cod'>('cod')

    const price = materialPrices[material]
    const shippingCost = 0 // Free shipping
    const total = price + shippingCost

    const handleContactChange = (field: string, value: string) => {
        setContact((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const handleShippingChange = (field: string, value: string) => {
        setShipping((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const isContactValid = contact.phone.length >= 10 && contact.email.includes('@')
    const isShippingValid = shipping.flat && shipping.street && shipping.city && shipping.pincode.length === 6

    const handleSubmitOrder = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/orders/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: name,
                    customerPhone: contact.phone,
                    customerEmail: contact.email,
                    customerWhatsapp: contact.whatsapp || contact.phone,
                    templateId: templateId || niche,
                    templateName: templateName || niche,
                    material,
                    line1Text: name,
                    line2Text: title,
                    logoUrl,
                    salePrice: total,
                    paymentMethod,
                    shippingAddress: shipping
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order')
            }

            setOrderNumber(data.orderNumber)
            setStep('confirmation')

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Step 1: Order Summary Review
    if (step === 'summary') {
        return (
            <div className="space-y-6">
                <h3 className="text-base font-bold text-white tracking-tight">Order Summary</h3>

                {/* Summary Card */}
                <div className="bg-zinc-900/40 border border-white/[0.06] rounded-xl p-5 space-y-4 font-normal text-sm">
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Card Material</span>
                        <span className="text-white font-semibold">{materialNames[material]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Name on Card</span>
                        <span className="text-white font-semibold">{name || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Title on Card</span>
                        <span className="text-white font-semibold">{title || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Profession Theme</span>
                        <span className="text-white font-semibold capitalize">{niche}</span>
                    </div>
                    <hr className="border-white/[0.08]" />
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Unit Price</span>
                        <span className="text-white font-semibold">₹{price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Shipping</span>
                        <span className="text-emerald-400 font-semibold">FREE</span>
                    </div>
                    <hr className="border-white/[0.08]" />
                    <div className="flex justify-between text-base">
                        <span className="text-white font-bold">Total Amount</span>
                        <span className="text-primary font-bold">₹{total}</span>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-primary" />
                        Secure Checkout
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-primary" />
                        Free Delivery
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    disabled={!name}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold transition-all active:scale-[0.98]
                        ${name
                            ? "bg-white text-black hover:bg-zinc-100"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                >
                    Continue to Shipping <ArrowRight className="h-4 w-4" />
                </button>

                {!name && (
                    <p className="text-center text-xs text-amber-400 font-medium">
                        Please enter your name in the personalization section to continue
                    </p>
                )}
            </div>
        )
    }

    // Step 2: Shipping Details
    if (step === 'shipping') {
        return (
            <div className="space-y-6">
                <button
                    type="button"
                    onClick={() => setStep('summary')}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back to Summary
                </button>

                <h3 className="text-base font-bold text-white tracking-tight">Contact & Shipping</h3>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-emerald-400">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center">
                            <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
                        </div>
                        <span>Summary</span>
                    </div>
                    <div className="flex-1 h-px bg-white/[0.08]" />
                    <div className="flex items-center gap-1 text-primary">
                        <div className="h-5 w-5 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center text-primary text-[10px] font-bold">2</div>
                        <span>Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-white/[0.08]" />
                    <div className="flex items-center gap-1 text-zinc-500">
                        <div className="h-5 w-5 rounded-full bg-zinc-800 border border-white/[0.06] flex items-center justify-center text-zinc-500 text-[10px] font-bold">3</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="tel"
                            required
                            placeholder="Phone Number *"
                            value={contact.phone}
                            onChange={(e) => handleContactChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="col-span-2 md:col-span-1 px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all font-medium"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={contact.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            className="col-span-2 md:col-span-1 px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all font-medium"
                        />
                        <input
                            type="tel"
                            placeholder="WhatsApp (Optional)"
                            value={contact.whatsapp}
                            onChange={(e) => handleContactChange("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="col-span-2 px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-650 focus:outline-none focus:border-primary transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Delivery Address</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            required
                            placeholder="Flat / House No. / Office *"
                            value={shipping.flat}
                            onChange={(e) => handleShippingChange("flat", e.target.value)}
                            className="col-span-2 px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-655 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            placeholder="Building / Society Name"
                            value={shipping.building}
                            onChange={(e) => handleShippingChange("building", e.target.value)}
                            className="col-span-2 px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-655 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Street / Locality / Sector *"
                            value={shipping.street}
                            onChange={(e) => handleShippingChange("street", e.target.value)}
                            className="col-span-2 px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-655 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            required
                            placeholder="City *"
                            value={shipping.city}
                            onChange={(e) => handleShippingChange("city", e.target.value)}
                            className="px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-655 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Pincode *"
                            value={shipping.pincode}
                            onChange={(e) => handleShippingChange("pincode", e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="px-4 py-3 bg-zinc-900/40 border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-zinc-655 focus:outline-none focus:border-primary transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    type="button"
                    onClick={() => setStep('payment')}
                    disabled={!isContactValid || !isShippingValid}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold transition-all active:scale-[0.98]
                        ${isContactValid && isShippingValid
                            ? "bg-white text-black hover:bg-zinc-100"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                >
                    Continue to Payment <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        )
    }

    // Step 3: Payment Selection
    if (step === 'payment') {
        return (
            <div className="space-y-6">
                <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back to Shipping
                </button>

                <h3 className="text-base font-bold text-white tracking-tight">Payment Method</h3>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-emerald-400">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center">
                            <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
                        </div>
                        <span>Summary</span>
                    </div>
                    <div className="flex-1 h-px bg-emerald-500/40" />
                    <div className="flex items-center gap-1 text-emerald-400">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center">
                            <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
                        </div>
                        <span>Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-white/[0.08]" />
                    <div className="flex items-center gap-1 text-primary">
                        <div className="h-5 w-5 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center text-primary text-[10px] font-bold">3</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                    {/* COD Option (Enabled) */}
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border transition-all border-primary bg-primary/[0.02]"
                    >
                        <Package className="h-5 w-5 text-primary" />
                        <div className="text-left flex-1">
                            <div className="font-semibold text-white text-sm">Cash on Delivery</div>
                            <div className="text-xs text-zinc-400 font-normal">Pay with cash/UPI when you receive the package</div>
                        </div>
                        <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center border-primary bg-primary">
                            <Check className="h-3 w-3 text-black" strokeWidth={3} />
                        </div>
                    </button>

                    {/* Online Option (Disabled - Coming Soon) */}
                    <div className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] opacity-60 cursor-not-allowed select-none">
                        <CreditCard className="h-5 w-5 text-zinc-550" />
                        <div className="text-left flex-1">
                            <div className="font-semibold text-zinc-400 text-sm flex items-center gap-2">
                                Pay Online
                                <span className="text-[9px] bg-zinc-800 text-zinc-400 border border-white/[0.06] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    Coming Soon
                                </span>
                            </div>
                            <div className="text-xs text-zinc-500 font-normal">UPI, Cards, Net Banking (coming soon)</div>
                        </div>
                        <div className="h-5 w-5 rounded-full border-2 border-white/10 flex items-center justify-center" />
                    </div>
                </div>

                {/* Order Summary Mini */}
                <div className="bg-zinc-900/40 border border-white/[0.06] rounded-xl p-4 text-xs font-normal">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-zinc-500 mb-0.5">Order Total</div>
                            <div className="text-lg font-bold text-white">₹{total}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-zinc-350 font-semibold">{materialNames[material]}</div>
                            <div className="text-zinc-500 uppercase tracking-wider text-[10px] mt-0.5">{name}</div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-3 text-xs text-rose-450 bg-rose-500/10 rounded-xl border border-rose-500/20 font-medium">
                        {error}
                    </div>
                )}

                {/* Place Order Button */}
                <button
                    type="button"
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold transition-all bg-white text-black hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin text-black" />
                            Placing Order...
                        </>
                    ) : (
                        <>
                            Place Order (COD) <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>

                <p className="text-center text-[10px] text-zinc-550 leading-relaxed font-normal">
                    By placing this order, you confirm that your design personalization details are correct.
                </p>
            </div>
        )
    }

    // Step 4: Order Confirmation
    if (step === 'confirmation') {
        return (
            <div className="space-y-6 text-center">
                {/* Success Animation */}
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                        <PartyPopper className="h-8 w-8 text-white animate-pulse" />
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Order Placed Successfully!</h3>
                    <p className="text-zinc-400 text-xs mt-1">Thank you for your purchase.</p>
                </div>

                {/* Order Details */}
                <div className="bg-zinc-900/40 border border-white/[0.06] rounded-xl p-5 space-y-4 text-xs font-normal">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-normal">Order ID</span>
                        <span className="text-white font-bold text-sm">#{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Card Material</span>
                        <span className="text-white font-semibold">{materialNames[material]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Name on Card</span>
                        <span className="text-white font-semibold">{name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Payment Option</span>
                        <span className="text-white font-semibold">Cash on Delivery</span>
                    </div>
                    <hr className="border-white/[0.08]" />
                    <div className="flex justify-between text-sm">
                        <span className="text-white font-bold">Total Amount</span>
                        <span className="text-primary font-bold">₹{total}</span>
                    </div>
                </div>

                {/* Track Order CTA */}
                <a
                    href={`/order/track?order=${orderNumber}`}
                    className="block w-full py-3.5 rounded-full font-semibold bg-white text-black hover:bg-zinc-100 transition-transform text-center text-sm shadow-md"
                >
                    Track Your Order
                </a>

                {/* What's Next */}
                <div className="bg-zinc-900/20 border border-white/[0.04] rounded-xl p-4 text-left space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-350 mb-3">What happens next?</h4>
                    <ul className="space-y-2 text-xs text-zinc-400 font-normal">
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Our designer will verify your logo quality within 24 hours.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={3} />
                            <span>You will receive an email instructions to claim and set up your digital profile.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Your custom NFC card will be shipped and delivered in 5-7 business days.</span>
                        </li>
                    </ul>
                </div>

                {/* Contact support */}
                <div className="flex flex-col gap-2 pt-2 text-xs font-normal">
                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-6 rounded-xl border border-white/[0.08] text-white hover:bg-white/[0.04] transition-colors"
                    >
                        Questions? Chat with support on WhatsApp
                    </a>
                </div>
            </div>
        )
    }

    return null
}
