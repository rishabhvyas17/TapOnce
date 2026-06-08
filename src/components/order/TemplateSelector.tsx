"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera,
    Check, ChevronDown
} from "lucide-react"
import React, { useState } from "react"
import { CardTemplate, professions, getTemplatesByProfession } from "@/data/cardTemplates"

interface TemplateSelectorProps {
    selected: CardTemplate | null
    onSelect: (template: CardTemplate) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Scale, Stethoscope, Building2, Palette, Home, Camera
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
    const [activeProfession, setActiveProfession] = useState<string>("legal")
    const [isExpanded, setIsExpanded] = useState(true)

    const templates = getTemplatesByProfession(activeProfession)

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Choose Template</h3>
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-zinc-400 hover:text-slate-900 transition-colors"
                >
                    <ChevronDown className={`h-4.5 w-4.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-5 overflow-hidden"
                    >
                        {/* Profession Tabs */}
                        <div className="flex flex-wrap gap-1.5">
                            {professions.map((prof) => {
                                const Icon = iconMap[prof.icon] || Building2
                                return (
                                    <button
                                        key={prof.id}
                                        type="button"
                                        onClick={() => setActiveProfession(prof.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeProfession === prof.id
                                                ? "bg-slate-900 text-white"
                                                : "bg-zinc-100 text-zinc-550 border border-zinc-200/50 hover:bg-zinc-200/50"
                                            }`}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        {prof.name}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Template Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {templates.map((template) => (
                                <motion.button
                                    key={template.id}
                                    type="button"
                                    onClick={() => onSelect(template)}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative rounded-xl border overflow-hidden text-left transition-all ${selected?.id === template.id
                                            ? "ring-2 ring-primary border-primary"
                                            : "border-zinc-200/60 hover:border-zinc-300 bg-white"
                                        }`}
                                >
                                    {/* Card Preview */}
                                    <div className={`aspect-[1.6/1] bg-gradient-to-br ${template.gradient} p-4 relative`}>
                                        {/* Noise Texture */}
                                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.12] mix-blend-overlay" />

                                        {/* Icon */}
                                        <div className="absolute top-2.5 right-2.5 h-6.5 w-6.5 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                                            <div className="h-3 w-3 rounded-full bg-white/40" />
                                        </div>

                                        {/* Text Preview */}
                                        <div className="absolute bottom-3 left-3">
                                            <div className={`h-1.5 w-12 bg-white/40 rounded mb-0.5 ${template.fontFamily}`} />
                                            <div className="h-1 w-9 bg-white/20 rounded" />
                                        </div>

                                        {/* Selected Check */}
                                        {selected?.id === template.id && (
                                            <div className="absolute top-2.5 left-2.5 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                                            </div>
                                        )}

                                        {/* Popular Badge */}
                                        {template.popular && (
                                            <div className="absolute top-2.5 left-2.5 px-1.5 py-0.5 bg-slate-900 text-white text-[8px] font-bold rounded uppercase tracking-wider">
                                                Popular
                                            </div>
                                        )}
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-2.5 bg-zinc-50/50 border-t border-zinc-150">
                                        <h4 className="font-bold text-slate-900 text-[11px] leading-none mb-1">{template.name}</h4>
                                        <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider truncate font-mono">{template.fontStyle}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Template Summary */}
            {selected && (
                <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200/60 rounded-xl shadow-sm">
                    <div className={`h-10 w-16 shrink-0 rounded-lg bg-gradient-to-br ${selected.gradient} relative overflow-hidden border border-zinc-150`}>
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.12] mix-blend-overlay" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-xs">{selected.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider mt-0.5">{selected.profession} • {selected.fontStyle} theme</p>
                    </div>
                </div>
            )}
        </div>
    )
}
