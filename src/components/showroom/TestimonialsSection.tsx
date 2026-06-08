"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import React from "react"

const testimonials = [
    {
        name: "Adv. Priya Sharma",
        role: "Senior Advocate, Delhi HC",
        content: "I handed my metal card to a VC at a conference. The reaction when they tapped and my credentials appeared? Priceless. Got a follow-up meeting that same day.",
        rating: 5,
        avatar: "PS",
    },
    {
        name: "Dr. Vikram Mehta",
        role: "Cardiologist, Fortis Hospital",
        content: "My patients are always impressed. They save my contact instantly and patient referrals have increased by 40%. The matte metal finish screams professionalism.",
        rating: 5,
        avatar: "VM",
    },
    {
        name: "Sneha Kapoor",
        role: "Lifestyle Creator, 500K+ Followers",
        content: "Brand meetings are so much smoother now. One tap and they have my media kit, social profiles, and collaboration email. No more awkward link-in-bio exchanges.",
        rating: 5,
        avatar: "SK",
    },
    {
        name: "Rajesh Agarwal",
        role: "CEO, TechVentures India",
        content: "First impressions matter. When I hand over my custom matte black metal card, it immediately sets a high-end tone for the meeting. Worth every single rupee.",
        rating: 5,
        avatar: "RA",
    },
    {
        name: "Amit Desai",
        role: "Senior Broker, PropFirst Realty",
        content: "I'm on site visits daily. Now clients get property catalog links, virtual tours, and my contact card with one tap. Deals are closing much faster than before.",
        rating: 5,
        avatar: "AD",
    },
    {
        name: "Meera Iyer",
        role: "Interior Designer, Studio M",
        content: "My portfolio speaks louder than any pitch. Clients tap my card and immediately see my 3D renders and completed projects. It has transformed how I get new clients.",
        rating: 5,
        avatar: "MI",
    },
]

export default function TestimonialsSection() {
    return (
        <section className="section-padding bg-white border-y border-neutral-100 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        What Professionals Say
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900 mb-4"
                    >
                        Trusted by professionals who mean business.
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-neutral-700">4.9 out of 5</span>
                        <span className="text-sm text-neutral-400">based on 500+ reviews</span>
                    </motion.div>
                </div>

                {/* Testimonial Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ delay: i * 0.06 }}
                            className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 hover:shadow-md transition-shadow"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/60">
                                <div className="h-9 w-9 shrink-0 rounded-full bg-[#0A0A0A] flex items-center justify-center font-display font-bold text-white text-[10px]">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-neutral-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-neutral-400">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
