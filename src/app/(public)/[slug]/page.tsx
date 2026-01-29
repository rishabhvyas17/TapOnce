/**
 * @file Public Tap View Page
 * @description Premium public profile page accessed via NFC tap
 * 
 * CRITICAL REQUIREMENTS:
 * - Load time <3s on 3G, <1.5s on 4G
 * - Minimal JavaScript bundle
 * - Image optimization (WebP, <100KB)
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PremiumPublicProfile from '@/components/public-profile/PremiumPublicProfile'
import { Profile, Profession, ThemePreset } from '@/components/public-profile/types'
import { getCustomerBySlug } from '@/lib/services/customers'
import { Customer } from '@/types/customer'

interface PageProps {
    params: { slug: string }
}

// Transform Customer to Profile type
function customerToProfile(customer: Customer): Profile {
    return {
        // Basic Info
        fullName: customer.fullName,
        jobTitle: customer.jobTitle || '',
        companyName: customer.company,
        tagline: customer.tagline,
        bio: customer.bio,
        photo: customer.avatarUrl,
        location: customer.location,

        // Contact
        phone: customer.phone,
        email: customer.email,
        whatsapp: customer.whatsapp,

        // Social Links
        linkedIn: customer.linkedinUrl,
        instagram: customer.instagramUrl,
        twitter: customer.twitterUrl,
        facebook: customer.facebookUrl,
        website: customer.websiteUrl,

        // Profession & Theme
        profession: (customer.profession as Profession) || 'other',
        themePreset: (customer.themePreset as ThemePreset) || 'midnight',
        accentColor: customer.accentColor,

        // Custom CTA
        ctaText: customer.ctaText,
        ctaUrl: customer.ctaUrl,

        // Status
        status: customer.status === 'active' ? 'active' : 'inactive'
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const customer = await getCustomerBySlug(params.slug)

    if (!customer) {
        return { title: 'Profile Not Found | TapOnce' }
    }

    const description = customer.tagline || customer.jobTitle
        ? `${customer.tagline || customer.jobTitle}${customer.company ? ` at ${customer.company}` : ''}`
        : customer.bio?.slice(0, 120) || 'Professional profile on TapOnce'

    return {
        title: `${customer.fullName} | TapOnce`,
        description,
        openGraph: {
            title: customer.fullName,
            description,
            images: customer.avatarUrl ? [customer.avatarUrl] : [],
            type: 'profile'
        },
        twitter: {
            card: 'summary',
            title: customer.fullName,
            description
        }
    }
}

export default async function PublicProfilePage({ params }: PageProps) {
    const customer = await getCustomerBySlug(params.slug)

    if (!customer || customer.status !== 'active') {
        notFound()
    }

    const profile = customerToProfile(customer)

    return <PremiumPublicProfile profile={profile} slug={params.slug} />
}
