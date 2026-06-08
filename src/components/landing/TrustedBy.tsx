"use client"

import { motion } from "framer-motion"
import React from "react"

const brands = [
    "Google", "Microsoft", "Spotify", "Amazon", "Netflix", "Adobe", "Shopify", "Tesla", "Airbnb", "Uber"
]

export default function TrustedBy() {
    return (
        <section className="py-8 bg-zinc-50/50 overflow-hidden border-b border-zinc-150">
            <div className="max-w-5xl mx-auto px-4 mb-4 text-center">
                <p className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                    Trusted by modern professionals at
                </p>
            </div>

            <div className="flex relative items-center max-w-4xl mx-auto">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Marquee Container */}
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-16 items-center whitespace-nowrap px-8"
                        animate={{ x: "-50%" }}
                        transition={{
                            ease: "linear",
                            duration: 35,
                            repeat: Infinity,
                        }}
                    >
                        {/* Multiple copies for a seamless loop */}
                        {[...brands, ...brands, ...brands].map((brand, i) => (
                            <div 
                                key={i} 
                                className="text-sm font-semibold text-zinc-400 hover:text-zinc-600 transition-colors cursor-default select-none tracking-tight"
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
