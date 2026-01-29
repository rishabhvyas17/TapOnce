/**
 * @file Profile Types
 * @description TypeScript types for public profile components
 */

// Expanded profession types
export type Profession =
    | 'ceo'
    | 'doctor'
    | 'lawyer'
    | 'realtor'
    | 'influencer'
    | 'designer'
    | 'consultant'
    | 'sales'
    | 'entrepreneur'
    | 'musician'
    | 'photographer'
    | 'coach'
    | 'teacher'
    | 'student'
    | 'freelancer'
    | 'other'

// Theme preset names
export type ThemePreset =
    | 'midnight'      // Dark, elegant
    | 'ocean'         // Blue gradients
    | 'sunset'        // Warm orange/pink
    | 'forest'        // Natural greens
    | 'minimal'       // Clean white/gray
    | 'neon'          // Vibrant purple/pink
    | 'professional'  // Classic navy/gold
    | 'custom'        // User-defined colors

export interface Profile {
    // Basic Info
    fullName: string
    jobTitle: string
    companyName?: string
    tagline?: string           // Short memorable tagline
    bio?: string
    photo?: string

    // Contact
    phone: string
    email: string
    whatsapp?: string
    location?: string          // City, Country

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

    // Theme & Appearance
    themePreset?: ThemePreset
    accentColor?: string       // Custom accent color (hex)

    // Custom CTA Button
    ctaText?: string           // e.g., "Book a Call", "View Portfolio"
    ctaUrl?: string            // URL for the CTA button

    // Status
    status: 'active' | 'inactive'
}

export interface ThemeConfig {
    name: string
    accent: string
    accentLight: string
    accentDark: string
    gradient: string
    bgPrimary: string
    bgSecondary: string
    textPrimary: string
    textSecondary: string
}

// Theme presets - minimal, aesthetic designs
export const themePresets: Record<ThemePreset, ThemeConfig> = {
    midnight: {
        name: 'Midnight',
        accent: '#8b5cf6',
        accentLight: '#a78bfa',
        accentDark: '#7c3aed',
        gradient: 'from-violet-600 to-purple-700',
        bgPrimary: '#0a0a0a',
        bgSecondary: '#111111',
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa'
    },
    ocean: {
        name: 'Ocean',
        accent: '#0ea5e9',
        accentLight: '#38bdf8',
        accentDark: '#0284c7',
        gradient: 'from-cyan-500 to-blue-600',
        bgPrimary: '#0c1222',
        bgSecondary: '#1e293b',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8'
    },
    sunset: {
        name: 'Sunset',
        accent: '#f97316',
        accentLight: '#fb923c',
        accentDark: '#ea580c',
        gradient: 'from-orange-500 to-rose-600',
        bgPrimary: '#18181b',
        bgSecondary: '#27272a',
        textPrimary: '#fafafa',
        textSecondary: '#a1a1aa'
    },
    forest: {
        name: 'Forest',
        accent: '#10b981',
        accentLight: '#34d399',
        accentDark: '#059669',
        gradient: 'from-emerald-500 to-teal-600',
        bgPrimary: '#0a0f0d',
        bgSecondary: '#1a2421',
        textPrimary: '#f0fdf4',
        textSecondary: '#86efac'
    },
    minimal: {
        name: 'Minimal',
        accent: '#18181b',
        accentLight: '#3f3f46',
        accentDark: '#09090b',
        gradient: 'from-zinc-800 to-zinc-900',
        bgPrimary: '#fafafa',
        bgSecondary: '#f4f4f5',
        textPrimary: '#18181b',
        textSecondary: '#71717a'
    },
    neon: {
        name: 'Neon',
        accent: '#d946ef',
        accentLight: '#e879f9',
        accentDark: '#c026d3',
        gradient: 'from-fuchsia-500 to-pink-600',
        bgPrimary: '#09090b',
        bgSecondary: '#18181b',
        textPrimary: '#fafafa',
        textSecondary: '#a1a1aa'
    },
    professional: {
        name: 'Professional',
        accent: '#eab308',
        accentLight: '#facc15',
        accentDark: '#ca8a04',
        gradient: 'from-amber-500 to-yellow-600',
        bgPrimary: '#0f172a',
        bgSecondary: '#1e293b',
        textPrimary: '#f8fafc',
        textSecondary: '#cbd5e1'
    },
    custom: {
        name: 'Custom',
        accent: '#8b5cf6',
        accentLight: '#a78bfa',
        accentDark: '#7c3aed',
        gradient: 'from-violet-600 to-purple-700',
        bgPrimary: '#0a0a0a',
        bgSecondary: '#111111',
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa'
    }
}

// Profession themes (for auto-selection)
export const professionThemes: Record<Profession, ThemeConfig> = {
    ceo: themePresets.professional,
    doctor: themePresets.forest,
    lawyer: themePresets.midnight,
    realtor: themePresets.ocean,
    influencer: themePresets.neon,
    designer: themePresets.midnight,
    consultant: themePresets.ocean,
    sales: themePresets.sunset,
    entrepreneur: themePresets.professional,
    musician: themePresets.neon,
    photographer: themePresets.midnight,
    coach: themePresets.forest,
    teacher: themePresets.ocean,
    student: themePresets.minimal,
    freelancer: themePresets.sunset,
    other: themePresets.midnight
}

// Profession display info
export const professionInfo: Record<Profession, { label: string; icon: string }> = {
    ceo: { label: 'CEO / Executive', icon: 'Briefcase' },
    doctor: { label: 'Doctor / Healthcare', icon: 'Stethoscope' },
    lawyer: { label: 'Lawyer / Legal', icon: 'Scale' },
    realtor: { label: 'Real Estate Agent', icon: 'Home' },
    influencer: { label: 'Content Creator', icon: 'Video' },
    designer: { label: 'Designer / Creative', icon: 'Palette' },
    consultant: { label: 'Consultant', icon: 'LineChart' },
    sales: { label: 'Sales Professional', icon: 'TrendingUp' },
    entrepreneur: { label: 'Entrepreneur', icon: 'Rocket' },
    musician: { label: 'Musician / Artist', icon: 'Music' },
    photographer: { label: 'Photographer', icon: 'Camera' },
    coach: { label: 'Coach / Mentor', icon: 'Award' },
    teacher: { label: 'Teacher / Educator', icon: 'GraduationCap' },
    student: { label: 'Student', icon: 'BookOpen' },
    freelancer: { label: 'Freelancer', icon: 'Laptop' },
    other: { label: 'Other', icon: 'User' }
}

// Get theme for a profile
export function getThemeForProfile(profile: Pick<Profile, 'themePreset' | 'profession' | 'accentColor'>): ThemeConfig {
    // If user selected a theme preset, use that
    if (profile.themePreset && profile.themePreset !== 'custom') {
        return themePresets[profile.themePreset]
    }

    // If custom, use the profession theme as base
    if (profile.themePreset === 'custom' && profile.accentColor) {
        const baseTheme = professionThemes[profile.profession || 'other']
        return {
            ...baseTheme,
            accent: profile.accentColor,
            accentLight: profile.accentColor,
            accentDark: profile.accentColor
        }
    }

    // Default: use profession-based theme
    return professionThemes[profile.profession || 'other']
}

// Legacy function for compatibility
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
