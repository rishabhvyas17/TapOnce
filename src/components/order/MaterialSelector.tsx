"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import React from "react"

interface MaterialSelectorProps {
    selected: "metal" | "pvc"
    onSelect: (material: "metal" | "pvc") => void
}

const materials = [
    {
        id: "metal" as const,
        name: "Matte Black Metal",
        price: "₹1,500",
        description: "Premium laser-engraved stainless steel. Heavy, durable, and highly prestigious.",
        features: ["15g Stainless Steel Core", "Laser-Etched Engraving", "Lifetime Chip Warranty"],
        gradient: "from-zinc-800 to-black",
        popular: true
    },
    {
        id: "pvc" as const,
        name: "Premium PVC",
        price: "₹1,000",
        description: "High-fidelity color printing on recycled PVC. Clean, flexible, and vibrant.",
        features: ["Edge-to-Edge Color Print", "Eco-Friendly Recycled PVC", "Matte Finish Options"],
        gradient: "from-zinc-900 to-zinc-950",
        popular: false
    }
]

export default function MaterialSelector({ selected, onSelect }: MaterialSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Choose Material</h3>

            <div className="grid sm:grid-cols-2 gap-4">
                {materials.map((material) => (
                    <motion.button
                        key={material.id}
                        type="button"
                        onClick={() => onSelect(material.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-5 rounded-xl border text-left transition-all overflow-hidden ${selected === material.id
                                ? "bg-zinc-50 border-primary shadow-sm"
                                : "bg-white border-zinc-200/60 hover:border-zinc-300"
                            }`}
                    >
                        {/* Popular Badge */}
                        {material.popular && (
                            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-slate-900 text-white text-[8px] font-mono font-bold tracking-wider uppercase rounded-bl-lg select-none">
                                PREMIUM
                            </div>
                        )}

                        {/* Selected Indicator */}
                        {selected === material.id && (
                            <div className="absolute bottom-4 right-4 h-5 w-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                            </div>
                        )}

                        {/* Texture Gradient preview */}
                        <div className={`h-12 w-full rounded-lg bg-gradient-to-br ${material.gradient} mb-3.5 relative overflow-hidden border border-white/5 shadow-inner`}>
                            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-overlay" />
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 mb-0.5 tracking-tight">{material.name}</h4>
                        <p className="text-lg font-bold text-primary mb-2 tracking-tight">{material.price}</p>
                        <p className="text-xs text-zinc-500 mb-4 leading-normal font-normal">{material.description}</p>

                        <ul className="space-y-1">
                            {material.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider font-mono">
                                    <div className="h-1 w-1 rounded-full bg-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
