"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ShowroomHero() {
    return (
        <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden bg-background text-white flex items-center justify-center pt-24 pb-16 lg:py-0">
            {/* Living Ambient Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div 
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.15)_0%,rgba(168,85,247,0.04)_50%,transparent_80%)]"
                />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
            </div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

            <div className="container relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center px-4 md:px-6 max-w-6xl">
                {/* Left Content Column */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
                            Premium NFC Business Cards
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] text-white"
                        >
                            Your First Impression,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-indigo-300">
                                Elevated.
                            </span>
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed font-normal"
                        >
                            Stop passing paper. Share your contact info, social profiles, and portfolios with a single tap. Minimal design, maximum impact.
                        </motion.p>
                    </div>

                    {/* Single CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                        >
                            Design Your Card
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Compact Social Proof / Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex items-center gap-8 pt-6 border-t border-white/[0.06] w-full justify-center lg:justify-start"
                    >
                        <div>
                            <div className="text-xl md:text-2xl font-bold font-display text-white">10K+</div>
                            <div className="text-xs text-zinc-500">Cards Shipped</div>
                        </div>
                        <div className="h-8 w-px bg-white/[0.08]" />
                        <div>
                            <div className="text-xl md:text-2xl font-bold font-display text-white">4.9★</div>
                            <div className="text-xs text-zinc-500">Customer Rating</div>
                        </div>
                        <div className="h-8 w-px bg-white/[0.08]" />
                        <div>
                            <div className="text-xl md:text-2xl font-bold font-display text-white">COD</div>
                            <div className="text-xs text-zinc-500">Available India-wide</div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Visual Column (Shows first on mobile) */}
                <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                        className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none aspect-square flex items-center justify-center"
                    >
                        {/* Glow Behind the Image */}
                        <div className="absolute w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] -z-10 pointer-events-none" />

                        {/* Image Container with Elegant Floating Motion */}
                        <motion.div
                            animate={{
                                y: [-6, 6, -6],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/80 bg-zinc-950"
                        >
                            <Image
                                src="/images/hero-cards.png"
                                alt="Premium NFC Metal & PVC Business Cards"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
