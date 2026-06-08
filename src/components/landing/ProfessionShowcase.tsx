"use client"

import { motion } from "framer-motion"
import { Stethoscope, Scale, Building2, PenTool, Rocket, Code, Megaphone, PartyPopper, Calculator, Camera, ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

const professions = [
    {
        icon: Stethoscope,
        title: "Doctors & Healthcare",
        description: "Share clinic location, appointment booking links, and patient resources with one tap. Patients save your contact instantly — no more lost prescriptions or missed follow-ups.",
        keywords: "Clinics • Hospitals • Specialists • Dentists",
        color: "bg-blue-50 border-blue-100 text-blue-600",
    },
    {
        icon: Scale,
        title: "Lawyers & Legal Advisors",
        description: "Share your bar credentials, practice areas, and consultation booking link. A premium metal card reinforces trust and authority from the very first handshake.",
        keywords: "Advocates • Law Firms • Legal Consultants",
        color: "bg-amber-50 border-amber-100 text-amber-600",
    },
    {
        icon: Building2,
        title: "Real Estate Agents",
        description: "Share property listings, 3D virtual tours, and your direct WhatsApp during site visits. Clients tap, browse, and call — closing deals faster than ever.",
        keywords: "Brokers • Property Managers • Builders",
        color: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
    {
        icon: PenTool,
        title: "Architects & Designers",
        description: "Turn every meeting into a portfolio showcase. One tap reveals your 3D renders, project galleries, before-and-after transformations, and client testimonials.",
        keywords: "Interior Designers • Urban Planners • Studio Heads",
        color: "bg-purple-50 border-purple-100 text-purple-600",
    },
    {
        icon: Rocket,
        title: "Startup Founders & CEOs",
        description: "Pitch decks, LinkedIn, funding portfolio — all instantly accessible. Network at scale during demo days, investor meetings, and industry conferences.",
        keywords: "Entrepreneurs • Co-founders • CXOs",
        color: "bg-rose-50 border-rose-100 text-rose-600",
    },
    {
        icon: Code,
        title: "Freelancers & Developers",
        description: "Your GitHub, Behance, Dribbble, and client testimonials — instantly shareable. One card that adapts as your portfolio grows. No reprinting needed.",
        keywords: "Designers • Writers • Consultants • Engineers",
        color: "bg-cyan-50 border-cyan-100 text-cyan-600",
    },
    {
        icon: Megaphone,
        title: "Sales & Marketing Teams",
        description: "Equip your entire team with branded NFC cards. Track networking ROI across your organization. Sync contacts directly to your CRM after every event.",
        keywords: "BDMs • Account Managers • Brand Teams",
        color: "bg-orange-50 border-orange-100 text-orange-600",
    },
    {
        icon: PartyPopper,
        title: "Event Managers",
        description: "Share event schedules, vendor contacts, sponsorship decks, and registration links instantly at conferences, expos, and corporate events.",
        keywords: "Wedding Planners • Conference Organizers",
        color: "bg-pink-50 border-pink-100 text-pink-600",
    },
    {
        icon: Calculator,
        title: "CAs & Financial Advisors",
        description: "Share your credentials, service portfolio, and direct consultation booking. Build trust instantly with a premium card that reflects your financial expertise.",
        keywords: "Chartered Accountants • Tax Consultants • CFPs",
        color: "bg-indigo-50 border-indigo-100 text-indigo-600",
    },
    {
        icon: Camera,
        title: "Photographers & Creators",
        description: "Your portfolio is your pitch. One tap shows your best work, booking calendar, pricing packages, and Instagram feed. First impressions that convert.",
        keywords: "Videographers • Content Creators • Influencers",
        color: "bg-teal-50 border-teal-100 text-teal-600",
    },
]

export default function ProfessionShowcase() {
    return (
        <section id="professions" className="section-padding bg-neutral-50">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        Built For Every Professional
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900 mb-4"
                    >
                        Your profession. Your card. Your way.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 text-base leading-relaxed"
                    >
                        Whether you&apos;re a surgeon sharing clinic details or a startup founder sharing pitch decks — 
                        TapOnce adapts to how you work.
                    </motion.p>
                </div>

                {/* Profession Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {professions.map((profession, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-white rounded-2xl border border-neutral-200/80 p-6 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Icon + Title */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className={`h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center ${profession.color}`}>
                                    <profession.icon className="h-4.5 w-4.5" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-base font-display font-semibold text-neutral-900 tracking-tight">
                                        {profession.title}
                                    </h3>
                                    <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
                                        {profession.keywords}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-neutral-500 leading-relaxed">
                                {profession.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/order"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white font-semibold rounded-full hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm text-sm"
                    >
                        Get Your Card for Your Profession
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
