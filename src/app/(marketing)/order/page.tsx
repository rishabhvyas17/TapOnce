"use client"

import MaterialSelector from "@/components/order/MaterialSelector"
import OrderSummary from "@/components/order/OrderSummary"
import PersonalizationForm from "@/components/order/PersonalizationForm"
import TemplateCardPreview from "@/components/order/TemplateCardPreview"
import TemplateSelector from "@/components/order/TemplateSelector"
import Navbar from "@/components/layout/Navbar"
import { CardTemplate } from "@/data/cardTemplates"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

export default function OrderPage() {
    const [material, setMaterial] = useState<"metal" | "pvc">("metal")
    const [template, setTemplate] = useState<CardTemplate | null>(null)
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [logoUrl, setLogoUrl] = useState("")

    return (
        <main className="min-h-screen bg-background text-slate-900 selection:bg-primary/15 selection:text-primary">
            <Navbar />

            <div className="container mx-auto px-4 py-20 lg:py-28 max-w-5xl">
                {/* Back Link */}
                <div className="mb-8 flex justify-start">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Home
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12 lg:mb-16 space-y-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                        [CONFIGURATOR_DEPLOY]
                    </span>
                    <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
                        Design your custom card
                    </h1>
                    <p className="text-zinc-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed font-normal">
                        Select a design theme, pick your preferred material, personalize it with your identity, and order in under 2 minutes.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left: Sticky Live Preview */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-center min-h-[220px] md:min-h-[260px]">
                            <TemplateCardPreview
                                template={template}
                                material={material}
                                name={name}
                                title={title}
                                logoUrl={logoUrl}
                            />
                        </div>

                        <p className="text-center text-zinc-400 text-[9px] tracking-wider uppercase font-mono font-bold select-none">
                            [Interactive 3D Preview • Updates in real-time]
                        </p>
                    </div>

                    {/* Right: Customization Form Steps */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Step 1: Template Selection */}
                        <div className="space-y-4 bg-zinc-50/50 border border-zinc-200/60 p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center font-bold text-white text-[10px]">1</div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">Choose Template Theme</span>
                            </div>
                            <TemplateSelector selected={template} onSelect={setTemplate} />
                        </div>

                        {/* Step 2: Material */}
                        <div className="space-y-4 bg-zinc-50/50 border border-zinc-200/60 p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center font-bold text-white text-[10px]">2</div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">Choose Material</span>
                            </div>
                            <MaterialSelector selected={material} onSelect={setMaterial} />
                        </div>

                        {/* Step 3: Personalization */}
                        <div className="space-y-4 bg-zinc-50/50 border border-zinc-200/60 p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center font-bold text-white text-[10px]">3</div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">Personalize Your Card Details</span>
                            </div>
                            <PersonalizationForm
                                name={name}
                                title={title}
                                logoUrl={logoUrl}
                                onNameChange={setName}
                                onTitleChange={setTitle}
                                onLogoChange={setLogoUrl}
                            />
                        </div>

                        {/* Step 4: Checkout */}
                        <div className="space-y-4 bg-zinc-50/50 border border-zinc-200/60 p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center font-bold text-white text-[10px]">4</div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">Order Checkout & Shipping</span>
                            </div>
                            <OrderSummary
                                material={material}
                                name={name}
                                title={title}
                                niche={template?.professionId || "corporate"}
                                templateId={template?.id}
                                templateName={template?.name}
                                logoUrl={logoUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
