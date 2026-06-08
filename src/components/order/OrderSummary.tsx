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
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Order Summary</h3>

                {/* Summary Card */}
                <div className="bg-white border border-zinc-200/60 rounded-xl p-5 space-y-4 font-normal text-xs shadow-sm">
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Card Material</span>
                        <span className="text-slate-900 font-semibold">{materialNames[material]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Name on Card</span>
                        <span className="text-slate-900 font-semibold">{name || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Title on Card</span>
                        <span className="text-slate-900 font-semibold">{title || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Profession Theme</span>
                        <span className="text-slate-900 font-semibold capitalize">{niche}</span>
                    </div>
                    <hr className="border-zinc-150" />
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Unit Price</span>
                        <span className="text-slate-900 font-semibold">₹{price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Shipping</span>
                        <span className="text-emerald-600 font-semibold">FREE</span>
                    </div>
                    <hr className="border-zinc-150" />
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-900 font-bold">Total Amount</span>
                        <span className="text-primary font-bold">₹{total}</span>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
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
                    className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold transition-all active:scale-[0.98]
                        ${name
                            ? "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200/50"
                        }`}
                >
                    Continue to Shipping <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {!name && (
                    <p className="text-center text-[10px] text-zinc-500 font-medium font-mono uppercase">
                        [Please enter your name in the personalization section to continue]
                    </p>
                )}
            </div>
        )
    }

    // Step 2: Shipping Details
    if (step === 'shipping') {
        return (
            <div className="space-y-5">
                <button
                    type="button"
                    onClick={() => setStep('summary')}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-slate-900 transition-colors"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back to Summary
                </button>

                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Contact & Shipping</h3>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-emerald-600">
                        <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                        <span>Summary</span>
                    </div>
                    <div className="flex-1 h-px bg-zinc-200" />
                    <div className="flex items-center gap-1 text-primary">
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-[9px] font-bold">2</div>
                        <span>Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-zinc-200" />
                    <div className="flex items-center gap-1 text-zinc-400">
                        <div className="h-5 w-5 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 text-[9px] font-bold">3</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">[CONTACT_INFO]</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="tel"
                            required
                            placeholder="Phone Number *"
                            value={contact.phone}
                            onChange={(e) => handleContactChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="col-span-2 md:col-span-1 px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-all font-semibold font-mono"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={contact.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            className="col-span-2 md:col-span-1 px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-all font-semibold"
                        />
                        <input
                            type="tel"
                            placeholder="WhatsApp (Optional)"
                            value={contact.whatsapp}
                            onChange={(e) => handleContactChange("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="col-span-2 px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-all font-semibold font-mono"
                        />
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">[DELIVERY_ADDRESS]</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            required
                            placeholder="Flat / House No. / Office *"
                            value={shipping.flat}
                            onChange={(e) => handleShippingChange("flat", e.target.value)}
                            className="col-span-2 px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-450 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            placeholder="Building / Society Name"
                            value={shipping.building}
                            onChange={(e) => handleShippingChange("building", e.target.value)}
                            className="col-span-2 px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-455 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Street / Locality / Sector *"
                            value={shipping.street}
                            onChange={(e) => handleShippingChange("street", e.target.value)}
                            className="col-span-2 px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-455 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            required
                            placeholder="City *"
                            value={shipping.city}
                            onChange={(e) => handleShippingChange("city", e.target.value)}
                            className="px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-455 focus:outline-none focus:border-primary transition-all"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Pincode *"
                            value={shipping.pincode}
                            onChange={(e) => handleShippingChange("pincode", e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-xs placeholder:text-zinc-455 focus:outline-none focus:border-primary transition-all font-semibold font-mono"
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    type="button"
                    onClick={() => setStep('payment')}
                    disabled={!isContactValid || !isShippingValid}
                    className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold transition-all active:scale-[0.98]
                        ${isContactValid && isShippingValid
                            ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200/50"
                        }`}
                >
                    Continue to Payment <ArrowRight className="h-3.5 w-3.5" />
                </button>
            </div>
        )
    }

    // Step 3: Payment Selection
    if (step === 'payment') {
        return (
            <div className="space-y-5">
                <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-slate-900 transition-colors"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back to Shipping
                </button>

                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Payment Method</h3>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-emerald-600">
                        <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                        <span>Summary</span>
                    </div>
                    <div className="flex-1 h-px bg-emerald-500" />
                    <div className="flex items-center gap-1 text-emerald-600">
                        <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                        <span>Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-zinc-200" />
                    <div className="flex items-center gap-1 text-primary">
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-[9px] font-bold">3</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-2.5">
                    {/* COD Option (Enabled) */}
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className="w-full flex items-center gap-3.5 p-4 rounded-xl border transition-all border-primary bg-zinc-50/50 shadow-sm"
                    >
                        <Package className="h-4.5 w-4.5 text-primary" />
                        <div className="text-left flex-1">
                            <div className="font-bold text-slate-900 text-xs">Cash on Delivery</div>
                            <div className="text-[10px] text-zinc-500 font-normal">Pay with cash/UPI when you receive the package</div>
                        </div>
                        <div className="h-4.5 w-4.5 rounded-full border-2 flex items-center justify-center border-primary bg-primary">
                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        </div>
                    </button>

                    {/* Online Option (Disabled - Coming Soon) */}
                    <div className="w-full flex items-center gap-3.5 p-4 rounded-xl border border-zinc-200/60 bg-white opacity-60 cursor-not-allowed select-none">
                        <CreditCard className="h-4.5 w-4.5 text-zinc-400" />
                        <div className="text-left flex-1">
                            <div className="font-bold text-zinc-400 text-xs flex items-center gap-1.5">
                                Pay Online
                                <span className="text-[8px] bg-zinc-100 text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                                    COMING_SOON
                                </span>
                            </div>
                            <div className="text-[10px] text-zinc-400 font-normal">UPI, Cards, Net Banking (coming soon)</div>
                        </div>
                        <div className="h-4.5 w-4.5 rounded-full border-2 border-zinc-200 flex items-center justify-center" />
                    </div>
                </div>

                {/* Order Summary Mini */}
                <div className="bg-white border border-zinc-200/65 rounded-xl p-4 text-xs shadow-sm font-normal">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-zinc-500 mb-0.5">Order Total</div>
                            <div className="text-base font-bold text-slate-900">₹{total}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-slate-900 font-bold">{materialNames[material]}</div>
                            <div className="text-zinc-400 uppercase tracking-wider text-[9px] font-mono mt-0.5">{name}</div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-3 text-xs text-rose-600 bg-rose-50 rounded-xl border border-rose-100 font-semibold">
                        {error}
                    </div>
                )}

                {/* Place Order Button */}
                <button
                    type="button"
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold transition-all bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4.5 w-4.5 animate-spin text-white" />
                            Placing Order...
                        </>
                    ) : (
                        <>
                            Place Order (COD) <ArrowRight className="h-3.5 w-3.5" />
                        </>
                    )}
                </button>

                <p className="text-center text-[9px] text-zinc-400 leading-relaxed font-mono uppercase font-bold">
                    [By placing this order, you confirm that your design personalization details are correct.]
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
                    <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-md">
                        <PartyPopper className="h-7 w-7 text-emerald-550 animate-pulse" />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Order Placed Successfully!</h3>
                    <p className="text-zinc-550 text-xs mt-1">Thank you for your purchase.</p>
                </div>

                {/* Order Details */}
                <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-5 space-y-4 text-xs font-normal">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-550 font-normal">Order ID</span>
                        <span className="text-slate-900 font-bold text-sm">#{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Card Material</span>
                        <span className="text-slate-900 font-semibold">{materialNames[material]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Name on Card</span>
                        <span className="text-slate-900 font-semibold">{name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">Payment Option</span>
                        <span className="text-slate-900 font-semibold">Cash on Delivery</span>
                    </div>
                    <hr className="border-zinc-150" />
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-900 font-bold">Total Amount</span>
                        <span className="text-primary font-bold">₹{total}</span>
                    </div>
                </div>

                {/* Track Order CTA */}
                <a
                    href={`/order/track?order=${orderNumber}`}
                    className="block w-full py-3 rounded-full font-bold bg-slate-900 text-white hover:bg-slate-800 transition-transform text-center text-xs shadow-md"
                >
                    Track Your Order
                </a>

                {/* What's Next */}
                <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 text-left space-y-2">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">[WHAT_HAPPENS_NEXT]</h4>
                    <ul className="space-y-2 text-xs text-zinc-500 font-normal">
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Our designer will verify your logo quality within 24 hours.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                            <span>You will receive email instructions to claim and set up your digital profile.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Your custom NFC card will be shipped and delivered in 5-7 business days.</span>
                        </li>
                    </ul>
                </div>

                {/* Contact support */}
                <div className="flex flex-col gap-2 pt-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-6 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors"
                    >
                        Questions? Chat with support on WhatsApp
                    </a>
                </div>
            </div>
        )
    }

    return null
}
