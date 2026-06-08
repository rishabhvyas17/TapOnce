"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ArrowRight, Check, ChevronRight, DollarSign, Users, Clock, Loader2, PartyPopper, Briefcase, TrendingUp, Award } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const benefits = [
    {
        icon: DollarSign,
        title: "Earn ₹100+ Per Sale",
        description: "Base commission on every card sold, plus bonuses for exceeding targets"
    },
    {
        icon: TrendingUp,
        title: "Unlimited Earning Potential",
        description: "The more you sell, the more you earn. No caps or limits."
    },
    {
        icon: Users,
        title: "Build Your Network",
        description: "Recruit sub-agents and earn 2% override on all their sales"
    },
    {
        icon: Clock,
        title: "Flexible Schedule",
        description: "Work part-time or full-time. You control your hours."
    },
    {
        icon: Briefcase,
        title: "Marketing Support",
        description: "Get sales training, demo cards, and marketing materials"
    },
    {
        icon: Award,
        title: "Performance Rewards",
        description: "Top agents get exclusive bonuses and recognition"
    }
]

export default function BecomeAgentContent() {
    const searchParams = useSearchParams()
    const refCode = searchParams.get('ref')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        experience: "",
        referralCode: refCode || ""
    })

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const isFormValid = form.fullName && form.phone.length >= 10 && form.email.includes('@') && form.city

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/agents/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application')
            }

            setSuccess(true)

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <main className="min-h-screen bg-background text-slate-900 selection:bg-primary/15 selection:text-primary">
                <Navbar />

                <div className="container mx-auto px-4 py-24 max-w-5xl flex items-center justify-center min-h-[70vh]">
                    <div className="max-w-lg w-full text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="h-20 w-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center animate-bounce">
                                <PartyPopper className="h-10 w-10 text-emerald-600" />
                            </div>
                        </div>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase mb-4">
                            [APPLICATION_SUCCESS]
                        </span>

                        <h1 className="text-3xl font-display font-bold mb-4 tracking-tight text-slate-900">Application Submitted!</h1>
                        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                            Thank you for your interest in joining the TapOnce team. Our team will review your application and contact you within 48 hours.
                        </p>

                        <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 mb-8 text-left space-y-4 shadow-sm">
                            <h3 className="font-semibold text-slate-900 text-sm uppercase font-mono tracking-wider">[Next Steps]</h3>
                            <ul className="space-y-3 text-xs text-zinc-500 font-normal">
                                <li className="flex items-start gap-2.5">
                                    <Check className="h-4 w-4 text-emerald-650 mt-0.5 shrink-0" />
                                    <span>Our team will review your application details.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="h-4 w-4 text-emerald-650 mt-0.5 shrink-0" />
                                    <span>You&apos;ll receive a call or WhatsApp message on your phone.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="h-4 w-4 text-emerald-650 mt-0.5 shrink-0" />
                                    <span>Once approved, you&apos;ll get your login credentials.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="h-4 w-4 text-emerald-650 mt-0.5 shrink-0" />
                                    <span>Start selling and earning commissions!</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider font-mono"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-slate-900 selection:bg-primary/15 selection:text-primary">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />
                <div className="container mx-auto px-4 relative max-w-5xl">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                            [PARTNER_WIZARD]
                        </span>

                        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-slate-900">
                            Become a TapOnce <span className="text-primary">Agent</span>
                        </h1>

                        <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Earn great commissions selling premium NFC smart cards. Flexible hours, unlimited potential, and all the support you need to succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-xs font-mono font-bold text-zinc-400 text-center uppercase tracking-wider mb-8">[AGENT_PROGRAM_BENEFITS]</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 hover:border-zinc-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                <div>
                                    <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                                        <benefit.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-12" id="apply">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center mb-8 space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Apply Now</h2>
                            <p className="text-zinc-500 text-xs">Fill out the form below and we&apos;ll get in touch</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
                            {error && (
                                <div className="p-3 text-xs text-rose-650 bg-rose-50 rounded-xl border border-rose-100 font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.fullName}
                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                        Phone <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="10-digit number"
                                        className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                        City <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                        placeholder="Your city"
                                        className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                    Email <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                    Sales Experience (optional)
                                </label>
                                <textarea
                                    value={form.experience}
                                    onChange={(e) => handleChange("experience", e.target.value)}
                                    placeholder="Tell us about any sales or marketing experience you have..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                    Referral Code (if any)
                                </label>
                                <input
                                    type="text"
                                    value={form.referralCode}
                                    onChange={(e) => handleChange("referralCode", e.target.value.toUpperCase())}
                                    placeholder="e.g. PRINCE10"
                                    className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium uppercase"
                                />
                                <p className="text-[10px] text-zinc-400 leading-relaxed mt-1">
                                    Were you referred by an existing agent? Enter their code.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all ${isFormValid && !loading
                                    ? "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99]"
                                    : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Application <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-[10px] text-zinc-400">
                                By submitting, you agree to be contacted by our team
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-xs font-mono font-bold text-zinc-400 text-center uppercase tracking-wider mb-8">[FREQUENTLY_ASKED_QUESTIONS]</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "How much can I earn?",
                                    a: "You earn ₹100+ base commission per card sold. Top agents sell 20+ cards per month, earning ₹2,000+ in commissions alone, plus bonuses."
                                },
                                {
                                    q: "Do I need sales experience?",
                                    a: "No prior experience required! We provide complete training and support to help you succeed."
                                },
                                {
                                    q: "How do I get paid?",
                                    a: "Commissions are paid weekly via UPI or bank transfer. You can request a payout anytime from your dashboard."
                                },
                                {
                                    q: "What training is provided?",
                                    a: "You'll get access to sales scripts, demo cards, marketing materials, and a WhatsApp support group with other agents."
                                }
                            ].map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-5 shadow-sm"
                                >
                                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                                        {faq.q}
                                    </h3>
                                    <p className="text-zinc-500 text-xs pl-6 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
