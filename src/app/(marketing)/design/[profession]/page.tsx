/**
 * @file Design Studio - Next Level Card Customizer
 * @description Profession-filtered design studio with 3D card preview
 * 
 * Features:
 * - Pre-filtered templates by profession
 * - Real-time 3D card preview
 * - Step-by-step customization with guides
 * - Material selection
 * - Personalization (name, title, logo)
 * - Fully responsive design
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
    Check, ChevronLeft, ChevronRight, ArrowRight,
    Sparkles, Eye, Info, ShoppingCart, RotateCcw,
    User, Briefcase, Upload, X, Palette, Box,
    Lightbulb, HelpCircle
} from 'lucide-react'

// Mock templates for the design studio
const mockTemplates = {
    legal: [
        { id: 'legal-1', name: 'Justice Scale', gradient: 'from-amber-900 via-yellow-900 to-black', popular: true },
        { id: 'legal-2', name: 'Modern Counsel', gradient: 'from-blue-950 via-indigo-950 to-black', popular: true },
        { id: 'legal-3', name: 'Gavel Authority', gradient: 'from-zinc-900 via-gray-900 to-black', popular: false },
        { id: 'legal-4', name: 'Courthouse', gradient: 'from-slate-800 via-slate-900 to-black', popular: false },
    ],
    healthcare: [
        { id: 'health-1', name: 'Caduceus Classic', gradient: 'from-emerald-900 via-teal-900 to-black', popular: true },
        { id: 'health-2', name: 'DNA Helix', gradient: 'from-purple-950 via-violet-950 to-black', popular: true },
        { id: 'health-3', name: 'Pulse Line', gradient: 'from-red-950 via-rose-950 to-black', popular: false },
        { id: 'health-4', name: 'Medical Cross', gradient: 'from-cyan-900 via-cyan-950 to-black', popular: false },
    ],
    corporate: [
        { id: 'corp-1', name: 'Executive Black', gradient: 'from-zinc-900 via-neutral-900 to-black', popular: true },
        { id: 'corp-2', name: 'Gold Standard', gradient: 'from-yellow-900 via-amber-900 to-black', popular: true },
        { id: 'corp-3', name: 'Startup Founder', gradient: 'from-violet-900 via-purple-900 to-black', popular: false },
        { id: 'corp-4', name: 'Finance Elite', gradient: 'from-slate-900 via-gray-900 to-black', popular: false },
    ],
    creative: [
        { id: 'creative-1', name: 'Gradient Flow', gradient: 'from-fuchsia-900 via-pink-900 to-purple-900', popular: true },
        { id: 'creative-2', name: 'Photographer Pro', gradient: 'from-gray-900 via-zinc-900 to-black', popular: true },
        { id: 'creative-3', name: 'Neon Dreams', gradient: 'from-cyan-900 via-blue-900 to-purple-900', popular: false },
        { id: 'creative-4', name: 'Minimal Studio', gradient: 'from-neutral-900 via-neutral-950 to-black', popular: false },
    ],
    realestate: [
        { id: 'real-1', name: 'Luxury Homes', gradient: 'from-amber-900 via-yellow-900 to-black', popular: true },
        { id: 'real-2', name: 'Modern Living', gradient: 'from-blue-950 via-cyan-950 to-black', popular: true },
        { id: 'real-3', name: 'Golden Key', gradient: 'from-yellow-900 via-orange-900 to-black', popular: false },
        { id: 'real-4', name: 'Eco Properties', gradient: 'from-green-900 via-emerald-900 to-black', popular: false },
    ],
    influencer: [
        { id: 'inf-1', name: 'Social Star', gradient: 'from-pink-900 via-rose-900 to-purple-900', popular: true },
        { id: 'inf-2', name: 'Creator Studio', gradient: 'from-red-900 via-red-950 to-black', popular: true },
        { id: 'inf-3', name: 'Lifestyle Lux', gradient: 'from-rose-900 via-pink-950 to-black', popular: false },
        { id: 'inf-4', name: 'Gamer Pro', gradient: 'from-green-900 via-emerald-900 to-black', popular: false },
    ],
    entrepreneur: [
        { id: 'ent-1', name: 'Founder Vision', gradient: 'from-orange-900 via-amber-900 to-black', popular: true },
        { id: 'ent-2', name: 'Startup Spark', gradient: 'from-violet-900 via-purple-900 to-black', popular: true },
    ],
    consultant: [
        { id: 'con-1', name: 'Expert Edge', gradient: 'from-cyan-900 via-blue-900 to-black', popular: true },
        { id: 'con-2', name: 'Strategy Pro', gradient: 'from-indigo-900 via-blue-900 to-black', popular: false },
    ],
    other: [
        { id: 'other-1', name: 'Universal Pro', gradient: 'from-violet-900 via-purple-900 to-black', popular: true },
        { id: 'other-2', name: 'Classic Black', gradient: 'from-zinc-900 via-neutral-900 to-black', popular: true },
    ]
}

const materials = [
    { id: 'metal', name: 'Premium Metal', price: 999, description: 'Brushed steel, 0.8mm', popular: true },
    { id: 'pvc', name: 'Premium PVC', price: 599, description: 'Matte finish, lightweight', popular: false },
    { id: 'wood', name: 'Bamboo Wood', price: 799, description: 'Eco-friendly, unique', popular: false },
]

// 3D Card Preview Component - Responsive
function Card3DPreview({
    template,
    material,
    name,
    title
}: {
    template: typeof mockTemplates.legal[0] | null
    material: string
    name: string
    title: string
}) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [isFlipped, setIsFlipped] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientY - rect.top - rect.height / 2) / 20
        const y = -(e.clientX - rect.left - rect.width / 2) / 20
        setRotation({ x, y })
    }

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 })
    }

    return (
        <div className="relative flex flex-col items-center">
            {/* 3D Container - Responsive sizing */}
            <div
                className="relative w-64 h-40 sm:w-72 sm:h-44 md:w-80 md:h-52 cursor-pointer"
                style={{ perspective: '1000px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    animate={{
                        rotateX: isFlipped ? 180 : rotation.x,
                        rotateY: isFlipped ? 180 : rotation.y,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="w-full h-full"
                >
                    {/* Front */}
                    <div
                        className={`absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br ${template?.gradient || 'from-zinc-900 to-black'} shadow-2xl`}
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        {/* Material Effect */}
                        {material === 'metal' && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                        )}
                        {material === 'wood' && (
                            <div className="absolute inset-0 bg-[url('/textures/wood-grain.png')] opacity-20 mix-blend-overlay" />
                        )}

                        {/* Content */}
                        <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
                            {/* Top: Logo area */}
                            <div className="flex justify-between items-start">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                                </div>
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10" />
                            </div>

                            {/* Bottom: Name & Title */}
                            <div>
                                <p className="font-bold text-white text-base md:text-lg">
                                    {name || 'Your Name'}
                                </p>
                                <p className="text-white/60 text-xs md:text-sm">
                                    {title || 'Your Title'}
                                </p>
                            </div>
                        </div>

                        {/* NFC Icon */}
                        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-white/40" />
                        </div>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <div className="h-full p-4 md:p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 md:mb-4">
                                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-violet-400" />
                            </div>
                            <p className="text-white font-medium text-sm md:text-base">Tap to Connect</p>
                            <p className="text-zinc-500 text-xs md:text-sm">NFC Enabled</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Hint */}
            <p className="text-center text-zinc-500 text-xs md:text-sm mt-4 md:mt-6">
                <Eye className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                <span className="hidden sm:inline">Hover to rotate • </span>Tap to flip
            </p>
        </div>
    )
}

// Step indicator - Responsive
function StepIndicator({ currentStep, steps }: { currentStep: number, steps: string[] }) {
    return (
        <div className="flex items-center gap-1 md:gap-2">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`
                            flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold transition-all
                            ${index < currentStep
                                ? 'bg-violet-500 text-white'
                                : index === currentStep
                                    ? 'bg-violet-500/20 text-violet-400 ring-2 ring-violet-500'
                                    : 'bg-zinc-800 text-zinc-500'
                            }
                        `}
                    >
                        {index < currentStep ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-6 md:w-12 h-0.5 mx-0.5 md:mx-1 ${index < currentStep ? 'bg-violet-500' : 'bg-zinc-800'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

// Guide tooltip
function GuideTooltip({ text }: { text: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
                <HelpCircle className="w-4 h-4" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <div
                            className="fixed inset-0 z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute z-50 w-48 md:w-56 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300  left-0 top-full mt-2 md:left-full md:ml-2 md:top-1/2 md:-translate-y-1/2 md:mt-0"
                        >
                            {text}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 md:hidden p-1"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function DesignStudioPage() {
    const router = useRouter()
    const params = useParams()
    const profession = params.profession as string

    // State
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedTemplate, setSelectedTemplate] = useState<typeof mockTemplates.legal[0] | null>(null)
    const [selectedMaterial, setSelectedMaterial] = useState('metal')
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [logoUrl, setLogoUrl] = useState('')

    const steps = ['Design', 'Material', 'Personalize']
    const templates = mockTemplates[profession as keyof typeof mockTemplates] || mockTemplates.other

    // Load saved data
    useEffect(() => {
        const savedUser = sessionStorage.getItem('onboarding_user')
        if (savedUser) {
            const user = JSON.parse(savedUser)
            setName(user.name || '')
        }
    }, [])

    const canProceed = () => {
        switch (currentStep) {
            case 0: return selectedTemplate !== null
            case 1: return selectedMaterial !== null
            case 2: return name.length >= 2
            default: return false
        }
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            // Save to session and go to checkout
            sessionStorage.setItem('order_data', JSON.stringify({
                profession,
                templateId: selectedTemplate?.id,
                templateName: selectedTemplate?.name,
                material: selectedMaterial,
                name,
                title,
                logoUrl
            }))
            router.push('/checkout')
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        } else {
            router.push('/get-started')
        }
    }

    return (
        <main className="min-h-screen min-h-[100dvh] bg-[#050505] text-white">
            {/* Header - Sticky */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <Link href="/" className="text-lg md:text-xl font-bold hidden sm:block">
                            Tap<span className="text-violet-400">Once</span>
                        </Link>
                    </div>

                    <StepIndicator currentStep={currentStep} steps={steps} />

                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all font-medium text-sm md:text-base active:scale-95"
                    >
                        {currentStep === steps.length - 1 ? (
                            <>
                                <ShoppingCart className="w-4 h-4" />
                                <span className="hidden sm:inline">Checkout</span>
                            </>
                        ) : (
                            <>
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 md:py-8">
                {/* Mobile: Preview on top, Form below */}
                {/* Desktop: Side by side */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
                    {/* Preview - Mobile: First, Desktop: Sticky sidebar */}
                    <div className="w-full lg:sticky lg:top-24 order-1 lg:order-1">
                        <Card3DPreview
                            template={selectedTemplate}
                            material={selectedMaterial}
                            name={name}
                            title={title}
                        />
                    </div>

                    {/* Customization Steps */}
                    <div className="w-full order-2 lg:order-2">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Template Selection */}
                            {currentStep === 0 && (
                                <motion.div
                                    key="templates"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <h2 className="text-xl md:text-2xl font-bold">Choose Your Design</h2>
                                        <GuideTooltip text="Pick a design that resonates with your profession. Each template is crafted specifically for your field." />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {templates.map((template) => (
                                            <motion.button
                                                key={template.id}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setSelectedTemplate(template)}
                                                className={`
                                                    relative rounded-lg md:rounded-xl overflow-hidden border transition-all
                                                    ${selectedTemplate?.id === template.id
                                                        ? 'ring-2 ring-violet-500 border-violet-500'
                                                        : 'border-zinc-800 hover:border-zinc-700'
                                                    }
                                                `}
                                            >
                                                {/* Preview */}
                                                <div className={`aspect-[1.6/1] bg-gradient-to-br ${template.gradient} p-3 md:p-4 relative`}>
                                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                                    {/* Popular badge */}
                                                    {template.popular && (
                                                        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 px-1.5 md:px-2 py-0.5 bg-amber-500 text-black text-[8px] md:text-[10px] font-bold rounded uppercase">
                                                            Popular
                                                        </div>
                                                    )}

                                                    {/* Selected check */}
                                                    {selectedTemplate?.id === template.id && (
                                                        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6 bg-violet-500 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 md:w-4 md:h-4" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Name */}
                                                <div className="p-2 md:p-3 bg-zinc-900">
                                                    <p className="font-medium text-xs md:text-sm truncate">{template.name}</p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* View all */}
                                    <button className="text-violet-400 hover:text-violet-300 text-sm">
                                        View all designs →
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 2: Material Selection */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="materials"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <h2 className="text-xl md:text-2xl font-bold">Select Material</h2>
                                        <GuideTooltip text="The material affects both look and feel. Metal is most premium, PVC is lightweight, Wood is eco-friendly." />
                                    </div>

                                    <div className="space-y-3 md:space-y-4">
                                        {materials.map((material) => (
                                            <motion.button
                                                key={material.id}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedMaterial(material.id)}
                                                className={`
                                                    w-full p-3 md:p-4 rounded-xl border text-left flex items-center gap-3 md:gap-4 transition-all
                                                    ${selectedMaterial === material.id
                                                        ? 'border-violet-500 bg-violet-500/10'
                                                        : 'border-zinc-800 hover:border-zinc-700'
                                                    }
                                                `}
                                            >
                                                {/* Material preview */}
                                                <div className={`
                                                    w-12 h-8 md:w-16 md:h-10 rounded-lg shrink-0
                                                    ${material.id === 'metal' ? 'bg-gradient-to-br from-zinc-400 to-zinc-600' : ''}
                                                    ${material.id === 'pvc' ? 'bg-gradient-to-br from-zinc-700 to-zinc-900' : ''}
                                                    ${material.id === 'wood' ? 'bg-gradient-to-br from-amber-700 to-amber-900' : ''}
                                                `} />

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="font-bold text-sm md:text-base">{material.name}</p>
                                                        {material.popular && (
                                                            <span className="px-1.5 md:px-2 py-0.5 bg-violet-500/20 text-violet-400 text-[10px] md:text-xs rounded-full">
                                                                Recommended
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs md:text-sm text-zinc-500 truncate">{material.description}</p>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right shrink-0">
                                                    <p className="font-bold text-base md:text-lg">₹{material.price}</p>
                                                </div>

                                                {/* Check */}
                                                {selectedMaterial === material.id && (
                                                    <div className="w-5 h-5 md:w-6 md:h-6 bg-violet-500 rounded-full flex items-center justify-center shrink-0">
                                                        <Check className="w-3 h-3 md:w-4 md:h-4" />
                                                    </div>
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Personalization */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="personalize"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <h2 className="text-xl md:text-2xl font-bold">Personalize Your Card</h2>
                                        <GuideTooltip text="This text will be printed on your card. Make sure to enter it exactly as you want it to appear." />
                                    </div>

                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <User className="w-4 h-4" />
                                                Your Name
                                                <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Dr. John Smith"
                                                className="w-full px-4 py-3 md:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors text-base"
                                                required
                                            />
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Briefcase className="w-4 h-4" />
                                                Title / Designation
                                            </label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                placeholder="Senior Advocate"
                                                className="w-full px-4 py-3 md:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors text-base"
                                            />
                                        </div>

                                        {/* Logo Upload (placeholder) */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Upload className="w-4 h-4" />
                                                Logo (Optional)
                                            </label>
                                            <div className="border-2 border-dashed border-zinc-800 rounded-xl p-4 md:p-6 text-center hover:border-zinc-700 transition-colors cursor-pointer active:bg-zinc-900/50">
                                                <Upload className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 mx-auto mb-2" />
                                                <p className="text-sm text-zinc-500">
                                                    Tap to upload
                                                </p>
                                                <p className="text-xs text-zinc-600 mt-1">
                                                    PNG, JPG up to 2MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview hint */}
                                    <div className="flex items-center gap-3 p-3 md:p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                                        <p className="text-xs md:text-sm text-zinc-400">
                                            💡 Check the live preview above as you type!
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile: Bottom navigation */}
                        <div className="mt-6 flex gap-3 lg:hidden">
                            <button
                                onClick={handleBack}
                                className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-medium transition-colors active:scale-[0.98]"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:bg-zinc-700 disabled:text-zinc-500 font-medium transition-colors active:scale-[0.98]"
                            >
                                {currentStep === steps.length - 1 ? 'Checkout' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
