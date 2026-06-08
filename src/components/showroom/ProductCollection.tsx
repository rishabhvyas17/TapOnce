"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const products = [
    {
        id: "metal",
        name: "Matte Black Metal",
        price: "₹1,500",
        originalPrice: "₹2,499",
        image: "/images/metal-card.png",
        description: "The ultimate statement of premium networking. Crafted from military-grade stainless steel with a luxurious matte finish and precision laser engraving. Weighted, durable, and completely unforgettable.",
        features: [
            "Premium laser-engraved details",
            "Stainless steel core (15g weighted feel)",
            "Anti-fingerprint matte coating",
            "High-range NTAG213 NFC chip",
            "Lifetime chip warranty"
        ],
        badge: "Premium Choice"
    },
    {
        id: "pvc",
        name: "Custom PVC Card",
        price: "₹1,000",
        originalPrice: "₹1,799",
        image: "/images/pvc-card.png",
        description: "Designed for modern professionals and teams. Made from highly durable, eco-friendly recycled PVC. Supports edge-to-edge high-fidelity matte color printing to match your brand's unique identity perfectly.",
        features: [
            "High-fidelity full-color print",
            "Premium matte eco-friendly PVC",
            "Waterproof & scratch-resistant",
            "Instant QR back-up code",
            "One-tap digital profile sync"
        ],
        badge: "Best Value"
    }
]

export default function ProductCollection() {
    return (
        <section id="collection" className="py-20 lg:py-28 bg-background border-t border-white/[0.04]">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
                        The Collection
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
                        Choose your material
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Whether you want the heavy prestige of laser-etched metal or the vibrant color profile of PVC, we have the perfect card for you.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {products.map((product) => (
                        <div 
                            key={product.id}
                            className="group relative flex flex-col justify-between rounded-2xl bg-zinc-900/30 border border-white/[0.05] p-6 lg:p-8 hover:border-white/[0.1] hover:bg-zinc-900/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-[50px] pointer-events-none -z-10" />

                            <div>
                                {/* Product Image Frame */}
                                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/[0.08] mb-6 bg-zinc-950">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                                    />
                                    {/* Badge */}
                                    <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-white border border-white/[0.1] rounded-full">
                                        {product.badge}
                                    </div>
                                </div>

                                {/* Typography */}
                                <div className="flex items-baseline justify-between mb-3">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                                        {product.name}
                                    </h3>
                                    <div className="text-right">
                                        <span className="text-lg md:text-xl font-bold text-white">{product.price}</span>
                                        <span className="text-xs text-zinc-500 line-through ml-1.5">{product.originalPrice}</span>
                                    </div>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                                    {product.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3 mb-8">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm">
                                            <div className="h-5 w-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                            </div>
                                            <span className="font-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/order"
                                className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold transition-all active:scale-[0.98]
                                    ${product.id === 'metal'
                                        ? 'bg-white text-black hover:bg-zinc-100 shadow-md shadow-white/5'
                                        : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-white/[0.06]'
                                    }`}
                            >
                                Order {product.name}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
