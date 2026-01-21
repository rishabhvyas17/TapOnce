"use client"

import { motion } from "framer-motion"
import { Download, UserPlus } from "lucide-react"
import React, { useState } from "react"
import { Profile, getThemeForProfession } from "./types"

interface StickyContactCTAProps {
    profile: Profile
}

// Generate vCard content
function generateVCard(profile: Profile): string {
    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${profile.fullName}`,
        profile.companyName ? `ORG:${profile.companyName}` : '',
        profile.jobTitle ? `TITLE:${profile.jobTitle}` : '',
        `TEL;TYPE=CELL:${profile.phone}`,
        `EMAIL:${profile.email}`,
        profile.website ? `URL:${profile.website}` : '',
        profile.linkedIn ? `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedIn}` : '',
        profile.instagram ? `X-SOCIALPROFILE;TYPE=instagram:${profile.instagram}` : '',
        profile.twitter ? `X-SOCIALPROFILE;TYPE=twitter:${profile.twitter}` : '',
        profile.bio ? `NOTE:${profile.bio.replace(/\n/g, '\\n')}` : '',
        'END:VCARD'
    ].filter(Boolean)

    return lines.join('\n')
}

export default function StickyContactCTA({ profile }: StickyContactCTAProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const theme = getThemeForProfession(profile.profession)

    const handleSaveContact = async () => {
        setIsSaving(true)

        // Small delay for visual feedback
        await new Promise(resolve => setTimeout(resolve, 300))

        const vcard = generateVCard(profile)
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${profile.fullName.replace(/\s+/g, '_')}_Contact.vcf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        setIsSaving(false)
        setSaved(true)

        // Reset after 3 seconds
        setTimeout(() => setSaved(false), 3000)

        // Haptic feedback if supported
        if (navigator.vibrate) {
            navigator.vibrate(50)
        }
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent"
        >
            <div className="max-w-md mx-auto">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveContact}
                    disabled={isSaving}
                    className={`
                        w-full py-4 px-6 rounded-2xl font-bold text-lg
                        flex items-center justify-center gap-3
                        transition-all duration-300 shadow-xl
                        ${saved
                            ? 'bg-emerald-500 text-white'
                            : `bg-gradient-to-r ${theme.gradient} text-white`
                        }
                    `}
                    style={{
                        boxShadow: saved
                            ? '0 10px 40px rgba(16, 185, 129, 0.3)'
                            : `0 10px 40px ${theme.accent}30`
                    }}
                >
                    {saved ? (
                        <>
                            <UserPlus className="w-5 h-5" />
                            Contact Saved!
                        </>
                    ) : isSaving ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Download className="w-5 h-5" />
                            Save Contact
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    )
}
