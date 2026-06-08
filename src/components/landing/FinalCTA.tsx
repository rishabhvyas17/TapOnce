"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Truck, Sparkles } from "lucide-react"
import Link from "next/link"
import React from "react"

const trustBadges = [
    { icon: Truck, label: "Free Shipping India-wide" },
    { icon: Sparkles, label: "Cash on Delivery Available" },
    { icon: Shield, label: "Lifetime Chip Warranty" }
]

export default function FinalCTA() {
    return (
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden border-t border-white/[0.04]">
            {/* Ambient glow behind */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/15 rounded-full blur-[130px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                <div className="max-w-3xl mx-auto text-center space-y-10">
                    {/* Headline */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.1]">
                        Ready to elevate your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-indigo-300">
                            first impression?
                        </span>
                    </h2>

                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-normal">
                        Join modern professionals upgrading their networking. Design your custom NFC card now and start sharing with one simple tap.
                    </p>

                    {/* CTA Button */}
                    <div className="inline-block">
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                        >
                            Get Your Card Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 pt-8 border-t border-white/[0.06]">
                        {trustBadges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-zinc-400"
                            >
                                <badge.icon className="h-4 w-4 text-primary" />
                                <span className="text-xs font-semibold uppercase tracking-wider">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
