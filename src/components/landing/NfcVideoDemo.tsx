"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Bookmark, Calendar, Share2, Smartphone } from "lucide-react"

export default function NfcVideoDemo() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [hasError, setHasError] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play().then(() => {
                setIsPlaying(true)
                setHasError(false)
            }).catch(() => {
                setHasError(true)
            })
        }
    }

    const toggleMute = () => {
        if (!videoRef.current) return
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setIsPlaying(true)
            }).catch(() => {
                setIsPlaying(false)
            })
        }
    }, [])

    const features = [
        {
            icon: Bookmark,
            title: "Save Contact Instantly",
            description: "One tap adds your name, phone, email, and company directly to their contacts. No typing needed."
        },
        {
            icon: Calendar,
            title: "Book Appointments",
            description: "Integrated booking links let clients schedule meetings with you right from your portfolio."
        },
        {
            icon: Share2,
            title: "Share Everything",
            description: "Social media, website, portfolio, WhatsApp — your entire digital presence in one tap."
        },
    ]

    return (
        <section className="section-padding bg-[#0A0A0A] text-white relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(200,163,95,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left: Text & Features */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-sm font-semibold text-gold-400 uppercase tracking-wider"
                            >
                                See It In Action
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-display-md font-display font-bold tracking-tight leading-tight"
                            >
                                Your portfolio, delivered in{" "}
                                <span className="text-gold-400">under a second.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-neutral-400 text-base leading-relaxed"
                            >
                                Hold your TapOnce card against any smartphone. Your personalized digital portfolio 
                                loads instantly — ready for them to save, book, and connect.
                            </motion.p>
                        </div>

                        {/* Feature list */}
                        <div className="space-y-5">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                                        <feature.icon className="h-4.5 w-4.5 text-gold-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Video in Phone Mockup */}
                    <div className="lg:col-span-7 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full max-w-[360px] aspect-[9/16] rounded-[44px] bg-neutral-900 p-2.5 shadow-2xl border border-neutral-800 overflow-hidden group"
                        >
                            {/* Dynamic Island */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30" />

                            {/* Screen */}
                            <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-neutral-950 z-10">
                                {hasError ? (
                                    /* Polished fallback when video is missing */
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-neutral-900 to-neutral-950">
                                        <div className="relative mb-6">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center animate-tap-pulse">
                                                <Smartphone className="h-8 w-8 text-gold-400" />
                                            </div>
                                        </div>
                                        <h5 className="text-sm font-semibold text-white mb-2">Tap to Experience</h5>
                                        <p className="text-xs text-neutral-500 max-w-[200px] leading-relaxed">
                                            Your personalized portfolio loads instantly when someone taps your NFC card against their phone.
                                        </p>
                                        <div className="mt-6 flex items-center gap-2 text-[10px] text-neutral-600 font-medium">
                                            <div className="w-1 h-1 rounded-full bg-gold-400 animate-pulse" />
                                            Video demo coming soon
                                        </div>
                                    </div>
                                ) : (
                                    <video
                                        ref={videoRef}
                                        src="/videos/tap-demo.mp4"
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        onError={() => setHasError(true)}
                                        className="w-full h-full object-cover"
                                        onClick={togglePlay}
                                    />
                                )}

                                {/* Media Controls */}
                                {!hasError && (
                                    <div className="absolute bottom-4 left-0 right-0 px-5 z-25 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); togglePlay() }}
                                            className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                        >
                                            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); toggleMute() }}
                                            className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                            aria-label={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
