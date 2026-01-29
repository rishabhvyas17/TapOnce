/**
 * @file Profile Setup Wizard
 * @description Multi-step guided profile setup for new customers
 * 
 * Features:
 * - Step-by-step wizard (not overwhelming)
 * - Photo upload
 * - Basic info (tagline, bio)
 * - Social links (profession-relevant)
 * - Theme selection
 * - Live preview
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ChevronLeft, ChevronRight, Check, Camera, Upload,
    User, FileText, Palette, Share2, Globe, Linkedin,
    Instagram, Twitter, Mail, Phone, MapPin, Sparkles,
    ArrowRight, X, Eye
} from 'lucide-react'

const themePresets = [
    { id: 'midnight', name: 'Midnight', gradient: 'from-violet-900 via-purple-950 to-black', accent: '#8b5cf6' },
    { id: 'ocean', name: 'Ocean', gradient: 'from-blue-900 via-cyan-950 to-black', accent: '#0ea5e9' },
    { id: 'sunset', name: 'Sunset', gradient: 'from-orange-900 via-red-950 to-black', accent: '#f97316' },
    { id: 'forest', name: 'Forest', gradient: 'from-emerald-900 via-green-950 to-black', accent: '#10b981' },
    { id: 'minimal', name: 'Minimal', gradient: 'from-zinc-200 via-zinc-100 to-white', accent: '#27272a', light: true },
    { id: 'neon', name: 'Neon', gradient: 'from-pink-900 via-fuchsia-950 to-black', accent: '#ec4899' },
    { id: 'professional', name: 'Professional', gradient: 'from-slate-900 via-zinc-900 to-black', accent: '#eab308' },
]

const steps = [
    { id: 'photo', title: 'Photo', icon: Camera },
    { id: 'info', title: 'Info', icon: User },
    { id: 'social', title: 'Links', icon: Share2 },
    { id: 'theme', title: 'Theme', icon: Palette },
]

// Live preview component
function ProfilePreview({
    photo,
    name,
    tagline,
    bio,
    theme,
    socials
}: {
    photo: string | null
    name: string
    tagline: string
    bio: string
    theme: typeof themePresets[0]
    socials: { website?: string, linkedin?: string, instagram?: string, twitter?: string, email?: string, phone?: string }
}) {
    const hasSocials = Object.values(socials).some(v => v)

    return (
        <div
            className={`w-full max-w-xs sm:max-w-sm mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br ${theme.gradient} shadow-2xl`}
        >
            <div className="p-4 sm:p-6 text-center">
                {/* Avatar */}
                <div
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 bg-white/10 flex items-center justify-center overflow-hidden"
                    style={{ boxShadow: `0 0 30px ${theme.accent}40` }}
                >
                    {photo ? (
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <User className={`w-10 h-10 ${theme.light ? 'text-zinc-400' : 'text-white/40'}`} />
                    )}
                </div>

                {/* Name */}
                <h3 className={`text-lg sm:text-xl font-bold ${theme.light ? 'text-zinc-900' : 'text-white'}`}>
                    {name || 'Your Name'}
                </h3>

                {/* Tagline */}
                <p className={`text-sm ${theme.light ? 'text-zinc-600' : 'text-white/60'} mt-1`}>
                    {tagline || 'Your tagline here'}
                </p>

                {/* Bio */}
                {bio && (
                    <p className={`text-xs ${theme.light ? 'text-zinc-500' : 'text-white/40'} mt-4 px-4`}>
                        {bio.slice(0, 100)}{bio.length > 100 ? '...' : ''}
                    </p>
                )}

                {/* Social icons */}
                {hasSocials && (
                    <div className="flex justify-center gap-3 mt-6">
                        {socials.website && (
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Globe className="w-5 h-5" style={{ color: theme.accent }} />
                            </div>
                        )}
                        {socials.linkedin && (
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Linkedin className="w-5 h-5" style={{ color: theme.accent }} />
                            </div>
                        )}
                        {socials.instagram && (
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Instagram className="w-5 h-5" style={{ color: theme.accent }} />
                            </div>
                        )}
                        {socials.email && (
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Mail className="w-5 h-5" style={{ color: theme.accent }} />
                            </div>
                        )}
                    </div>
                )}

                {/* CTA Button */}
                <button
                    className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-white text-sm sm:text-base transition-transform active:scale-[0.98]"
                    style={{ backgroundColor: theme.accent }}
                >
                    Save Contact
                </button>
            </div>
        </div>
    )
}

export default function SetupProfilePage() {
    const router = useRouter()

    // Step state
    const [currentStep, setCurrentStep] = useState(0)

    // Form state
    const [photo, setPhoto] = useState<string | null>(null)
    const [name, setName] = useState('')
    const [tagline, setTagline] = useState('')
    const [bio, setBio] = useState('')
    const [selectedTheme, setSelectedTheme] = useState(themePresets[0])
    const [socials, setSocials] = useState({
        website: '',
        linkedin: '',
        instagram: '',
        twitter: '',
        email: '',
        phone: ''
    })

    const [loading, setLoading] = useState(false)

    // Load saved data
    useEffect(() => {
        const savedUser = sessionStorage.getItem('onboarding_user')
        if (savedUser) {
            const user = JSON.parse(savedUser)
            setName(user.name || '')
            setSocials(prev => ({ ...prev, email: user.email || '' }))
        }
    }, [])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPhoto(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const canProceed = () => {
        switch (currentStep) {
            case 0: return true // Photo optional
            case 1: return name.length >= 2
            case 2: return true // Social links optional
            case 3: return true
            default: return false
        }
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            handleComplete()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleComplete = async () => {
        setLoading(true)

        // TODO: Save profile to API
        await new Promise(r => setTimeout(r, 1500))

        // For now, redirect to success
        router.push('/dashboard')
    }

    const handleSkip = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            handleComplete()
        }
    }

    return (
        <main className="min-h-screen min-h-[100dvh] bg-[#050505] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2">
                    <Link href="/" className="text-lg md:text-xl font-bold shrink-0">
                        Tap<span className="text-violet-400">Once</span>
                    </Link>

                    {/* Progress */}
                    <div className="flex items-center gap-1">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <button
                                    onClick={() => index <= currentStep && setCurrentStep(index)}
                                    disabled={index > currentStep}
                                    className={`
                                        flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm transition-all
                                        ${index === currentStep
                                            ? 'bg-violet-500 text-white'
                                            : index < currentStep
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-zinc-800 text-zinc-500'
                                        }
                                    `}
                                >
                                    {index < currentStep ? (
                                        <Check className="w-3 h-3 md:w-4 md:h-4" />
                                    ) : (
                                        <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                                    )}
                                    <span className="hidden sm:inline">{step.title}</span>
                                </button>
                                {index < steps.length - 1 && (
                                    <div className={`w-4 h-0.5 mx-1 ${index < currentStep ? 'bg-green-500' : 'bg-zinc-800'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSkip}
                        className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                        Skip for now
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
                    {/* Left: Form - shows after preview on mobile */}
                    <div className="order-2 lg:order-1 w-full">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Photo */}
                            {currentStep === 0 && (
                                <motion.div
                                    key="photo"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">Add Your Photo</h2>
                                        <p className="text-zinc-400 text-sm md:text-base">
                                            A professional photo helps people recognize you
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="relative">
                                            <div className="w-40 h-40 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden">
                                                {photo ? (
                                                    <>
                                                        <img src={photo} alt="" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setPhoto(null)}
                                                            className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <Camera className="w-12 h-12 text-zinc-600" />
                                                )}
                                            </div>
                                            {!photo && (
                                                <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-xl cursor-pointer transition-colors">
                                                    <Upload className="w-4 h-4 inline mr-2" />
                                                    Upload
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        <p className="text-sm text-zinc-500 mt-6">
                                            JPG, PNG up to 5MB
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Basic Info */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="info"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">Tell Us About You</h2>
                                        <p className="text-zinc-400 text-sm md:text-base">
                                            This information appears on your digital profile
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Dr. John Smith"
                                                className="w-full px-4 py-3 md:py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors text-base"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                Tagline
                                            </label>
                                            <input
                                                type="text"
                                                value={tagline}
                                                onChange={e => setTagline(e.target.value)}
                                                placeholder="Senior Advocate | Supreme Court"
                                                maxLength={60}
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            />
                                            <p className="text-xs text-zinc-600 mt-1">{tagline.length}/60 characters</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                Short Bio
                                            </label>
                                            <textarea
                                                value={bio}
                                                onChange={e => setBio(e.target.value)}
                                                placeholder="Tell people what you do..."
                                                maxLength={200}
                                                rows={3}
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                                            />
                                            <p className="text-xs text-zinc-600 mt-1">{bio.length}/200 characters</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Social Links */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="social"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">Add Your Links</h2>
                                        <p className="text-zinc-400 text-sm md:text-base">
                                            Help people connect with you
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Globe className="w-4 h-4" /> Website
                                            </label>
                                            <input
                                                type="url"
                                                value={socials.website}
                                                onChange={e => setSocials(prev => ({ ...prev, website: e.target.value }))}
                                                placeholder="https://yourwebsite.com"
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Linkedin className="w-4 h-4" /> LinkedIn
                                            </label>
                                            <input
                                                type="url"
                                                value={socials.linkedin}
                                                onChange={e => setSocials(prev => ({ ...prev, linkedin: e.target.value }))}
                                                placeholder="https://linkedin.com/in/username"
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Instagram className="w-4 h-4" /> Instagram
                                            </label>
                                            <input
                                                type="text"
                                                value={socials.instagram}
                                                onChange={e => setSocials(prev => ({ ...prev, instagram: e.target.value }))}
                                                placeholder="@username"
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Mail className="w-4 h-4" /> Email
                                            </label>
                                            <input
                                                type="email"
                                                value={socials.email}
                                                onChange={e => setSocials(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="you@example.com"
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                                                <Phone className="w-4 h-4" /> Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={socials.phone}
                                                onChange={e => setSocials(prev => ({ ...prev, phone: e.target.value }))}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Theme */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="theme"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">Choose Your Theme</h2>
                                        <p className="text-zinc-400 text-sm md:text-base">
                                            Select a color theme for your profile
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {themePresets.map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => setSelectedTheme(theme)}
                                                className={`
                                                    relative rounded-xl overflow-hidden border transition-all
                                                    ${selectedTheme.id === theme.id
                                                        ? 'ring-2 ring-violet-500 border-violet-500'
                                                        : 'border-zinc-800 hover:border-zinc-700'
                                                    }
                                                `}
                                            >
                                                <div className={`aspect-[4/3] bg-gradient-to-br ${theme.gradient} p-4`}>
                                                    <div
                                                        className="w-8 h-8 rounded-full"
                                                        style={{ backgroundColor: theme.accent }}
                                                    />
                                                </div>
                                                <div className="p-2 bg-zinc-900 text-center">
                                                    <p className="text-sm font-medium">{theme.name}</p>
                                                </div>
                                                {selectedTheme.id === theme.id && (
                                                    <div className="absolute top-2 right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                                                        <Check className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center gap-4 mt-8">
                            {currentStep > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={!canProceed() || loading}
                                className="flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-xl font-medium transition-colors active:scale-[0.98]"
                            >
                                {loading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : currentStep === steps.length - 1 ? (
                                    <>
                                        Complete Setup
                                        <Sparkles className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ChevronRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right: Preview - shows first on mobile */}
                    <div className="order-1 lg:order-2 lg:sticky lg:top-24 w-full">
                        <div className="text-center mb-3 md:mb-4">
                            <p className="text-xs md:text-sm text-zinc-500 flex items-center justify-center gap-2">
                                <Eye className="w-4 h-4" />
                                Live Preview
                            </p>
                        </div>
                        <ProfilePreview
                            photo={photo}
                            name={name}
                            tagline={tagline}
                            bio={bio}
                            theme={selectedTheme}
                            socials={socials}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
