"use client"

import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Cpu } from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const { scrollY } = useScroll()

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (v) => setIsScrolled(v > 40))
        return () => unsubscribe()
    }, [scrollY])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const navLinks = [
        { name: "Order Card", href: "/order" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Track Order", href: "/order/track" },
    ]

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 24 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-4"
            >
                <nav
                    aria-label="Main navigation"
                    className={`
                        relative flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-300 ease-out rounded-full border
                        ${isScrolled
                            ? 'glass border-zinc-200/80 shadow-md shadow-zinc-100/50'
                            : 'bg-transparent border-transparent'
                        }
                    `}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" aria-label="TapOnce home">
                        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                            <Cpu className="h-4.5 w-4.5 text-white animate-pulse" />
                        </div>
                        <span className="font-display font-bold text-base tracking-tight text-slate-900">
                            Tap<span className="text-primary">Once</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-zinc-100/60"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-550 hover:text-slate-900 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/order"
                            className="group flex items-center gap-1 px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-full hover:bg-slate-850 transition-all active:scale-95 shadow-sm"
                        >
                            Get Card
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-slate-900 hover:bg-zinc-100 transition-colors"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu — Full Screen Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-md md:hidden"
                    >
                        <div className="flex flex-col h-full pt-20 px-6 pb-safe">
                            <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block py-4 text-lg font-display font-bold text-slate-900 border-b border-zinc-100 active:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="space-y-3 pb-8"
                            >
                                <Link
                                    href="/order"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-1.5 w-full py-3 bg-slate-900 text-white font-semibold rounded-xl active:scale-[0.98] transition-transform text-sm shadow-sm"
                                >
                                    Get Card
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full py-3 text-center text-zinc-550 font-semibold border border-zinc-200 rounded-xl active:bg-zinc-50 transition-colors text-sm"
                                >
                                    Log in
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
