"use client"

import { motion } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

const rows = [
    { feature: "Update contact info", paper: "Reprint entire batch (₹2-5 each)", taponce: "Instant, free, unlimited" },
    { feature: "Track who used your card", paper: "Impossible", taponce: "Built-in tap analytics" },
    { feature: "Cost per card", paper: "₹2-5 each, recurring every reprint", taponce: "One-time ₹1,000" },
    { feature: "Environmental impact", paper: "Trees, ink, transport waste", taponce: "Zero waste — one card forever" },
    { feature: "Share digital portfolio", paper: "Not possible", taponce: "Full portfolio with one tap" },
    { feature: "Book appointments", paper: "Not possible", taponce: "Integrated booking links" },
    { feature: "Save to contacts", paper: "Manual typing required", taponce: "One-tap instant save" },
    { feature: "First impression", paper: "Generic and forgettable", taponce: "Premium and unforgettable" },
]

export default function ComparisonTable() {
    return (
        <section className="section-padding bg-neutral-50">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        The Comparison
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900"
                    >
                        Paper cards vs. TapOnce
                    </motion.h2>
                </div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
                >
                    {/* Header Row */}
                    <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200">
                        <div className="px-5 py-4 text-sm font-semibold text-neutral-500">Feature</div>
                        <div className="px-5 py-4 text-sm font-semibold text-neutral-400 text-center">Paper Cards</div>
                        <div className="px-5 py-4 text-sm font-semibold text-neutral-900 text-center">
                            Tap<span className="text-gold-500">Once</span>
                        </div>
                    </div>

                    {/* Data Rows */}
                    {rows.map((row, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-3 ${i < rows.length - 1 ? 'border-b border-neutral-100' : ''} hover:bg-neutral-50/50 transition-colors`}
                        >
                            <div className="px-5 py-3.5 text-sm font-medium text-neutral-700">
                                {row.feature}
                            </div>
                            <div className="px-5 py-3.5 text-sm text-neutral-400 text-center flex items-center justify-center gap-1.5">
                                <X className="w-3.5 h-3.5 text-red-400 shrink-0 hidden sm:block" />
                                <span className="text-xs sm:text-sm">{row.paper}</span>
                            </div>
                            <div className="px-5 py-3.5 text-sm text-neutral-700 text-center flex items-center justify-center gap-1.5 font-medium">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 hidden sm:block" />
                                <span className="text-xs sm:text-sm">{row.taponce}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <Link
                        href="/order"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white font-semibold rounded-full hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm text-sm"
                    >
                        Make the Switch
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
