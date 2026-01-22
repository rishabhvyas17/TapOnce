/**
 * @file Public Tap View Page
 * @description Ultra-fast public profile page accessed via NFC tap
 * 
 * CRITICAL REQUIREMENTS:
 * - Load time <3s on 3G, <1.5s on 4G
 * - Minimal JavaScript bundle
 * - Image optimization (WebP, <100KB)
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicProfileClient from './PublicProfileClient'
import { Profile, Profession } from '@/components/public-profile/types'
import { getCustomerBySlug } from '@/lib/services/customers'
import { Customer } from '@/types/customer'

interface PageProps {
    params: { slug: string }
}

// Transform Customer to Profile type
function customerToProfile(customer: Customer): Profile {
    return {
        fullName: customer.fullName,
        jobTitle: customer.jobTitle || '',
        companyName: customer.company,
        bio: customer.bio,
        photo: customer.avatarUrl,
        phone: customer.phone,
        email: customer.email,
        whatsapp: customer.whatsapp,
        linkedIn: customer.linkedinUrl,
        instagram: customer.instagramUrl,
        twitter: customer.twitterUrl,
        facebook: customer.facebookUrl,
        website: customer.websiteUrl,
        profession: 'other' as Profession,
        status: customer.status === 'active' ? 'active' : 'inactive'
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const customer = await getCustomerBySlug(params.slug)

    if (!customer) {
        return { title: 'Profile Not Found | TapOnce' }
    }

    return {
        title: `${customer.fullName} | TapOnce`,
        description: `${customer.jobTitle || ''} at ${customer.company || 'TapOnce'}. ${customer.bio?.slice(0, 100) || ''}`,
        openGraph: {
            title: customer.fullName,
            description: `${customer.jobTitle || ''} at ${customer.company || 'TapOnce'}`,
            images: customer.avatarUrl ? [customer.avatarUrl] : [],
        }
    }
}

export default async function PublicProfilePage({ params }: PageProps) {
    const customer = await getCustomerBySlug(params.slug)

    if (!customer || customer.status !== 'active') {
        notFound()
    }

    const profile = customerToProfile(customer)

    return <PublicProfileClient profile={profile} slug={params.slug} />
}
