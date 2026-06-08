"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Instagram, Twitter, Linkedin, Mail, Check, Loader2 } from "lucide-react"

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
        <footer className="relative bg-background text-white pt-20 pb-10 overflow-hidden border-t border-white/[0.04]">
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_75%)] translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="inline-block flex items-center gap-2 group">
                            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-violet-700 flex items-center justify-center transition-transform group-hover:scale-105">
                                <span className="font-bold text-white text-xs">T</span>
                            </div>
                            <span className="font-display font-bold text-base tracking-tight text-white">
                                Tap<span className="text-primary">Once</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-normal">
                            The last business card you'll ever need. Share your professional profile instantly with a single tap.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {[
                                { Icon: Instagram, href: "https://instagram.com/taponce" },
                                { Icon: Twitter, href: "https://twitter.com/taponce" },
                                { Icon: Linkedin, href: "https://linkedin.com/company/taponce" }
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:text-primary transition-colors text-zinc-400"
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Product</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="/order" className="text-zinc-400 hover:text-white transition-colors text-sm font-normal">
                                    Get Custom Card
                                </Link>
                            </li>
                            <li>
                                <Link href="/order/track" className="text-zinc-400 hover:text-white transition-colors text-sm font-normal">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/#collection" className="text-zinc-400 hover:text-white transition-colors text-sm font-normal">
                                    Materials & Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription Column */}
                    <div className="md:col-span-4 space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Stay Updated</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                            Subscribe to get notified about new templates and material drops.
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
                                    className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all"
                                    disabled={status === "loading" || status === "success"}
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="flex items-center justify-center px-4 py-2.5 bg-white text-black font-semibold rounded-xl text-xs hover:bg-zinc-150 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 min-w-[64px]"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : status === "success" ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                        "Subscribe"
                                    )}
                                </button>
                            </div>
                            
                            {status === "success" && (
                                <p className="text-xs text-emerald-400 font-medium pt-1">
                                    Subscribed successfully!
                                </p>
                            )}
                            
                            {status === "error" && (
                                <p className="text-xs text-rose-400 font-medium pt-1">
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06] text-xs text-zinc-500 font-normal">
                    <p>&copy; {new Date().getFullYear()} TapOnce. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-350 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-355 transition-colors">Terms of Service</Link>
                        <a href="mailto:hello@taponce.in" className="flex items-center gap-1 hover:text-zinc-355 transition-colors">
                            <Mail size={12} />
                            hello@taponce.in
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
