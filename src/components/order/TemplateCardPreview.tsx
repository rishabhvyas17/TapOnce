"use client"

import { motion } from "framer-motion"
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera, Briefcase,
    Activity, Dna, Smile, Crown, Rocket, TrendingUp, Pencil,
    Zap, Film, Key, TreePine, Heart, Play, Sparkles, Mic, Gamepad2,
    ScrollText, Building
} from "lucide-react"
import React from "react"
import { CardTemplate } from "@/data/cardTemplates"

interface TemplateCardPreviewProps {
    template: CardTemplate | null
    material: "metal" | "pvc"
    name: string
    title: string
    logoUrl?: string
}

const materialOverlays = {
    metal: "bg-[url('/noise.svg')] opacity-35",
    pvc: "bg-[url('/noise.svg')] opacity-[0.12]"
}

const fontFamilies: Record<string, string> = {
    "font-serif": "'Georgia', serif",
    "font-sans": "'Inter', sans-serif",
    "font-mono": "'Fira Code', monospace"
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Scale, Stethoscope, Building2, Palette, Home, Camera, Briefcase,
    Activity, Dna, Smile, Crown, Rocket, TrendingUp, Pencil,
    Zap, Film, Key, TreePine, Heart, Play, Sparkles, Mic, Gamepad2,
    ScrollText, Building, Cross: Briefcase, Gavel: Scale
}

// Accent style mapping to avoid dynamic Tailwind class compilation issues
const accentStyles: Record<string, { bg: string; border: string; text: string }> = {
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
    slate: { bg: "bg-slate-500/10", border: "border-slate-500/20", text: "text-slate-400" },
    stone: { bg: "bg-stone-500/10", border: "border-stone-500/20", text: "text-stone-400" },
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    red: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
    violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400" },
    sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400" },
    zinc: { bg: "bg-zinc-500/10", border: "border-zinc-500/20", text: "text-zinc-400" },
    yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
    fuchsia: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", text: "text-fuchsia-400" },
    neutral: { bg: "bg-neutral-500/10", border: "border-neutral-500/20", text: "text-neutral-400" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400" },
    rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" }
}

export default function TemplateCardPreview({
    template,
    material,
    name,
    title,
    logoUrl
}: TemplateCardPreviewProps) {
    if (!template) {
        return (
            <div className="relative perspective-1000">
                <div className="relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50">
                    <p className="text-zinc-400 text-xs text-center leading-relaxed font-normal">
                        Select a template<br />to preview your custom design
                    </p>
                </div>
            </div>
        )
    }

    const IconComponent = iconMap[template.icon] || Briefcase
    const accent = accentStyles[template.accentColor] || { bg: "bg-white/10", border: "border-white/20", text: "text-white" }

    return (
        <div className="relative perspective-1000">
            {/* Glow Behind */}
            <div className={`absolute -inset-8 bg-gradient-to-br ${template.gradient} blur-[60px] opacity-25 rounded-full`} />

            {/* Card */}
            <motion.div
                initial={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-2xl border border-zinc-200/80 shadow-2xl overflow-hidden preserve-3d cursor-pointer bg-zinc-950"
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`} />

                {/* Material Texture */}
                <div className={`absolute inset-0 ${materialOverlays[material]} mix-blend-overlay`} />

                {/* Content based on layout */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                        {/* Logo/Avatar */}
                        {template.iconPosition === "top-left" ? (
                            <div className={`h-11 w-11 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                                <IconComponent className={`h-5 w-5 ${accent.text}`} />
                            </div>
                        ) : (
                            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                                {logoUrl ? (
                                    <img src={logoUrl} alt="Logo preview" className="w-full h-full object-contain p-1.5" />
                                ) : (
                                    <div className="text-white/30 text-[8px] tracking-wider text-center font-bold">LOGO</div>
                                )}
                            </div>
                        )}

                        {/* Icon on right */}
                        {template.iconPosition === "top-right" && (
                            <div className={`h-10 w-10 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                                <IconComponent className={`h-4.5 w-4.5 ${accent.text}`} />
                            </div>
                        )}

                        {template.iconPosition !== "top-right" && template.iconPosition !== "top-left" && (
                            <div className="text-white/20">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Bottom Row */}
                    <div>
                        <h3
                            className={`text-lg md:text-xl font-bold text-white tracking-wide uppercase ${template.fontFamily}`}
                            style={{ fontFamily: fontFamilies[template.fontFamily] }}
                        >
                            {name || "YOUR NAME"}
                        </h3>
                        <p
                            className={`text-xs text-white/60 tracking-widest uppercase mt-0.5 ${template.fontFamily}`}
                            style={{ fontFamily: fontFamilies[template.fontFamily] }}
                        >
                            {title || "Your Title"}
                        </p>
                    </div>

                    {/* Watermark Icon */}
                    {template.iconPosition === "watermark" && (
                        <div className="absolute right-4 bottom-4 opacity-[0.05] pointer-events-none">
                            <IconComponent className="h-20 w-20 text-white" />
                        </div>
                    )}

                    {/* Bottom Right Icon */}
                    {template.iconPosition === "bottom-right" && (
                        <div className={`absolute right-4 bottom-4 h-10 w-10 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                            <IconComponent className={`h-4.5 w-4.5 ${accent.text}`} />
                        </div>
                    )}
                </div>

                {/* Template Label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[8px] text-white/50 tracking-widest uppercase font-semibold">
                    {template.name}
                </div>

                {/* Shine Effect */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 0.2, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                />
            </motion.div>

            {/* Reflection */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-b from-slate-900/[0.04] to-transparent blur-lg rounded-full pointer-events-none" />
        </div>
    )
}
