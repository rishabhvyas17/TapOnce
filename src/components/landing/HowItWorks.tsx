"use client"

import { motion } from "framer-motion"
import { Palette, Truck, Zap } from "lucide-react"
import React from "react"

const steps = [
    {
        number: "01",
        icon: Palette,
        title: "Choose & Customize",
        description: "Pick your material — premium metal or custom PVC. Upload your logo, choose your design, and preview your card in real-time before ordering.",
        color: "bg-gold-50 border-gold-200 text-gold-600",
    },
    {
        number: "02",
        icon: Truck,
        title: "We Craft & Ship Free",
        description: "Your card is precision-crafted with your NFC chip programmed to your portfolio. Shipped free within 3-5 business days. Cash on delivery available.",
        color: "bg-blue-50 border-blue-100 text-blue-600",
    },
    {
        number: "03",
        icon: Zap,
        title: "Tap & Connect",
        description: "Hold your card against any iPhone or Android. Your personalized portfolio loads instantly — they save your contact, book meetings, and follow your socials.",
        color: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
]

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section-padding bg-white border-y border-neutral-100">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        How It Works
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900 mb-4"
                    >
                        From order to first tap in 3 days.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 text-base leading-relaxed"
                    >
                        Getting started takes less than 5 minutes. We handle the rest.
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className="group relative"
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-14 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-neutral-200 to-transparent z-0" />
                            )}

                            <div className="relative bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 h-full hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
                                {/* Step Number */}
                                <div className="text-xs font-display font-bold text-neutral-300 absolute top-6 right-6">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl border ${step.color} mb-5`}>
                                    <step.icon className="h-5 w-5" strokeWidth={2} />
                                </div>

                                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
