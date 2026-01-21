"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, Twitter, Facebook, Youtube, Music, Globe, ExternalLink } from "lucide-react"
import React from "react"
import { Profile } from "./types"

interface SocialLinksProps {
    profile: Profile
}

const iconMap: Record<string, React.ElementType> = {
    linkedIn: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    youtube: Youtube,
    tiktok: Music,
    website: Globe
}

const colorMap: Record<string, string> = {
    linkedIn: 'bg-[#0077B5] hover:bg-[#006097]',
    instagram: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:opacity-90',
    twitter: 'bg-black hover:bg-zinc-900 border border-white/10',
    facebook: 'bg-[#1877F2] hover:bg-[#1565cc]',
    youtube: 'bg-[#FF0000] hover:bg-[#cc0000]',
    tiktok: 'bg-black hover:bg-zinc-900 border border-white/10',
    website: 'bg-zinc-800 hover:bg-zinc-700'
}

const labelMap: Record<string, string> = {
    linkedIn: 'LinkedIn',
    instagram: 'Instagram',
    twitter: 'X / Twitter',
    facebook: 'Facebook',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    website: 'Website'
}

export default function SocialLinks({ profile }: SocialLinksProps) {
    // Build array of active social links
    const links = [
        { key: 'linkedIn', url: profile.linkedIn },
        { key: 'instagram', url: profile.instagram },
        { key: 'twitter', url: profile.twitter },
        { key: 'facebook', url: profile.facebook },
        { key: 'youtube', url: profile.youtube },
        { key: 'tiktok', url: profile.tiktok },
        { key: 'website', url: profile.website }
    ].filter(link => link.url)

    if (links.length === 0) return null

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.4
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 mb-6"
        >
            <div className="max-w-md mx-auto space-y-3">
                {links.map((link) => {
                    const Icon = iconMap[link.key] || Globe
                    const color = colorMap[link.key] || 'bg-zinc-800'
                    const label = labelMap[link.key] || 'Link'

                    return (
                        <motion.a
                            key={link.key}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                flex items-center gap-4 p-4 rounded-xl
                                ${color}
                                shadow-lg transition-all duration-200
                            `}
                        >
                            <Icon className="w-5 h-5 text-white shrink-0" />
                            <span className="text-white font-medium flex-1">
                                {label}
                            </span>
                            <ExternalLink className="w-4 h-4 text-white/50" />
                        </motion.a>
                    )
                })}
            </div>
        </motion.section>
    )
}
