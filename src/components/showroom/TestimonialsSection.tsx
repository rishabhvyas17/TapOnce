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
        <section className="py-20 lg:py-28 bg-zinc-50/30 border-b border-zinc-100 overflow-hidden">
            {/* Tech grid texture background */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                        [TESTIMONIALS]
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
                        Loved by professionals
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
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
                    <div className="relative bg-white border border-zinc-200/60 rounded-2xl p-8 md:p-10 min-h-[260px] sm:min-h-[220px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        
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
                                            <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" strokeWidth={0} />
                                        ))}
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-base text-slate-850 leading-relaxed font-normal">
                                        &ldquo;{testimonials[current].content}&rdquo;
                                    </p>
                                </div>

                                {/* User Profile */}
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 shrink-0 rounded-full bg-primary flex items-center justify-center font-bold text-white text-[10px] select-none">
                                        {testimonials[current].avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-xs tracking-tight">
                                            {testimonials[current].name}
                                        </div>
                                        <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider font-mono">
                                            {testimonials[current].role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Left/Right Controls (Desktop only) */}
                    <button
                        type="button"
                        onClick={slidePrev}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 hover:text-slate-900 hover:border-zinc-350 active:scale-95 transition-all shadow-sm"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={slideNext}
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 hover:text-slate-900 hover:border-zinc-350 active:scale-95 transition-all shadow-sm"
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
                            type="button"
                            onClick={() => {
                                setDirection(i > current ? 1 : -1)
                                setCurrent(i)
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-1.5 bg-zinc-300 hover:bg-zinc-450"
                                }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
