"use client"

import { ArrowRight, Shield, Truck, RefreshCw, CreditCard } from "lucide-react"
import Link from "next/link"
import React from "react"

const trustBadges = [
    { icon: Truck, label: "Free Shipping India-wide" },
    { icon: CreditCard, label: "Cash on Delivery Available" },
    { icon: Shield, label: "Lifetime Chip Warranty" },
    { icon: RefreshCw, label: "Free Unlimited Updates" },
]

export default function FinalCTA() {
    return (
        <section className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(200,163,95,0.08)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <div className="text-center space-y-8">

                    {/* Headline */}
                    <h2 className="text-3xl md:text-display-lg font-display font-bold tracking-tight text-white leading-tight">
                        Your next client is{" "}
                        <span className="text-gradient-gold">one tap away.</span>
                    </h2>

                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        Join 10,000+ professionals who have upgraded their first impression. 
                        Order your card today — free shipping, free portfolio setup, no subscription.
                    </p>

                    {/* Dual CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-gold-400 text-neutral-900 font-bold rounded-full hover:bg-gold-300 transition-all active:scale-[0.98] shadow-lg text-sm w-full sm:w-auto"
                        >
                            Order Metal Card — ₹1,500
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/15 transition-all active:scale-[0.98] border border-white/10 text-sm w-full sm:w-auto"
                        >
                            Order PVC Card — ₹1,000
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 pt-8 border-t border-white/[0.08]">
                        {trustBadges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-xs text-neutral-400 font-medium"
                            >
                                <badge.icon className="h-4 w-4 text-gold-400" />
                                <span>{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
