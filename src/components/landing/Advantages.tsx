"use client"

import { motion } from "framer-motion"
import { Infinity, Smartphone, RefreshCw, Sparkles, Leaf, BarChart3 } from "lucide-react"
import React from "react"

const advantages = [
    {
        icon: Infinity,
        title: "Unlimited Sharing",
        description: "Never run out of business cards. Share with thousands, forever.",
        className: "md:col-span-2",
        gradient: "from-violet-500 to-purple-600"
    },
    {
        icon: Smartphone,
        title: "No App Required",
        description: "Works on any NFC-enabled smartphone. iPhone, Android, all of them.",
        className: "md:col-span-1",
        gradient: "from-cyan-500 to-blue-600"
    },
    {
        icon: RefreshCw,
        title: "Update Anytime",
        description: "New job? New number? Edit your profile instantly—completely free.",
        className: "md:col-span-1",
        gradient: "from-emerald-500 to-green-600"
    },
    {
        icon: Sparkles,
        title: "Premium Materials",
        description: "Aerospace-grade metal that commands respect. PVC for flexibility. Wood for uniqueness.",
        className: "md:col-span-2",
        gradient: "from-amber-500 to-orange-600"
    },
    {
        icon: Leaf,
        title: "Eco-Friendly",
        description: "Zero paper waste. Zero reprints. One card, infinite impressions.",
        className: "md:col-span-1",
        gradient: "from-green-500 to-emerald-600"
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Track every tap. See who viewed your profile. Measure your networking ROI.",
        className: "md:col-span-2",
        gradient: "from-blue-500 to-indigo-600"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0
    }
}

export default function Advantages() {
    return (
        <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
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
                    <span className="inline-block text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4">
                        Why TapOnce
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                        Everything You Need,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                            Nothing You Don't
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Designed for professionals who value simplicity and impact.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
                >
                    {advantages.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111] p-8 ${item.className} cursor-default`}
                        >
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${item.gradient} mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                <item.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {item.description}
                            </p>

                            {/* Subtle gradient bloom on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

                            {/* Border glow on hover */}
                            <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
