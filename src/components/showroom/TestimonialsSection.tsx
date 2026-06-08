"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState, useEffect, useCallback } from "react"

const testimonials = [
    {
        name: "Adv. Priya Sharma",
        role: "Senior Advocate, Delhi HC",
        content: "I handed my metal card to a VC at a conference. The reaction when they tapped and my credentials appeared? Priceless. Got a follow-up meeting that same day.",
        rating: 5,
        avatar: "PS"
    },
    {
        name: "Dr. Vikram Mehta",
        role: "Cardiologist, Fortis Hospital",
        content: "My patients are always impressed. They save my contact instantly and patient referrals have increased by 40%. The matte metal finish screams professionalism.",
        rating: 5,
        avatar: "VM"
    },
    {
        name: "Sneha Kapoor",
        role: "Lifestyle Creator, 500K+ Followers",
        content: "Brand meetings are so much smoother now. One tap and they have my media kit, social profiles, and collaboration email. No more awkward link-in-bio exchanges.",
        rating: 5,
        avatar: "SK"
    },
    {
        name: "Rajesh Agarwal",
        role: "CEO, TechVentures India",
        content: "First impressions matter. When I hand over my custom matte black metal card, it immediately sets a high-end tone for the meeting. Worth every single rupee.",
        rating: 5,
        avatar: "RA"
    },
    {
        name: "Amit Desai",
        role: "Senior Broker, PropFirst Realty",
        content: "I'm on site visits daily. Now clients get property catalog links, virtual tours, and my contact card with one tap. Deals are closing much faster than before.",
        rating: 5,
        avatar: "AD"
    }
]

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0) // -1 for left, 1 for right
    const [isHovered, setIsHovered] = useState(false)

    const slideNext = useCallback(() => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % testimonials.length)
    }, [])

    const slidePrev = useCallback(() => {
        setDirection(-1)
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }, [])

    useEffect(() => {
        if (isHovered) return
        const interval = setInterval(slideNext, 6000)
        return () => clearInterval(interval)
    }, [isHovered, slideNext])

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" as const }
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 100 : -100,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" as const }
        })
    }

    return (
        <section className="py-20 lg:py-28 bg-background border-t border-white/[0.04] overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
                        Loved by professionals
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Hear from real users who have transformed their networking and business introductions.
                    </p>
                </div>

                {/* Carousel Container */}
                <div 
                    className="relative max-w-3xl mx-auto px-4 sm:px-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Main Testimonial Card */}
                    <div className="relative bg-zinc-900/30 border border-white/[0.05] rounded-2xl p-8 md:p-10 min-h-[280px] sm:min-h-[240px] flex flex-col justify-between overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-primary/5 blur-[40px] pointer-events-none" />
                        
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="relative flex flex-col justify-between h-full space-y-6"
                            >
                                <div>
                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                                        &ldquo;{testimonials[current].content}&rdquo;
                                    </p>
                                </div>

                                {/* User Profile */}
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center font-bold text-white text-xs select-none">
                                        {testimonials[current].avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white text-sm">
                                            {testimonials[current].name}
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {testimonials[current].role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Left/Right Controls (Desktop only) */}
                    <button
                        onClick={slidePrev}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-zinc-900 border border-white/[0.05] text-zinc-400 hover:text-white hover:border-white/[0.1] active:scale-95 transition-all"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={slideNext}
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-zinc-900 border border-white/[0.05] text-zinc-400 hover:text-white hover:border-white/[0.1] active:scale-95 transition-all"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > current ? 1 : -1)
                                setCurrent(i)
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                                }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
