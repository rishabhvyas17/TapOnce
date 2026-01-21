"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Rocket, TrendingUp, Users } from "lucide-react"
import React, { useRef } from "react"

const stats = [
    { icon: Users, value: "500+", label: "CEOs & Founders" },
    { icon: TrendingUp, value: "200+", label: "Events & Conferences" },
    { icon: Rocket, value: "50+", label: "Startups Onboarded" }
]

export default function PrideSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
        <section
            ref={containerRef}
            className="py-32 bg-gradient-to-b from-[#050505] via-violet-950/10 to-[#050505] relative overflow-hidden"
        >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Messaging */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="inline-block text-xs font-bold tracking-[0.3em] text-violet-400 uppercase">
                                Stay Ahead
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                                Evolve with the Future,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                                    or Get Left Behind
                                </span>
                            </h2>
                        </div>

                        <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                            The professionals who stand out are the ones who embrace innovation first.
                            While others fumble with paper cards, you make an impression that lasts.
                        </p>

                        <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
                            TapOnce isn't just a business card—it's a statement. A signal that you're
                            someone who values efficiency, quality, and forward-thinking.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <stat.icon className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-zinc-500">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Premium Card Visual */}
                    <motion.div
                        style={{ y }}
                        className="relative flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            whileHover={{ rotateY: 5, scale: 1.02 }}
                            className="relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] perspective-1000"
                        >
                            {/* The Premium Card */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/10 shadow-2xl overflow-hidden">
                                {/* Metal Texture */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                {/* Gradient Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

                                {/* Card Content */}
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                    <div>
                                        <div className="text-2xl font-bold text-white tracking-tight mb-1">
                                            Your Name
                                        </div>
                                        <div className="text-sm text-zinc-400">CEO & Founder</div>
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                                        <span className="text-lg font-bold text-white">T</span>
                                    </div>
                                </div>

                                {/* NFC Symbol */}
                                <div className="absolute top-6 right-6 opacity-30">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor" fillOpacity="0.3" />
                                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" fillOpacity="0.5" />
                                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-3xl blur-2xl -z-10" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
