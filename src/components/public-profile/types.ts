/**
 * @file Profile Types
 * @description TypeScript types for public profile components
 */

export type Profession =
    | 'ceo'
    | 'doctor'
    | 'lawyer'
    | 'realtor'
    | 'influencer'
    | 'designer'
    | 'consultant'
    | 'sales'
    | 'other'

export interface Profile {
    // Basic Info
    fullName: string
    jobTitle: string
    companyName?: string
    bio?: string
    photo?: string

    // Contact
    phone: string
    email: string
    whatsapp?: string

    // Social Links
    linkedIn?: string
    instagram?: string
    twitter?: string
    facebook?: string
    youtube?: string
    tiktok?: string
    website?: string

    // Profession-specific
    profession?: Profession
    portfolioUrl?: string
    bookingUrl?: string
    mediaKitUrl?: string
    resumeUrl?: string

    // Theme
    accentColor?: string

    // Status
    status: 'active' | 'inactive'
}

export interface ThemeConfig {
    accent: string
    accentLight: string
    accentDark: string
    gradient: string
}

export const professionThemes: Record<Profession, ThemeConfig> = {
    ceo: {
        accent: '#f59e0b',      // amber
        accentLight: '#fcd34d',
        accentDark: '#d97706',
        gradient: 'from-amber-500 to-orange-600'
    },
    doctor: {
        accent: '#10b981',      // emerald
        accentLight: '#34d399',
        accentDark: '#059669',
        gradient: 'from-emerald-500 to-green-600'
    },
    lawyer: {
        accent: '#64748b',      // slate
        accentLight: '#94a3b8',
        accentDark: '#475569',
        gradient: 'from-slate-500 to-gray-700'
    },
    realtor: {
        accent: '#3b82f6',      // blue
        accentLight: '#60a5fa',
        accentDark: '#2563eb',
        gradient: 'from-blue-500 to-indigo-600'
    },
    influencer: {
        accent: '#ec4899',      // pink
        accentLight: '#f472b6',
        accentDark: '#db2777',
        gradient: 'from-pink-500 to-rose-600'
    },
    designer: {
        accent: '#8b5cf6',      // violet
        accentLight: '#a78bfa',
        accentDark: '#7c3aed',
        gradient: 'from-violet-500 to-purple-600'
    },
    consultant: {
        accent: '#06b6d4',      // cyan
        accentLight: '#22d3ee',
        accentDark: '#0891b2',
        gradient: 'from-cyan-500 to-blue-600'
    },
    sales: {
        accent: '#f97316',      // orange
        accentLight: '#fb923c',
        accentDark: '#ea580c',
        gradient: 'from-orange-500 to-red-600'
    },
    other: {
        accent: '#8b5cf6',      // violet (default)
        accentLight: '#a78bfa',
        accentDark: '#7c3aed',
        gradient: 'from-violet-500 to-purple-600'
    }
}

// Get theme for a profession
export function getThemeForProfession(profession?: Profession): ThemeConfig {
    return professionThemes[profession || 'other']
}

// Social link configuration
export interface SocialLink {
    key: string
    label: string
    icon: string
    color: string
    urlPattern?: RegExp
}

export const socialLinkConfig: Record<string, SocialLink> = {
    linkedIn: {
        key: 'linkedIn',
        label: 'LinkedIn',
        icon: 'Linkedin',
        color: 'bg-[#0077B5]'
    },
    instagram: {
        key: 'instagram',
        label: 'Instagram',
        icon: 'Instagram',
        color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
    },
    twitter: {
        key: 'twitter',
        label: 'X / Twitter',
        icon: 'Twitter',
        color: 'bg-black'
    },
    facebook: {
        key: 'facebook',
        label: 'Facebook',
        icon: 'Facebook',
        color: 'bg-[#1877F2]'
    },
    youtube: {
        key: 'youtube',
        label: 'YouTube',
        icon: 'Youtube',
        color: 'bg-[#FF0000]'
    },
    tiktok: {
        key: 'tiktok',
        label: 'TikTok',
        icon: 'Music',
        color: 'bg-black'
    },
    website: {
        key: 'website',
        label: 'Website',
        icon: 'Globe',
        color: 'bg-zinc-700'
    }
}
