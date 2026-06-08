"use client"

import { motion, useInView } from "framer-motion"
import React, { useRef, useState, useEffect } from "react"
import { Shield, Truck, Star, Users } from "lucide-react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        let start = 0
        const duration = 2000
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [isInView, target])

    return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>
}

const metrics = [
    { icon: Users, value: 10000, suffix: "+", label: "Cards Shipped" },
    { icon: Star, value: 4.9, suffix: "★", label: "Average Rating", isDecimal: true },
    { icon: Truck, value: 0, suffix: "", label: "Shipping Cost", displayText: "FREE" },
    { icon: Shield, value: 0, suffix: "", label: "Chip Warranty", displayText: "LIFETIME" },
]

export default function SocialProofBar() {
    return (
        <section className="py-6 md:py-8 bg-neutral-50 border-y border-neutral-100">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 justify-center"
                        >
                            <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-sm">
                                <metric.icon className="h-4.5 w-4.5 text-gold-500" />
                            </div>
                            <div>
                                <div className="text-lg font-display font-bold text-neutral-900 tracking-tight leading-tight">
                                    {metric.displayText ? (
                                        metric.displayText
                                    ) : metric.isDecimal ? (
                                        <>{metric.value}{metric.suffix}</>
                                    ) : (
                                        <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                                    )}
                                </div>
                                <div className="text-xs text-neutral-500 font-medium">
                                    {metric.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
