"use client"

import { motion } from "framer-motion"
import { FileText, Image, Calendar, Briefcase, Download, ExternalLink } from "lucide-react"
import React from "react"
import { Profile, Profession } from "./types"

interface ActionCardsProps {
    profile: Profile
}

interface ActionCard {
    key: string
    label: string
    description: string
    icon: React.ElementType
    url?: string
    professions: Profession[]
}

// Define which cards show for which professions
const cardDefinitions: ActionCard[] = [
    {
        key: 'portfolio',
        label: 'View Portfolio',
        description: 'See my work',
        icon: Image,
        professions: ['designer', 'influencer', 'other']
    },
    {
        key: 'booking',
        label: 'Book Appointment',
        description: 'Schedule a meeting',
        icon: Calendar,
        professions: ['doctor', 'consultant', 'lawyer', 'realtor', 'ceo']
    },
    {
        key: 'resume',
        label: 'Download Resume',
        description: 'Get my CV',
        icon: FileText,
        professions: ['designer', 'consultant', 'other']
    },
    {
        key: 'mediakit',
        label: 'Media Kit',
        description: 'For collaborations',
        icon: Download,
        professions: ['influencer']
    },
    {
        key: 'services',
        label: 'Our Services',
        description: 'What we offer',
        icon: Briefcase,
        professions: ['ceo', 'consultant', 'sales']
    }
]

export default function ActionCards({ profile }: ActionCardsProps) {
    const profession = profile.profession || 'other'

    // Map of URLs from profile
    const urlMap: Record<string, string | undefined> = {
        portfolio: profile.portfolioUrl,
        booking: profile.bookingUrl,
        resume: profile.resumeUrl,
        mediakit: profile.mediaKitUrl,
        services: profile.website
    }

    // Filter cards based on profession and availability of URL
    const availableCards = cardDefinitions.filter(card =>
        card.professions.includes(profession) && urlMap[card.key]
    )

    if (availableCards.length === 0) return null

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.5
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
            className="px-4 mb-8"
        >
            <div className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-3">
                    {availableCards.map((card) => (
                        <motion.a
                            key={card.key}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={urlMap[card.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex flex-col items-center justify-center gap-2 p-5
                                bg-[#111] border border-white/5 rounded-2xl
                                hover:bg-[#151515] hover:border-white/10
                                transition-all duration-200
                            "
                        >
                            <card.icon className="w-6 h-6 text-zinc-400" />
                            <span className="text-sm font-medium text-white text-center">
                                {card.label}
                            </span>
                            <span className="text-xs text-zinc-500 text-center">
                                {card.description}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
