"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Instagram, Twitter, Linkedin, Mail, Check, Loader2, Cpu } from "lucide-react"

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
        <footer className="relative bg-white text-slate-900 pt-16 pb-10 overflow-hidden border-t border-zinc-150">
            {/* Ambient Technical Background Grid */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.015] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-4">
                        <Link href="/" className="inline-block flex items-center gap-2 group">
                            <div className="h-6.5 w-6.5 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                                <Cpu className="h-4 w-4 text-white animate-pulse" />
                            </div>
                            <span className="font-display font-bold text-sm tracking-tight text-slate-900">
                                Tap<span className="text-primary">Once</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 text-xs leading-relaxed max-w-xs font-normal">
                            The last business card you'll ever need. Share your professional profile instantly with a single tap.
                        </p>
                        <div className="flex gap-2.5 pt-1">
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
                                    className="h-7 w-7 flex items-center justify-center rounded-lg bg-zinc-50 border border-zinc-200/80 hover:bg-zinc-100 hover:text-primary transition-colors text-zinc-400"
                                >
                                    <Icon size={12} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">[NAVIGATION]</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/order" className="text-zinc-500 hover:text-slate-900 transition-colors text-xs font-semibold">
                                    Get Custom Card
                                </Link>
                            </li>
                            <li>
                                <Link href="/order/track" className="text-zinc-500 hover:text-slate-900 transition-colors text-xs font-semibold">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/#collection" className="text-zinc-500 hover:text-slate-900 transition-colors text-xs font-semibold">
                                    Materials & Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription Column */}
                    <div className="md:col-span-4 space-y-3">
                        <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">[NEWSLETTER]</h4>
                        <p className="text-zinc-500 text-xs leading-relaxed font-normal">
                            Subscribe to get notified about new templates and material drops.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-1.5">
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
                                    className="flex-1 min-w-0 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                                    disabled={status === "loading" || status === "success"}
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="flex items-center justify-center px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : status === "success" ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    ) : (
                                        "Subscribe"
                                    )}
                                </button>
                            </div>
                            
                            {status === "success" && (
                                <p className="text-[10px] text-emerald-600 font-semibold pt-0.5">
                                    Subscribed successfully!
                                </p>
                            )}
                            
                            {status === "error" && (
                                <p className="text-[10px] text-rose-500 font-semibold pt-0.5">
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-150 text-[10px] text-zinc-400 font-semibold tracking-wide">
                    <p>&copy; {new Date().getFullYear()} TAPONCE. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-5 font-mono uppercase">
                        <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
                        <a href="mailto:hello@taponce.in" className="flex items-center gap-1 hover:text-slate-900 transition-colors font-sans lowercase">
                            <Mail size={11} />
                            hello@taponce.in
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
