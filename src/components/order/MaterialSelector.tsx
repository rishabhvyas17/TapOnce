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
            <h3 className="text-base font-bold text-white tracking-tight">Choose Material</h3>

            <div className="grid sm:grid-cols-2 gap-4">
                {materials.map((material) => (
                    <motion.button
                        key={material.id}
                        type="button"
                        onClick={() => onSelect(material.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-5 rounded-xl border text-left transition-all overflow-hidden ${selected === material.id
                                ? "bg-white/[0.04] border-primary"
                                : "bg-zinc-900/30 border-white/[0.06] hover:border-white/[0.1] hover:bg-zinc-900/50"
                            }`}
                    >
                        {/* Popular Badge */}
                        {material.popular && (
                            <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-primary text-black text-[9px] font-bold tracking-wider uppercase rounded-bl-lg select-none">
                                Premium
                            </div>
                        )}

                        {/* Selected Indicator */}
                        {selected === material.id && (
                            <div className="absolute bottom-4 right-4 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-black" strokeWidth={3} />
                            </div>
                        )}

                        {/* Texture Gradient preview */}
                        <div className={`h-12 w-full rounded-lg bg-gradient-to-br ${material.gradient} mb-3.5 relative overflow-hidden border border-white/[0.05]`}>
                            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                        </div>

                        <h4 className="text-base font-bold text-white mb-0.5 tracking-tight">{material.name}</h4>
                        <p className="text-xl font-bold text-primary mb-2 tracking-tight">{material.price}</p>
                        <p className="text-xs text-zinc-400 mb-4 leading-normal font-normal">{material.description}</p>

                        <ul className="space-y-1">
                            {material.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-[10px] text-zinc-500 font-normal">
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
