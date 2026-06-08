"use client"

import { motion } from "framer-motion"
import { ArrowRight, Cpu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ShowroomHero() {
    return (
        <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden bg-white text-slate-900 flex items-center justify-center pt-28 pb-16 lg:py-0 border-b border-zinc-100">
            {/* Ambient Technical Background Grid */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            {/* Subtle light ambient glow */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div 
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(79,70,229,0.06)_0%,rgba(59,130,246,0.02)_50%,transparent_80%)]"
                />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="container relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center px-4 md:px-6 max-w-5xl">
                {/* Left Content Column */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1">
                    
                    {/* Badge / Monospace spec details */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200/80"
                    >
                        <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                            [NFC.V2_COMPATIBLE]
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] text-slate-900"
                        >
                            Your first impression,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                simplified.
                            </span>
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="text-sm md:text-base text-zinc-500 max-w-lg leading-relaxed font-normal"
                        >
                            Stop passing paper. Share contact cards, social profiles, and link collections with a single tap. Minimal tech-prestige design.
                        </motion.p>
                    </div>

                    {/* Primary CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-1.5 w-full sm:w-auto px-7 py-3.5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm"
                        >
                            Get Custom Card
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Specs / Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex items-center gap-6 pt-6 border-t border-zinc-100 w-full justify-center lg:justify-start text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider"
                    >
                        <div>
                            <div className="text-sm font-bold text-slate-900 font-sans">10K+</div>
                            <div>SHIPPED</div>
                        </div>
                        <div className="h-6 w-px bg-zinc-200" />
                        <div>
                            <div className="text-sm font-bold text-slate-900 font-sans">4.9★</div>
                            <div>RATING</div>
                        </div>
                        <div className="h-6 w-px bg-zinc-200" />
                        <div>
                            <div className="text-sm font-bold text-slate-900 font-sans">COD</div>
                            <div>AVAILABLE</div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Visual Column (Shows first on mobile) */}
                <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                        className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none aspect-square flex items-center justify-center"
                    >
                        {/* Glow Behind the Image */}
                        <div className="absolute w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(79,70,229,0.06)_0%,transparent_70%)] -z-10 pointer-events-none" />

                        {/* Image Container with Elegant Floating Motion */}
                        <motion.div
                            animate={{
                                y: [-4, 4, -4],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 shadow-xl shadow-zinc-100/40 bg-zinc-50"
                        >
                            <Image
                                src="/images/hero-cards.png"
                                alt="Premium NFC Metal & PVC Business Cards"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center scale-[1.02] hover:scale-104 transition-transform duration-700"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
