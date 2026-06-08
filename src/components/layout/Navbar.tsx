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

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const navLinks = [
        { name: "Use Cases", href: "/#professions" },
        { name: "Products", href: "/#products" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "FAQ", href: "/#faq" },
    ]

    return (
        <>
            {/* Announcement Bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0A0A0A] text-white text-center py-2 px-4">
                <p className="text-xs font-medium tracking-wide">
                    🚀 <span className="font-semibold">Launch Offer:</span> Free Shipping on All Orders Across India
                    <Link href="/order" className="ml-2 underline underline-offset-2 hover:text-gold-300 transition-colors font-semibold">
                        Order Now →
                    </Link>
                </p>
            </div>

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 24 }}
                className="fixed top-[36px] left-0 right-0 z-50 flex justify-center px-4 pt-2 md:pt-3"
            >
                <nav
                    aria-label="Main navigation"
                    className={`
                        relative flex items-center justify-between w-full max-w-6xl px-5 md:px-6 py-3 transition-all duration-300 ease-out rounded-2xl border
                        ${isScrolled
                            ? 'glass border-neutral-200/60 shadow-lg shadow-neutral-200/30'
                            : 'bg-white/60 backdrop-blur-sm border-transparent'
                        }
                    `}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1.5 group" aria-label="TapOnce home">
                        <span className="font-display font-bold text-lg tracking-tight text-neutral-900">
                            Tap<span className="text-gold-400">Once</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3.5 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-50"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/order"
                            className="group flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#0A0A0A] text-white rounded-full hover:bg-neutral-800 transition-all active:scale-[0.97] shadow-sm"
                        >
                            Order Your Card
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white md:hidden"
                    >
                        <div className="flex flex-col h-full pt-28 px-6 pb-safe">
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
                                            className="block py-4 text-lg font-display font-semibold text-neutral-900 border-b border-neutral-100 active:text-gold-500 transition-colors"
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
                                    className="flex items-center justify-center gap-1.5 w-full py-3.5 bg-[#0A0A0A] text-white font-semibold rounded-xl active:scale-[0.98] transition-transform text-sm shadow-sm"
                                >
                                    Order Your Card
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full py-3.5 text-center text-neutral-600 font-semibold border border-neutral-200 rounded-xl active:bg-neutral-50 transition-colors text-sm"
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
