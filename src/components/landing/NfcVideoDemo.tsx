"use client"

import React, { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Smartphone, Cpu, ShieldCheck } from "lucide-react"

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
        // Attempt autoplay muted on load
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setIsPlaying(true)
            }).catch(() => {
                // Autoplay blocked or video missing
                setIsPlaying(false)
            })
        }
    }, [])

    return (
        <section id="demo" className="py-20 lg:py-28 bg-white border-t border-zinc-100 relative overflow-hidden">
            {/* Tech grid texture background */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Text & Tech Specs */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold tracking-wider text-primary uppercase">
                                <Cpu className="w-3 h-3 animate-pulse" />
                                Instant Transmission Technology
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900 leading-[1.1]">
                                See the magic in action
                            </h2>
                            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-normal">
                                One tap transmits your contact cards, social networks, portfolios, and payment details directly to any smartphone screen. Zero friction.
                            </p>
                        </div>

                        {/* Tech checklist items */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                                    <Smartphone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">Zero App Requirements</h4>
                                    <p className="text-xs text-zinc-500 font-normal leading-normal mt-0.5">Works natively on iOS & Android. The receiver does not need any app or special setup.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                                    <Cpu className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">Ultra Fast Loading (&lt; 1 sec)</h4>
                                    <p className="text-xs text-zinc-500 font-normal leading-normal mt-0.5">Transmits via localized high-frequency NFC signal, pulling up profiles instantly.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">Encrypted & Secure</h4>
                                    <p className="text-xs text-zinc-500 font-normal leading-normal mt-0.5">Fully complies with modern data sharing protection protocols. Control what you share.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Device Mockup Video Player */}
                    <div className="lg:col-span-7 flex justify-center">
                        <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-[48px] bg-zinc-950 p-3 shadow-2xl border-[6px] border-zinc-900 ring-1 ring-white/10 overflow-hidden group">
                            
                            {/* iPhone Dynamic Island */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ml-auto mr-4" />
                            </div>

                            {/* Inner Screen Video/Fallback Frame */}
                            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-zinc-900 z-10">
                                
                                {hasError ? (
                                    /* Interactive Tech Placeholder if Video Asset is missing/loading */
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-900 to-zinc-950">
                                        <div className="relative mb-6">
                                            <div className="w-16 h-28 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center relative z-10 shadow-inner">
                                                <Smartphone className="h-8 w-8 text-zinc-650" />
                                            </div>
                                            {/* NFC card hovering */}
                                            <div className="absolute -right-6 top-10 w-14 h-9 bg-primary/20 border border-primary/40 rounded-md shadow-lg flex items-center justify-center animate-bounce">
                                                <Cpu className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>
                                        <h5 className="text-xs font-bold tracking-wider uppercase text-zinc-300">TapOnce Demonstration</h5>
                                        <p className="text-[10px] text-zinc-500 mt-2 max-w-[180px] leading-relaxed">
                                            Video demo file missing at public/videos/tap-demo.mp4. Add your video asset to load.
                                        </p>
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

                                {/* Bottom Interactive Media Controls */}
                                {!hasError && (
                                    <div className="absolute bottom-5 left-0 right-0 px-6 z-25 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        {/* Play/Pause Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                togglePlay()
                                            }}
                                            className="pointer-events-auto h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                            aria-label={isPlaying ? "Pause Video" : "Play Video"}
                                        >
                                            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                                        </button>

                                        {/* Mute/Unmute Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleMute()
                                            }}
                                            className="pointer-events-auto h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                            aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                                        >
                                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Shadow/Glow borders details */}
                            <div className="absolute inset-0 rounded-[48px] border border-white/10 pointer-events-none z-20" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
