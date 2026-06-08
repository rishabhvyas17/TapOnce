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
        <main className="min-h-screen bg-background text-white selection:bg-white selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 py-16 lg:py-24 max-w-6xl">
                {/* Back Link */}
                <div className="mb-8 flex justify-start">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Home
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
                        NFC Card Configurator
                    </span>
                    <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white">
                        Design your custom card
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Select a design theme, pick your preferred material, personalize it with your identity, and order in under 2 minutes.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left: Sticky Live Preview */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-center min-h-[260px] md:min-h-[300px]">
                            <TemplateCardPreview
                                template={template}
                                material={material}
                                name={name}
                                title={title}
                                logoUrl={logoUrl}
                            />
                        </div>

                        <p className="text-center text-zinc-500 text-[10px] tracking-wider uppercase font-semibold select-none">
                            Interactive 3D Preview • Updates in real-time
                        </p>
                    </div>

                    {/* Right: Customization Form Steps */}
                    <div className="lg:col-span-7 space-y-10">
                        {/* Step 1: Template Selection */}
                        <div className="space-y-5 bg-zinc-900/10 border border-white/[0.04] p-5 rounded-2xl">
                            <div className="flex items-center gap-2.5">
                                <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">1</div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-350">Choose Template Theme</span>
                            </div>
                            <TemplateSelector selected={template} onSelect={setTemplate} />
                        </div>

                        {/* Step 2: Material */}
                        <div className="space-y-5 bg-zinc-900/10 border border-white/[0.04] p-5 rounded-2xl">
                            <div className="flex items-center gap-2.5">
                                <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">2</div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-350">Choose Material</span>
                            </div>
                            <MaterialSelector selected={material} onSelect={setMaterial} />
                        </div>

                        {/* Step 3: Personalization */}
                        <div className="space-y-5 bg-zinc-900/10 border border-white/[0.04] p-5 rounded-2xl">
                            <div className="flex items-center gap-2.5">
                                <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">3</div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-350">Personalize Your Card Details</span>
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
                        <div className="space-y-5 bg-zinc-900/10 border border-white/[0.04] p-5 rounded-2xl">
                            <div className="flex items-center gap-2.5">
                                <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">4</div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-350">Order Checkout & Shipping</span>
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
