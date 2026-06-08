"use client"

import { motion } from "framer-motion"
import { Palette, Smartphone, Zap } from "lucide-react"
import React from "react"

const steps = [
    {
        number: "01",
        icon: Palette,
        title: "Design Your Card",
        description: "Choose between our premium matte metal or sleek matte PVC. Customize with your name, job title, logo, and design preview.",
        gradient: "from-primary to-violet-600"
    },
    {
        number: "02",
        icon: Smartphone,
        title: "Setup Your Profile",
        description: "Configure your rich digital page in minutes. Add links, contact cards, social profiles, and media. No application download needed.",
        gradient: "from-indigo-500 to-primary"
    },
    {
        number: "03",
        icon: Zap,
        title: "Tap and Share",
        description: "Tap your card against any modern smartphone to instantly share your digital card. Works offline, fast, and updates instantly.",
        gradient: "from-violet-500 to-indigo-600"
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
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
}

export default function HowItWorks() {
    return (
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
                        Share instantly in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-indigo-300">
                            3 easy steps
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Go from ordering your physical card to building a powerful contactless network in under 48 hours.
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
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/[0.08] to-transparent z-0 pointer-events-none" />
                            )}

                            <div className="relative bg-zinc-900/40 border border-white/[0.05] rounded-2xl p-6 lg:p-8 h-full hover:border-white/[0.1] transition-all duration-300 hover:bg-zinc-900/60 flex flex-col justify-between overflow-hidden">
                                <div>
                                    {/* Step Number */}
                                    <div className="text-5xl font-display font-extrabold text-white/[0.03] absolute top-4 right-6 select-none group-hover:text-white/[0.06] transition-colors duration-300">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${step.gradient} mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                                        <step.icon className="h-5 w-5 text-white" strokeWidth={2} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
