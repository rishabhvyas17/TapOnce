"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import React from "react"

const comparisonData = [
    {
        feature: "Annual Cost",
        paper: "₹5,000+ in reprints",
        taponce: "₹999 one-time",
    },
    {
        feature: "Information Updates",
        paper: "Reprint everything",
        taponce: "Free, instant edits",
    },
    {
        feature: "Environmental Impact",
        paper: "100+ cards wasted yearly",
        taponce: "Zero waste, ever",
    },
    {
        feature: "First Impression",
        paper: "Forgettable paper",
        taponce: "Unforgettable experience",
    },
    {
        feature: "Contact Tracking",
        paper: "No visibility",
        taponce: "Full analytics",
    },
    {
        feature: "Sharing Capacity",
        paper: "Limited by supply",
        taponce: "Unlimited, forever",
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
}

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0
    }
}

export default function ComparisonTable() {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-red-600/5 via-transparent to-emerald-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-xs font-bold tracking-[0.3em] text-emerald-400 uppercase mb-4">
                        The Comparison
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                        Paper Cards Are{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                            Outdated
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        See why 10,000+ professionals have made the switch.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Row */}
                    <motion.div
                        variants={rowVariants}
                        className="grid grid-cols-3 gap-4 mb-4 px-6"
                    >
                        <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide"></div>
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 text-red-400 font-bold">
                                <X className="h-4 w-4" />
                                Paper Cards
                            </span>
                        </div>
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 text-emerald-400 font-bold">
                                <Check className="h-4 w-4" />
                                TapOnce
                            </span>
                        </div>
                    </motion.div>

                    {/* Data Rows */}
                    {comparisonData.map((row, index) => (
                        <motion.div
                            key={index}
                            variants={rowVariants}
                            className={`grid grid-cols-3 gap-4 p-6 rounded-2xl ${index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                                } border border-white/5`}
                        >
                            <div className="font-medium text-white">
                                {row.feature}
                            </div>
                            <div className="text-center text-zinc-500 flex items-center justify-center gap-2">
                                <X className="h-4 w-4 text-red-500/60" />
                                <span>{row.paper}</span>
                            </div>
                            <div className="text-center text-zinc-300 flex items-center justify-center gap-2">
                                <Check className="h-4 w-4 text-emerald-500" />
                                <span>{row.taponce}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-12 mt-16 text-center"
                >
                    <div>
                        <div className="text-4xl font-black text-white">90%</div>
                        <div className="text-sm text-zinc-500">Cost Reduction</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">0</div>
                        <div className="text-sm text-zinc-500">Paper Waste</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">∞</div>
                        <div className="text-sm text-zinc-500">Shares Per Card</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
