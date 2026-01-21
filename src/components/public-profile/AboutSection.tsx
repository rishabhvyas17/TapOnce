"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useState } from "react"

interface AboutSectionProps {
    bio?: string
}

export default function AboutSection({ bio }: AboutSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    if (!bio) return null

    const shouldTruncate = bio.length > 150
    const displayText = shouldTruncate && !isExpanded
        ? bio.slice(0, 150) + '...'
        : bio

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="px-4 mb-6"
        >
            <div className="max-w-md mx-auto">
                <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
                    <motion.p
                        className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line"
                        layout
                    >
                        {displayText}
                    </motion.p>

                    {shouldTruncate && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-white mt-3 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    Show Less
                                    <ChevronUp className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    Read More
                                    <ChevronDown className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </motion.section>
    )
}
