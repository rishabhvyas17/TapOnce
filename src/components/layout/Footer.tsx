"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Instagram, Twitter, Linkedin, Mail, Check, Loader2, Phone } from "lucide-react"

export default function Footer() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus("loading")
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            if (res.ok) {
                setStatus("success")
                setEmail("")
            } else {
                const data = await res.json()
                setStatus("error")
                setErrorMessage(data.error || "Something went wrong.")
            }
        } catch (err) {
            setStatus("error")
            setErrorMessage("Failed to subscribe. Please try again.")
        }
    }

    return (
        <footer className="relative bg-[#0A0A0A] text-white pt-16 pb-8 overflow-hidden">
            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="font-display font-bold text-lg tracking-tight text-white">
                                Tap<span className="text-gold-400">Once</span>
                            </span>
                        </Link>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                            India&apos;s premium NFC smart business cards. Share your professional portfolio, 
                            contact, and social media with a single tap.
                        </p>
                        <div className="flex gap-2.5 pt-1">
                            {[
                                { Icon: Instagram, href: "https://instagram.com/taponce", label: "Instagram" },
                                { Icon: Twitter, href: "https://twitter.com/taponce", label: "Twitter" },
                                { Icon: Linkedin, href: "https://linkedin.com/company/taponce", label: "LinkedIn" },
                            ].map(({ Icon, href, label }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 hover:text-gold-400 transition-colors text-neutral-500"
                                    aria-label={label}
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Product</h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: "Order Card", href: "/order" },
                                { name: "How It Works", href: "/#how-it-works" },
                                { name: "Use Cases", href: "/#professions" },
                                { name: "Track Order", href: "/order/track" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Company</h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: "Products & Pricing", href: "/#products" },
                                { name: "FAQ", href: "/#faq" },
                                { name: "Privacy Policy", href: "/privacy" },
                                { name: "Terms of Service", href: "/terms" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter + Contact */}
                    <div className="md:col-span-4 space-y-5">
                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Stay Updated</h4>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Get notified about new card designs, features, and exclusive offers.
                            </p>

                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            if (status === "error") setStatus("idle")
                                        }}
                                        placeholder="Enter your email"
                                        className="flex-1 min-w-0 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-gold-400/50 transition-all"
                                        disabled={status === "loading" || status === "success"}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "loading" || status === "success"}
                                        className="flex items-center justify-center px-5 py-2.5 bg-gold-400 text-neutral-900 font-semibold rounded-xl text-sm hover:bg-gold-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : status === "success" ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            "Subscribe"
                                        )}
                                    </button>
                                </div>

                                {status === "success" && (
                                    <p className="text-xs text-emerald-400 font-medium">
                                        Subscribed successfully!
                                    </p>
                                )}

                                {status === "error" && (
                                    <p className="text-xs text-rose-400 font-medium">
                                        {errorMessage}
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 pt-2">
                            <a href="mailto:hello@taponce.in" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                                <Mail size={14} />
                                hello@taponce.in
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                                <Phone size={14} />
                                WhatsApp Support
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/[0.06] text-xs text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} TapOnce. All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms</Link>
                        <Link href="/refund" className="hover:text-neutral-400 transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
