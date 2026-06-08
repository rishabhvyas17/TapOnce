"use client"

import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
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
        { name: "Cards", href: "/order" },
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
                        relative flex items-center justify-between w-full transition-all duration-500 ease-out
                        ${isScrolled
                            ? 'max-w-2xl px-4 py-2.5 glass border border-white/[0.06] rounded-full shadow-lg shadow-black/20'
                            : 'max-w-5xl px-2 py-3 bg-transparent'
                        }
                    `}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" aria-label="TapOnce home">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-violet-700 flex items-center justify-center transition-transform group-hover:scale-105">
                            <span className="font-bold text-white text-sm">T</span>
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight text-white">
                            Tap<span className="text-primary">Once</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3.5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-3.5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/order"
                            className="group flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-zinc-100 transition-all active:scale-95"
                        >
                            Get Your Card
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
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
                                            className="block py-4 text-xl font-display font-semibold text-white border-b border-white/[0.06] active:text-primary transition-colors"
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
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black font-semibold rounded-xl active:scale-[0.98] transition-transform"
                                >
                                    Get Your Card
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full py-3.5 text-center text-zinc-400 font-medium border border-white/[0.08] rounded-xl active:bg-white/[0.04] transition-colors"
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
