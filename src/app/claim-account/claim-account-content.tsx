/**
 * @file Claim Account Content Component
 * @description Client component for claim account functionality styled in tech-minimalist light theme
 */

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Eye, EyeOff, Check, Lock, ArrowRight, AlertCircle, Loader2, User, Mail } from 'lucide-react'
import Link from 'next/link'

interface OrderInfo {
    orderNumber: number
    customerName: string
    customerEmail: string
}

export default function ClaimAccountContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [alreadyClaimed, setAlreadyClaimed] = useState(false)
    const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Validate token on load
    useEffect(() => {
        if (!token) {
            setError('Invalid claim link. Please use the link from your email.')
            setLoading(false)
            return
        }

        async function validateToken() {
            try {
                const response = await fetch(`/api/auth/claim-account?token=${token}`)
                const data = await response.json()

                if (!response.ok) {
                    if (data.alreadyClaimed) {
                        setAlreadyClaimed(true)
                    } else {
                        setError(data.error || 'Invalid claim link')
                    }
                } else {
                    setOrderInfo(data)
                }
            } catch (err) {
                setError('Failed to validate link. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        validateToken()
    }, [token])

    const passwordStrength = () => {
        if (!password) return { score: 0, label: '' }
        let score = 0
        if (password.length >= 8) score++
        if (password.length >= 12) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent']
        const colors = ['', 'bg-rose-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-green-500']

        return { score, label: labels[score] || '', color: colors[score] || '' }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setSubmitting(false)
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            setSubmitting(false)
            return
        }

        try {
            const response = await fetch('/api/auth/claim-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to claim account')
            }

            setSuccess(true)

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login')
            }, 2000)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const strength = passwordStrength()

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-background text-slate-900 flex items-center justify-center">
                <div className="text-center space-y-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    <p className="text-zinc-500 text-sm">Validating your claim link...</p>
                </div>
            </main>
        )
    }

    // Already claimed state
    if (alreadyClaimed) {
        return (
            <main className="min-h-screen bg-background text-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-8 text-center shadow-sm">
                    <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Account Already Claimed</h1>
                    <p className="text-zinc-550 text-xs mb-6">
                        Your account has already been set up. You can login to customize your profile.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        Go to Login <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </main>
        )
    }

    // Error state (invalid token)
    if (error && !orderInfo) {
        return (
            <main className="min-h-screen bg-background text-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-8 text-center shadow-sm">
                    <div className="h-14 w-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-7 w-7 text-rose-600" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Invalid Link</h1>
                    <p className="text-zinc-550 text-xs mb-6">{error}</p>
                    <div className="space-y-3">
                        <a
                            href="https://wa.me/919876543210"
                            className="block w-full py-3 rounded-full border border-zinc-200/80 text-slate-900 hover:bg-zinc-50 text-xs font-semibold uppercase tracking-wider font-mono transition-colors"
                        >
                            Contact Support
                        </a>
                        <Link href="/" className="block text-xs font-mono font-bold text-zinc-400 hover:text-slate-900 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    // Success state
    if (success) {
        return (
            <main className="min-h-screen bg-background text-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-8 text-center shadow-sm">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Check className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Account Created!</h1>
                    <p className="text-zinc-550 text-xs mb-4">
                        Your TapOnce account is ready. Redirecting to login...
                    </p>
                    <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
                </div>
            </main>
        )
    }

    // Main form
    return (
        <main className="min-h-screen bg-background text-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-8 shadow-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                            <Lock className="h-7 w-7 text-primary" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Set Up Your Account</h1>
                        <p className="text-zinc-500 text-xs">Create a password to access your TapOnce profile</p>
                    </div>

                    {/* Order Info */}
                    {orderInfo && (
                        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 mb-6 space-y-2">
                            <div className="flex items-center gap-2.5 text-xs text-slate-700">
                                <User className="h-4 w-4 text-zinc-400" />
                                <span className="font-medium">{orderInfo.customerName}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-700">
                                <Mail className="h-4 w-4 text-zinc-400" />
                                <span className="font-medium">{orderInfo.customerEmail}</span>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-slate-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Password strength */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full ${i <= strength.score ? strength.color : 'bg-zinc-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-zinc-450 font-medium">{strength.label}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-xl text-slate-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                required
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-rose-600 mt-1">Passwords don't match</p>
                            )}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 text-xs text-rose-600 bg-rose-55 rounded-xl border border-rose-100 font-medium">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting || password.length < 8 || password !== confirmPassword}
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-zinc-400 mt-6">
                        Already have an account? <Link href="/login" className="text-primary hover:underline font-semibold">Login</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
