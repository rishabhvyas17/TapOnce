"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const products = [
    {
        id: "metal",
        name: "Matte Black Metal Card",
        price: "₹1,500",
        originalPrice: "₹2,499",
        image: "/images/metal-card.png",
        description: "The ultimate standard of modern professional introductions. Crafted from laser-engraved military-grade stainless steel with an anti-fingerprint matte black texture. Weighted and unforgettable.",
        features: [
            "Precision laser-etched name and logo",
            "Weighted 15g stainless steel build",
            "Anti-fingerprint matte treatment",
            "Universal NFC NTAG213 microchip",
            "Lifetime chip functionality warranty"
        ],
        badge: "PREMIUM_BUILD"
    },
    {
        id: "pvc",
        name: "Custom PVC Card",
        price: "₹1,000",
        originalPrice: "₹1,799",
        image: "/images/pvc-card.png",
        description: "Engineered for high-fidelity brand representations and team integrations. Made from recycled matte eco-PVC, supporting border-to-border high-resolution color printing to match your brand.",
        features: [
            "Edge-to-edge high-resolution matte print",
            "Waterproof and scratch-resistant recycled PVC",
            "Instant dynamic QR code backup",
            "Integrated NFC smart chip technology",
            "One-tap digital profile customization"
        ],
        badge: "TEAM_STANDARD"
    }
]

export default function ProductCollection() {
    return (
        <section id="collection" className="py-20 lg:py-28 bg-white border-b border-zinc-100">
            {/* Tech grid texture background */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                        [MATERIALS_CATALOG]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
                        Choose your material
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-normal">
                        Select the medium that speaks your brand: the prestige weight of laser-etched metal or the custom color flexibility of PVC.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {products.map((product) => (
                        <div 
                            key={product.id}
                            className="group relative flex flex-col justify-between rounded-2xl bg-zinc-50/50 border border-zinc-200/60 p-6 lg:p-8 hover:border-zinc-300 hover:bg-white hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div>
                                {/* Product Image Frame */}
                                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-zinc-150 mb-6 bg-zinc-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover object-center group-hover:scale-101 transition-transform duration-500"
                                    />
                                    {/* Monospace Badge */}
                                    <div className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider uppercase bg-slate-900 text-white border border-white/10 rounded-full">
                                        {product.badge}
                                    </div>
                                </div>

                                {/* Typography */}
                                <div className="flex items-baseline justify-between mb-3">
                                    <h3 className="text-lg font-bold tracking-tight text-slate-900">
                                        {product.name}
                                    </h3>
                                    <div className="text-right">
                                        <span className="text-base font-bold text-slate-900">{product.price}</span>
                                        <span className="text-xs text-zinc-400 line-through ml-1.5">{product.originalPrice}</span>
                                    </div>
                                </div>

                                <p className="text-zinc-500 text-xs leading-relaxed mb-6 font-normal">
                                    {product.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3 mb-8">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-zinc-650 text-xs font-normal">
                                            <div className="h-4.5 w-4.5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                                                <Check className="h-3 w-3" strokeWidth={3} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/order"
                                className={`group flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-xs font-bold transition-all active:scale-[0.98]
                                    ${product.id === 'metal'
                                        ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200/50'
                                    }`}
                            >
                                Order {product.name}
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
