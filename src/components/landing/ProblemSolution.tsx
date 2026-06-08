"use client"

import { motion } from "framer-motion"
import { X, Check, TreePine, RefreshCw, BarChart3, Sparkles } from "lucide-react"
import React from "react"

const comparisons = [
    {
        problem: "Paper cards get lost or thrown away within days",
        solution: "Your contact is saved directly to their phone — forever",
        iconProblem: X,
        iconSolution: Check,
    },
    {
        problem: "Changed your number? Reprint the entire batch",
        solution: "Update your details instantly, anytime — for free",
        iconProblem: X,
        iconSolution: RefreshCw,
    },
    {
        problem: "No way to know if anyone actually used your card",
        solution: "Track every tap — see who viewed your profile and when",
        iconProblem: X,
        iconSolution: BarChart3,
    },
    {
        problem: "Hundreds of trees cut for paper no one keeps",
        solution: "One card replaces thousands — zero environmental waste",
        iconProblem: X,
        iconSolution: TreePine,
    },
    {
        problem: "A generic card that looks like everyone else's",
        solution: "A premium metal or PVC card with your personal digital portfolio",
        iconProblem: X,
        iconSolution: Sparkles,
    },
]

export default function ProblemSolution() {
    return (
        <section className="section-padding bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        Why Switch?
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900 mb-4"
                    >
                        Still handing out paper cards?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 text-base leading-relaxed"
                    >
                        89% of paper business cards are thrown away within a week. 
                        Here&apos;s why professionals are switching to NFC.
                    </motion.p>
                </div>

                {/* Comparison Grid */}
                <div className="space-y-3 max-w-4xl mx-auto">
                    {comparisons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ delay: i * 0.08 }}
                            className="grid md:grid-cols-2 gap-3 md:gap-0"
                        >
                            {/* Problem */}
                            <div className="flex items-center gap-3 px-5 py-4 bg-red-50/60 border border-red-100/80 rounded-xl md:rounded-r-none md:border-r-0">
                                <div className="h-8 w-8 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                                    <item.iconProblem className="h-3.5 w-3.5 text-red-500" strokeWidth={3} />
                                </div>
                                <p className="text-sm text-neutral-700">{item.problem}</p>
                            </div>

                            {/* Solution */}
                            <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50/60 border border-emerald-100/80 rounded-xl md:rounded-l-none md:border-l-0">
                                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <item.iconSolution className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                                </div>
                                <p className="text-sm text-neutral-700 font-medium">{item.solution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
