"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const products = [
    {
        id: "metal",
        name: "Premium Metal Card",
        price: "₹1,500",
        originalPrice: "₹2,499",
        image: "/images/metal-card.png",
        description: "Laser-engraved matte black stainless steel. The weight, the finish, the sound it makes when placed on a table — every detail is designed to leave an impression that lasts.",
        features: [
            "Precision laser-etched name & logo",
            "Weighted 15g stainless steel build",
            "Anti-fingerprint matte black finish",
            "Universal NFC NTAG213 chip",
            "Lifetime chip functionality warranty",
            "Free personalized portfolio setup",
        ],
        badge: "Most Popular",
        badgeColor: "bg-gold-400 text-white",
        isPrimary: true,
    },
    {
        id: "pvc",
        name: "Custom PVC Card",
        price: "₹1,000",
        originalPrice: "₹1,799",
        image: "/images/pvc-card.png",
        description: "Full-color edge-to-edge printing on premium matte PVC. Perfect for teams who need brand consistency across every card, with the flexibility to customize each profile.",
        features: [
            "Edge-to-edge high-resolution printing",
            "Waterproof & scratch-resistant matte PVC",
            "QR code backup for non-NFC devices",
            "Integrated NFC smart chip",
            "Free personalized portfolio setup",
            "Ideal for team & bulk orders",
        ],
        badge: "Best for Teams",
        badgeColor: "bg-neutral-800 text-white",
        isPrimary: false,
    }
]

export default function ProductCollection() {
    return (
        <section id="products" className="section-padding bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        Choose Your Card
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900 mb-4"
                    >
                        Two materials. One unforgettable impression.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 text-base leading-relaxed"
                    >
                        Both cards include a free personalized digital portfolio, NFC chip with lifetime warranty, and free shipping across India.
                    </motion.p>
                </div>

                {/* Product Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`group relative flex flex-col rounded-2xl p-6 lg:p-8 transition-all duration-300 overflow-hidden
                                ${product.isPrimary
                                    ? 'bg-neutral-900 text-white border-2 border-gold-400/30 shadow-xl shadow-neutral-900/10'
                                    : 'bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:shadow-lg'
                                }`}
                        >
                            {/* Badge */}
                            <div className={`absolute top-5 right-5 px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full ${product.badgeColor}`}>
                                {product.badge}
                            </div>

                            {/* Product Image */}
                            <div className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 ${product.isPrimary ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex items-baseline justify-between mb-2">
                                <h3 className="text-xl font-display font-bold tracking-tight">
                                    {product.name}
                                </h3>
                            </div>

                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-2xl font-display font-bold">{product.price}</span>
                                <span className={`text-sm line-through ${product.isPrimary ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                    {product.originalPrice}
                                </span>
                                <span className="text-xs font-semibold text-emerald-500 ml-1">
                                    Launch Price
                                </span>
                            </div>

                            <p className={`text-sm leading-relaxed mb-6 ${product.isPrimary ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                {product.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2.5 mb-8 flex-1">
                                {product.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                                        <div className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center mt-0.5
                                            ${product.isPrimary ? 'bg-gold-400/20 text-gold-400' : 'bg-emerald-50 text-emerald-600'}`}
                                        >
                                            <Check className="h-3 w-3" strokeWidth={3} />
                                        </div>
                                        <span className={product.isPrimary ? 'text-neutral-300' : 'text-neutral-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href="/order"
                                className={`group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold transition-all active:scale-[0.98] text-sm
                                    ${product.isPrimary
                                        ? 'bg-gold-400 text-neutral-900 hover:bg-gold-300 shadow-sm'
                                        : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm'
                                    }`}
                            >
                                Order {product.name}
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
