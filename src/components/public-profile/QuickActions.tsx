"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle } from "lucide-react"
import React from "react"
import { Profile } from "./types"

interface QuickActionsProps {
    profile: Profile
}

export default function QuickActions({ profile }: QuickActionsProps) {
    const whatsappMessage = `Hi ${profile.fullName.split(' ')[0]}, I just tapped your TapOnce card!`
    const whatsappNumber = profile.whatsapp?.replace(/\D/g, '') || profile.phone.replace(/\D/g, '')

    const actions = [
        {
            href: `tel:${profile.phone}`,
            icon: Phone,
            label: "Call",
            color: "bg-emerald-500",
            hoverColor: "hover:bg-emerald-600",
            shadowColor: "shadow-emerald-500/30"
        },
        {
            href: `mailto:${profile.email}`,
            icon: Mail,
            label: "Email",
            color: "bg-blue-500",
            hoverColor: "hover:bg-blue-600",
            shadowColor: "shadow-blue-500/30"
        },
        ...(profile.whatsapp || profile.phone ? [{
            href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
            icon: MessageCircle,
            label: "WhatsApp",
            color: "bg-green-600",
            hoverColor: "hover:bg-green-700",
            shadowColor: "shadow-green-500/30",
            external: true
        }] : [])
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-4 px-4 mb-6"
        >
            {actions.map((action, index) => (
                <motion.a
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={`
                        flex flex-col items-center gap-1.5 p-4 rounded-2xl
                        ${action.color} ${action.hoverColor}
                        shadow-lg ${action.shadowColor}
                        transition-colors duration-200
                    `}
                    title={action.label}
                >
                    <action.icon className="w-6 h-6 text-white" />
                    <span className="text-[10px] font-medium text-white/90 uppercase tracking-wide">
                        {action.label}
                    </span>
                </motion.a>
            ))}
        </motion.div>
    )
}
