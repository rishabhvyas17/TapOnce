/**
 * @file Premium Public Profile
 * @description Minimal, aesthetic public profile with theme customization
 * 
 * Design Philosophy: Clean, premium, professional
 */

'use client'

import { motion } from 'framer-motion'
import {
    Phone, Mail, MessageCircle,
    MapPin, ExternalLink, Download,
    Linkedin, Instagram, Twitter, Facebook, Youtube, Globe,
    BadgeCheck
} from 'lucide-react'
import { Profile, getThemeForProfile, ThemeConfig } from './types'

interface PremiumPublicProfileProps {
    profile: Profile
    slug: string
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
        profile.bio ? `NOTE:${profile.bio.replace(/\n/g, '\\n')}` : '',
        'END:VCARD'
    ].filter(Boolean)

    return lines.join('\n')
}

export default function PremiumPublicProfile({ profile, slug }: PremiumPublicProfileProps) {
    const theme = getThemeForProfile(profile)

    const handleSaveContact = () => {
        const vcard = generateVCard(profile)
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${profile.fullName.replace(/\s+/g, '_')}.vcf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate(50)
    }

    const whatsappNumber = (profile.whatsapp || profile.phone).replace(/\D/g, '')
    const whatsappMessage = encodeURIComponent(`Hi ${profile.fullName.split(' ')[0]}!`)

    // Social links with icons
    const socialLinks = [
        { key: 'linkedIn', url: profile.linkedIn, icon: Linkedin, label: 'LinkedIn' },
        { key: 'instagram', url: profile.instagram, icon: Instagram, label: 'Instagram' },
        { key: 'twitter', url: profile.twitter, icon: Twitter, label: 'Twitter' },
        { key: 'facebook', url: profile.facebook, icon: Facebook, label: 'Facebook' },
        { key: 'youtube', url: profile.youtube, icon: Youtube, label: 'YouTube' },
        { key: 'website', url: profile.website, icon: Globe, label: 'Website' },
    ].filter(link => link.url)

    return (
        <main
            className="min-h-screen"
            style={{
                backgroundColor: theme.bgPrimary,
                color: theme.textPrimary
            }}
        >
            {/* Gradient Overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-30"
                style={{
                    background: `radial-gradient(ellipse at top, ${theme.accent}20 0%, transparent 50%)`
                }}
            />

            <div className="relative max-w-md mx-auto px-6 py-12 pb-32">

                {/* Profile Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    {/* Avatar */}
                    <div className="relative inline-block mb-6">
                        <div
                            className="absolute -inset-1 rounded-full blur-lg opacity-50"
                            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentLight})` }}
                        />
                        <img
                            src={profile.photo || '/default-avatar.png'}
                            alt={profile.fullName}
                            className="relative w-32 h-32 rounded-full object-cover border-2"
                            style={{ borderColor: theme.bgSecondary }}
                            loading="eager"
                        />
                        {profile.status === 'active' && (
                            <div
                                className="absolute -bottom-1 -right-1 p-1 rounded-full"
                                style={{ backgroundColor: theme.bgPrimary }}
                            >
                                <BadgeCheck
                                    className="w-6 h-6"
                                    style={{ color: theme.accent }}
                                    fill={theme.accent}
                                />
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <h1 className="text-2xl font-bold tracking-tight mb-1">
                        {profile.fullName}
                    </h1>

                    {/* Tagline or Job Title */}
                    {(profile.tagline || profile.jobTitle) && (
                        <p
                            className="text-lg mb-1"
                            style={{ color: theme.textSecondary }}
                        >
                            {profile.tagline || profile.jobTitle}
                        </p>
                    )}

                    {/* Company & Location */}
                    <div
                        className="flex items-center justify-center gap-3 text-sm"
                        style={{ color: theme.textSecondary }}
                    >
                        {profile.companyName && (
                            <span className="flex items-center gap-1">
                                <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: theme.accent }}
                                />
                                {profile.companyName}
                            </span>
                        )}
                        {profile.location && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {profile.location}
                            </span>
                        )}
                    </div>
                </motion.header>

                {/* Bio */}
                {profile.bio && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8"
                    >
                        <p
                            className="text-center text-sm leading-relaxed"
                            style={{ color: theme.textSecondary }}
                        >
                            {profile.bio}
                        </p>
                    </motion.section>
                )}

                {/* Quick Contact Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex justify-center gap-4 mb-8"
                >
                    <a
                        href={`tel:${profile.phone}`}
                        className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105"
                        style={{ backgroundColor: theme.bgSecondary }}
                    >
                        <Phone className="w-5 h-5" style={{ color: theme.accent }} />
                        <span className="text-xs" style={{ color: theme.textSecondary }}>Call</span>
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
                        className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105"
                        style={{ backgroundColor: theme.bgSecondary }}
                    >
                        <Mail className="w-5 h-5" style={{ color: theme.accent }} />
                        <span className="text-xs" style={{ color: theme.textSecondary }}>Email</span>
                    </a>
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-transform hover:scale-105"
                        style={{ backgroundColor: theme.bgSecondary }}
                    >
                        <MessageCircle className="w-5 h-5" style={{ color: theme.accent }} />
                        <span className="text-xs" style={{ color: theme.textSecondary }}>Message</span>
                    </a>
                </motion.div>

                {/* Custom CTA Button */}
                {profile.ctaText && profile.ctaUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8"
                    >
                        <a
                            href={profile.ctaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-medium transition-all hover:scale-[1.02]"
                            style={{
                                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                color: '#ffffff'
                            }}
                        >
                            {profile.ctaText}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mb-8"
                    >
                        <div className="grid grid-cols-4 gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.key}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105"
                                    style={{ backgroundColor: theme.bgSecondary }}
                                    title={social.label}
                                >
                                    <social.icon className="w-5 h-5" style={{ color: theme.accent }} />
                                    <span
                                        className="text-[10px] font-medium truncate w-full text-center"
                                        style={{ color: theme.textSecondary }}
                                    >
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* TapOnce Branding */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center pt-8 border-t"
                    style={{ borderColor: `${theme.textSecondary}20` }}
                >
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                        Powered by{' '}
                        <a
                            href="https://taponce.in"
                            className="font-semibold hover:underline"
                            style={{ color: theme.accent }}
                        >
                            TapOnce
                        </a>
                    </p>
                </motion.footer>
            </div>

            {/* Sticky Save Contact Button */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
                className="fixed bottom-0 left-0 right-0 p-4 pb-6"
                style={{
                    background: `linear-gradient(to top, ${theme.bgPrimary}, ${theme.bgPrimary}dd, transparent)`
                }}
            >
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleSaveContact}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                            color: '#ffffff',
                            boxShadow: `0 10px 40px ${theme.accent}40`
                        }}
                    >
                        <Download className="w-5 h-5" />
                        Save Contact
                    </button>
                </div>
            </motion.div>
        </main>
    )
}
