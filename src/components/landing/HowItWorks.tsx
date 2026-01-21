"use client"

import { motion } from "framer-motion"
import { Palette, Smartphone, Zap } from "lucide-react"
import React from "react"

const steps = [
    {
        number: "01",
        icon: Palette,
        title: "Design Your Card",
        description: "Choose from premium metal, sleek PVC, or natural wood. Customize with your brand colors, logo, and personal touch.",
        gradient: "from-violet-500 to-purple-600"
    },
    {
        number: "02",
        icon: Smartphone,
        title: "Setup Your Profile",
        description: "Create your digital profile in minutes. Add your socials, portfolio, contact info. No app needed. Update anytime, free forever.",
        gradient: "from-cyan-500 to-blue-600"
    },
    {
        number: "03",
        icon: Zap,
        title: "Tap & Share",
        description: "One tap on any smartphone instantly shares your complete professional identity. No fumbling. No forgotten cards. Just impact.",
        gradient: "from-amber-500 to-orange-600"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0
    }
}

export default function HowItWorks() {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-xs font-bold tracking-[0.3em] text-violet-400 uppercase mb-4">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                        Go Contactless in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            3 Easy Steps
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        From order to first tap in under 48 hours. We handle the tech, you make the impression.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative"
                        >
                            {/* Connecting Line (not on last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/10 to-transparent z-0" />
                            )}

                            <div className="relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 h-full hover:border-white/10 transition-all duration-300 hover:bg-[#0D0D0D]">
                                {/* Step Number */}
                                <div className="text-7xl font-black text-white/5 absolute top-4 right-6 select-none">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
