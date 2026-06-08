"use client"

import { motion } from "framer-motion"
import { Palette, Smartphone, Zap } from "lucide-react"
import React from "react"

const steps = [
    {
        number: "[01]",
        icon: Palette,
        title: "Design Your Card",
        description: "Choose between premium matte black metal or matte PVC. Personalize with your logo, name, and subtitle preview.",
        color: "text-primary bg-primary/5 border-primary/10"
    },
    {
        number: "[02]",
        icon: Smartphone,
        title: "Setup Your Profile",
        description: "Create and configure your rich digital business card profile online. Add social links, links, and contact vCards.",
        color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
        number: "[03]",
        icon: Zap,
        title: "Tap and Share",
        description: "Tap your card against any modern smartphone to instantly load and share your profile. Works natively without apps.",
        color: "text-violet-600 bg-violet-50 border-violet-100"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
}

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 lg:py-28 bg-white relative overflow-hidden border-b border-zinc-100">
            {/* Tech grid background */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                        [THE_NFC_WORKFLOW]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
                        Go contactless in 3 steps
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-normal">
                        Simple deployment process. From order configuration to first tap in under 48 hours.
                    </p>
                </div>

                {/* Steps Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative h-full"
                        >
                            {/* Connecting Line (desktop only, between items) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-zinc-200 to-transparent z-0 pointer-events-none" />
                            )}

                            <div className="relative bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 lg:p-8 h-full hover:border-zinc-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
                                <div>
                                    {/* Step Number in Monospace */}
                                    <div className="text-xs font-mono font-bold text-zinc-400 absolute top-6 right-6 select-none">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl border ${step.color} mb-6 shadow-sm group-hover:scale-102 transition-transform duration-300`}>
                                        <step.icon className="h-5 w-5" strokeWidth={2.2} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed font-normal">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
