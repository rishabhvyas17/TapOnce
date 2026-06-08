"use client"

import { motion } from "framer-motion"
import React from "react"

const brands = [
    "Google", "Microsoft", "Spotify", "Amazon", "Netflix", "Adobe", "Shopify", "Tesla", "Airbnb", "Uber"
]

export default function TrustedBy() {
    return (
        <section className="py-10 bg-background overflow-hidden border-y border-white/[0.04]">
            <div className="max-w-6xl mx-auto px-4 mb-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Trusted by modern professionals at
                </p>
            </div>

            <div className="flex relative items-center max-w-5xl mx-auto">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Marquee Container */}
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-16 items-center whitespace-nowrap px-8"
                        animate={{ x: "-50%" }}
                        transition={{
                            ease: "linear",
                            duration: 25,
                            repeat: Infinity,
                        }}
                    >
                        {/* Multiple copies for a seamless loop */}
                        {[...brands, ...brands, ...brands].map((brand, i) => (
                            <div 
                                key={i} 
                                className="text-lg md:text-xl font-semibold text-zinc-600 hover:text-zinc-400 transition-colors cursor-default select-none tracking-tight"
                            >
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
