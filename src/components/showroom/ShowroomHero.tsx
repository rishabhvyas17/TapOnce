"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, Calendar, Share2, User, MapPin, Mail, Globe, Linkedin, Instagram, Twitter, Bookmark, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/* 
 * Interactive Portfolio Phone Mockup 
 * Shows a simulated TapOnce portfolio loading after a "tap" animation.
 * This IS the product demo — embedded directly in the hero.
 */
function PortfolioMockup() {
    return (
        <div className="relative w-full max-w-[320px] mx-auto">
            {/* NFC pulse rings behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none z-0">
                <div className="absolute inset-0 rounded-full border border-gold-300/20 animate-[pulse-ring_3s_ease-out_infinite]" />
                <div className="absolute inset-4 rounded-full border border-gold-300/15 animate-[pulse-ring_3s_ease-out_infinite_0.5s]" />
                <div className="absolute inset-8 rounded-full border border-gold-300/10 animate-[pulse-ring_3s_ease-out_infinite_1s]" />
            </div>

            {/* Phone Frame */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative z-10 rounded-[40px] bg-[#0A0A0A] p-2.5 shadow-2xl shadow-neutral-900/30 border border-neutral-800"
            >
                {/* Dynamic Island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30" />

                {/* Screen Content */}
                <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] aspect-[9/17]">
                    {/* Portfolio Header */}
                    <div className="pt-10 px-5 pb-4 text-center">
                        {/* Profile Photo Placeholder */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}
                            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-3 ring-2 ring-gold-400/30 ring-offset-2 ring-offset-[#0A0A0A]"
                        >
                            <User className="w-7 h-7 text-white" />
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="text-white font-semibold text-sm"
                        >
                            Arjun Mehta
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="text-neutral-400 text-[11px] mt-0.5"
                        >
                            Senior Architect • Studio Parallax
                        </motion.p>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex items-center justify-center gap-1 mt-1.5 text-neutral-500 text-[10px]"
                        >
                            <MapPin className="w-2.5 h-2.5" />
                            Mumbai, India
                        </motion.div>
                    </div>

                    {/* Quick Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        className="px-5 grid grid-cols-3 gap-2 mb-4"
                    >
                        <button className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 transition-colors">
                            <Bookmark className="w-3.5 h-3.5 text-gold-400" />
                            <span className="text-[9px] text-neutral-300 font-medium">Save Contact</span>
                        </button>
                        <button className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 transition-colors">
                            <Calendar className="w-3.5 h-3.5 text-gold-400" />
                            <span className="text-[9px] text-neutral-300 font-medium">Book Meeting</span>
                        </button>
                        <button className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 transition-colors">
                            <Share2 className="w-3.5 h-3.5 text-gold-400" />
                            <span className="text-[9px] text-neutral-300 font-medium">Share</span>
                        </button>
                    </motion.div>

                    {/* Contact Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="px-5 space-y-1.5 mb-4"
                    >
                        {[
                            { icon: Phone, label: "+91 98765 43210", color: "text-emerald-400" },
                            { icon: Mail, label: "arjun@studioparallax.com", color: "text-blue-400" },
                            { icon: Globe, label: "studioparallax.com", color: "text-purple-400" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                                <span className="text-[10px] text-neutral-300 font-medium">{item.label}</span>
                                <ChevronRight className="w-3 h-3 text-neutral-600 ml-auto" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7 }}
                        className="px-5 flex gap-2 justify-center pb-6"
                    >
                        {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                            <div
                                key={i}
                                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center"
                            >
                                <Icon className="w-3.5 h-3.5 text-neutral-400" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Bottom branding */}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-[8px] text-neutral-600 font-medium tracking-wider">
                            powered by <span className="text-gold-500">TapOnce</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Floating NFC Card hovering near the phone */}
            <motion.div
                initial={{ opacity: 0, x: 40, rotate: 15 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="absolute -right-4 top-[40%] z-20"
            >
                <motion.div
                    animate={{ y: [-3, 3, -3], rotate: [-5, -3, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-12 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-xl flex items-center justify-center"
                >
                    <div className="text-center">
                        <div className="text-[6px] font-display font-bold text-white tracking-tight leading-none">Tap<span className="text-gold-400">Once</span></div>
                        <div className="w-4 h-4 mt-0.5 mx-auto rounded-full border border-gold-400/30 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default function ShowroomHero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-white flex items-center pt-32 pb-20 lg:pt-36 lg:pb-24">
            {/* Subtle ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,163,95,0.06)_0%,transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,163,95,0.04)_0%,transparent_70%)]" />
            </div>

            <div className="container relative z-10 grid lg:grid-cols-12 gap-16 lg:gap-12 items-center px-4 md:px-6 max-w-6xl">
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1">

                    {/* Small trust badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-50 border border-neutral-200"
                    >
                        <span className="flex items-center gap-1">
                            <span className="text-amber-500 text-xs">★★★★★</span>
                        </span>
                        <span className="text-xs font-medium text-neutral-600">
                            Trusted by 10,000+ Professionals
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-display-xl font-display font-bold tracking-tight leading-[1.08] text-neutral-900"
                        >
                            One Tap. Your Entire{" "}
                            <span className="text-gradient-gold">
                                Professional Identity.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed"
                        >
                            Premium NFC business cards that instantly share your personalized digital portfolio — 
                            contact details, appointment booking, social media, and more. 
                            No app needed. Works on every smartphone.
                        </motion.p>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                    >
                        <Link
                            href="/order"
                            className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0A0A0A] text-white font-semibold rounded-full hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-md text-sm"
                        >
                            Order Your Card — ₹1,000
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-100 text-neutral-700 font-semibold rounded-full hover:bg-neutral-200 transition-all active:scale-[0.98] text-sm border border-neutral-200"
                        >
                            See How It Works
                        </Link>
                    </motion.div>

                    {/* Key Features Strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-neutral-100 w-full justify-center lg:justify-start"
                    >
                        {[
                            "Free Shipping India-wide",
                            "Cash on Delivery",
                            "Lifetime Chip Warranty",
                            "Update Anytime",
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium">
                                <div className="w-1 h-1 rounded-full bg-gold-400" />
                                {feature}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right: Interactive Portfolio Mockup */}
                <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
                    <PortfolioMockup />
                </div>
            </div>
        </section>
    )
}
