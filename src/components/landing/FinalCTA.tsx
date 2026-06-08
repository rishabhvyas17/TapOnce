"use client"

import { ArrowRight, Shield, Truck, Sparkles, Cpu } from "lucide-react"
import Link from "next/link"
import React from "react"

const trustBadges = [
    { icon: Truck, label: "Free Shipping India-wide" },
    { icon: Sparkles, label: "Cash on Delivery Available" },
    { icon: Shield, label: "Lifetime Chip Warranty" }
]

export default function FinalCTA() {
    return (
        <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-zinc-900">
            {/* Minimalist grid for tech vibes */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.015] pointer-events-none" />

            {/* Ambient tech glow behind */}
            <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(79,70,229,0.1)_0%,transparent_75%)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    
                    {/* Badge */}
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                            <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
                            [CONFIGURATOR_DEPLOYMENT]
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.1]">
                        Ready to upgrade your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                            first impression?
                        </span>
                    </h2>

                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto font-normal">
                        Join modern professionals upgrading their business introductions. Configure your custom NFC business card and start sharing with one tap.
                    </p>

                    {/* CTA Button */}
                    <div className="inline-block pt-2">
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-1.5 px-7 py-3.5 bg-white text-black font-bold rounded-full hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-md"
                        >
                            Get Your Card
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 pt-8 border-t border-white/[0.06] text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                        {trustBadges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <badge.icon className="h-4 w-4 text-primary" />
                                <span>{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
