"use client"

import { motion } from "framer-motion"
import { BadgeCheck } from "lucide-react"
import React from "react"
import { Profile, getThemeForProfession } from "./types"

interface ProfileHeroProps {
    profile: Profile
}

export default function ProfileHero({ profile }: ProfileHeroProps) {
    const theme = getThemeForProfession(profile.profession)

    return (
        <section className="relative pt-12 pb-8 px-4 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]"
                />
                <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b ${theme.gradient} opacity-10 blur-[100px] rounded-full`}
                />
            </div>

            <div className="max-w-md mx-auto text-center">
                {/* Profile Photo */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative inline-block mb-6"
                >
                    {/* Glowing Ring */}
                    <div
                        className={`absolute -inset-1 bg-gradient-to-tr ${theme.gradient} rounded-full blur-sm opacity-75`}
                    />

                    {/* Photo Container */}
                    <div className="relative">
                        <img
                            src={profile.photo || '/default-avatar.png'}
                            alt={profile.fullName}
                            className="w-36 h-36 rounded-full object-cover border-4 border-[#0a0a0a] relative z-10"
                            loading="eager"
                        />

                        {/* Verification Badge */}
                        {profile.status === 'active' && (
                            <div
                                className="absolute -bottom-1 -right-1 z-20 bg-[#0a0a0a] rounded-full p-1"
                            >
                                <BadgeCheck
                                    className="w-6 h-6"
                                    style={{ color: theme.accent }}
                                    fill={theme.accent}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-2xl font-bold text-white tracking-tight mb-1"
                >
                    {profile.fullName}
                </motion.h1>

                {/* Job Title */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-lg text-zinc-300 mb-1"
                >
                    {profile.jobTitle}
                </motion.p>

                {/* Company */}
                {profile.companyName && (
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-sm text-zinc-500 flex items-center justify-center gap-1"
                    >
                        <span
                            className="inline-block w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                        />
                        {profile.companyName}
                    </motion.p>
                )}
            </div>
        </section>
    )
}
