/**
 * @file Get Started - Profession Selection with Optional Signup
 * @description First step of customer journey - immersive profession selection
 * 
 * Flow: User picks profession → Optional quick signup → Proceed to Design Studio
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera,
    Briefcase, Rocket, Music, GraduationCap, Users, TrendingUp,
    ArrowRight, Sparkles, ChevronLeft, User, Mail, Lock,
    Eye, EyeOff, Check, Info
} from 'lucide-react'

// Profession data with enhanced visuals
const professions = [
    {
        id: 'legal',
        name: 'Legal Professional',
        tagline: 'Command respect with every tap',
        description: 'Lawyers, Advocates, Legal Consultants',
        icon: Scale,
        gradient: 'from-amber-600 via-yellow-700 to-amber-900',
        accentColor: '#f59e0b',
        popularTemplates: 5
    },
    {
        id: 'healthcare',
        name: 'Healthcare',
        tagline: 'Where trust meets technology',
        description: 'Doctors, Dentists, Specialists',
        icon: Stethoscope,
        gradient: 'from-emerald-500 via-teal-600 to-emerald-800',
        accentColor: '#10b981',
        popularTemplates: 5
    },
    {
        id: 'corporate',
        name: 'Corporate Executive',
        tagline: 'Lead with a lasting impression',
        description: 'CEOs, Directors, Managers',
        icon: Building2,
        gradient: 'from-slate-600 via-zinc-700 to-slate-900',
        accentColor: '#eab308',
        popularTemplates: 5
    },
    {
        id: 'creative',
        name: 'Creative Professional',
        tagline: 'Your art, your identity',
        description: 'Designers, Photographers, Artists',
        icon: Palette,
        gradient: 'from-violet-500 via-purple-600 to-fuchsia-700',
        accentColor: '#a855f7',
        popularTemplates: 5
    },
    {
        id: 'realestate',
        name: 'Real Estate',
        tagline: 'Close deals, open doors',
        description: 'Agents, Brokers, Consultants',
        icon: Home,
        gradient: 'from-blue-500 via-cyan-600 to-blue-800',
        accentColor: '#0ea5e9',
        popularTemplates: 5
    },
    {
        id: 'influencer',
        name: 'Content Creator',
        tagline: 'Connect beyond the screen',
        description: 'YouTubers, Influencers, Podcasters',
        icon: Camera,
        gradient: 'from-pink-500 via-rose-600 to-pink-800',
        accentColor: '#ec4899',
        popularTemplates: 5
    },
    {
        id: 'entrepreneur',
        name: 'Entrepreneur',
        tagline: 'Build your legacy',
        description: 'Founders, Startups, Business Owners',
        icon: Rocket,
        gradient: 'from-orange-500 via-amber-600 to-orange-800',
        accentColor: '#f97316',
        popularTemplates: 3
    },
    {
        id: 'consultant',
        name: 'Consultant',
        tagline: 'Expert connections',
        description: 'Business, IT, Management',
        icon: TrendingUp,
        gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
        accentColor: '#06b6d4',
        popularTemplates: 3
    }
]

// Signup form component
function SignupForm({
    onComplete,
    onSkip,
    selectedProfession
}: {
    onComplete: () => void
    onSkip: () => void
    selectedProfession: typeof professions[0] | null
}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // TODO: Implement actual signup
        await new Promise(r => setTimeout(r, 1000))

        // Store in session for later
        sessionStorage.setItem('onboarding_user', JSON.stringify({ name, email }))
        sessionStorage.setItem('onboarding_profession', selectedProfession?.id || '')

        setLoading(false)
        onComplete()
    }

    const isValid = name.length >= 2 && email.includes('@') && password.length >= 6

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto px-4"
        >
            <div className="text-center mb-6 md:mb-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full mb-4"
                    style={{ backgroundColor: `${selectedProfession?.accentColor}20` }}
                >
                    <Sparkles className="w-7 h-7 md:w-8 md:h-8" style={{ color: selectedProfession?.accentColor }} />
                </motion.div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Almost there!
                </h2>
                <p className="text-zinc-400 text-sm md:text-base">
                    Create your account to save your progress
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-base"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-base"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Create Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            className="w-full pl-12 pr-12 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-base"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-400 p-1"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className="w-full py-4 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                    style={{
                        background: isValid
                            ? `linear-gradient(135deg, ${selectedProfession?.accentColor}, ${selectedProfession?.accentColor}dd)`
                            : '#3f3f46',
                        color: isValid ? '#fff' : '#a1a1aa'
                    }}
                >
                    {loading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                    ) : (
                        <>
                            Continue to Design Studio
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>

                {/* Skip */}
                <button
                    type="button"
                    onClick={onSkip}
                    className="w-full py-3 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                    Skip for now, I'll create account later
                </button>
            </form>

            {/* Info */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <Info className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-500">
                    Creating an account lets you save your design, track orders, and customize your digital profile.
                </p>
            </div>
        </motion.div>
    )
}

export default function GetStartedPage() {
    const router = useRouter()
    const [step, setStep] = useState<'profession' | 'signup'>('profession')
    const [selectedProfession, setSelectedProfession] = useState<typeof professions[0] | null>(null)
    const [hoveredProfession, setHoveredProfession] = useState<string | null>(null)

    const activeProfession = professions.find(p => p.id === (hoveredProfession || selectedProfession?.id))

    const handleProfessionSelect = (profession: typeof professions[0]) => {
        setSelectedProfession(profession)
        setStep('signup')
    }

    const handleSignupComplete = () => {
        router.push(`/design/${selectedProfession?.id}`)
    }

    const handleSkipSignup = () => {
        sessionStorage.setItem('onboarding_profession', selectedProfession?.id || '')
        router.push(`/design/${selectedProfession?.id}`)
    }

    return (
        <main className="min-h-screen min-h-[100dvh] bg-[#050505] text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <AnimatePresence mode="wait">
                    {activeProfession && (
                        <motion.div
                            key={activeProfession.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${activeProfession.gradient} opacity-20`}
                            />
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[600px] rounded-full blur-[120px] md:blur-[150px] opacity-30"
                                style={{ backgroundColor: activeProfession.accentColor }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Header - Sticky */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-800/50">
                <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                        {step === 'signup' && (
                            <button
                                onClick={() => setStep('profession')}
                                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors active:scale-95"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}
                        <Link href="/" className="text-lg md:text-xl font-bold">
                            Tap<span className="text-violet-400">Once</span>
                        </Link>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <div className={`h-1.5 w-6 md:h-2 md:w-8 rounded-full transition-colors ${step === 'profession' ? 'bg-violet-500' : 'bg-zinc-700'}`} />
                        <div className={`h-1.5 w-6 md:h-2 md:w-8 rounded-full transition-colors ${step === 'signup' ? 'bg-violet-500' : 'bg-zinc-700'}`} />
                        <div className="h-1.5 w-6 md:h-2 md:w-8 rounded-full bg-zinc-800" />
                        <div className="h-1.5 w-6 md:h-2 md:w-8 rounded-full bg-zinc-800" />
                    </div>

                    <Link
                        href="/login"
                        className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        <span className="hidden sm:inline">Already have an account?</span>
                        <span className="sm:hidden">Log in</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-6 md:py-12">
                <AnimatePresence mode="wait">
                    {step === 'profession' && (
                        <motion.div
                            key="profession"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Title */}
                            <div className="text-center mb-8 md:mb-12">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 md:mb-4"
                                >
                                    What do you <span className="text-violet-400">do</span>?
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto px-4"
                                >
                                    We'll show you card designs crafted specifically for your profession
                                </motion.p>
                            </div>

                            {/* Profession Grid - Responsive */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
                                {professions.map((profession, index) => (
                                    <motion.button
                                        key={profession.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleProfessionSelect(profession)}
                                        onMouseEnter={() => setHoveredProfession(profession.id)}
                                        onMouseLeave={() => setHoveredProfession(null)}
                                        className={`
                                            relative group p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border text-left
                                            transition-all duration-300 active:scale-[0.97]
                                            ${selectedProfession?.id === profession.id
                                                ? 'border-violet-500 bg-zinc-900/50'
                                                : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50'
                                            }
                                        `}
                                    >
                                        {/* Icon */}
                                        <div
                                            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110 group-active:scale-105"
                                            style={{ backgroundColor: `${profession.accentColor}20` }}
                                        >
                                            <profession.icon
                                                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                                                style={{ color: profession.accentColor }}
                                            />
                                        </div>

                                        {/* Text */}
                                        <h3 className="font-bold text-white text-sm md:text-base mb-0.5 md:mb-1 line-clamp-1">{profession.name}</h3>
                                        <p className="text-[10px] md:text-xs text-zinc-500 line-clamp-2">{profession.description}</p>

                                        {/* Tagline on hover - Desktop only */}
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: hoveredProfession === profession.id ? 1 : 0,
                                                height: hoveredProfession === profession.id ? 'auto' : 0
                                            }}
                                            className="text-sm font-medium overflow-hidden mt-2 hidden md:block"
                                            style={{ color: profession.accentColor }}
                                        >
                                            "{profession.tagline}"
                                        </motion.p>

                                        {/* Arrow */}
                                        <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
                                        </div>

                                        {/* Template count */}
                                        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 text-[10px] md:text-xs text-zinc-600">
                                            {profession.popularTemplates}+ designs
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Other profession */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center mt-6 md:mt-8"
                            >
                                <button
                                    onClick={() => handleProfessionSelect({
                                        ...professions[0],
                                        id: 'other',
                                        name: 'Other',
                                        tagline: 'Your profession, your style',
                                        description: 'Any other profession'
                                    })}
                                    className="text-zinc-500 hover:text-white transition-colors text-sm md:text-base"
                                >
                                    Don't see your profession? <span className="underline">Browse all designs →</span>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                    {step === 'signup' && selectedProfession && (
                        <SignupForm
                            selectedProfession={selectedProfession}
                            onComplete={handleSignupComplete}
                            onSkip={handleSkipSignup}
                        />
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
}
