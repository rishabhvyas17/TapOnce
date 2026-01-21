/**
 * @file Public Tap View Page
 * @description Ultra-fast public profile page accessed via NFC tap
 * 
 * CRITICAL REQUIREMENTS:
 * - Load time <3s on 3G, <1.5s on 4G
 * - Static generation (ISR) for instant loading
 * - Minimal JavaScript bundle
 * - Image optimization (WebP, <100KB)
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicProfileClient from './PublicProfileClient'
import { Profile, Profession } from '@/components/public-profile/types'

// Enhanced mock profile data with profession types
const mockProfiles: Record<string, Profile> = {
    'rahul-verma': {
        fullName: 'Rahul Verma',
        jobTitle: 'Founder & CEO',
        companyName: 'Tech Solutions Pvt Ltd',
        profession: 'ceo',
        bio: 'Passionate entrepreneur building innovative tech solutions for the modern world. 10+ years of experience in software development and business strategy.\n\nBuilding the future of digital networking with TapOnce.',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
        phone: '+919876543210',
        email: 'rahul@techsolutions.com',
        whatsapp: '+919876543210',
        linkedIn: 'https://linkedin.com/in/rahulverma',
        instagram: 'https://instagram.com/rahulverma',
        twitter: 'https://twitter.com/rahulverma',
        website: 'https://rahulverma.com',
        bookingUrl: 'https://calendly.com/rahulverma',
        status: 'active'
    },
    'priya-sharma': {
        fullName: 'Dr. Priya Sharma',
        jobTitle: 'Senior Cardiologist',
        companyName: 'Apollo Hospitals',
        profession: 'doctor',
        bio: 'MBBS, MD (Cardiology), FACC. 15+ years experience in interventional cardiology. Specializing in heart disease prevention and treatment.',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80',
        phone: '+919876543211',
        email: 'priya.sharma@apollo.com',
        whatsapp: '+919876543211',
        linkedIn: 'https://linkedin.com/in/drpriyasharma',
        website: 'https://apollohospitals.com/doctor/priya-sharma',
        bookingUrl: 'https://apollo.practo.com/priya-sharma',
        status: 'active'
    },
    'arjun-patel': {
        fullName: 'Arjun Patel',
        jobTitle: 'UI/UX Designer',
        companyName: 'Freelance',
        profession: 'designer',
        bio: 'Creating beautiful, user-centric digital experiences. Specialized in mobile app design and design systems. Previously at Google and Flipkart.',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80',
        phone: '+919876543212',
        email: 'arjun@designstudio.co',
        whatsapp: '+919876543212',
        linkedIn: 'https://linkedin.com/in/arjunpatel',
        instagram: 'https://instagram.com/arjun.designs',
        twitter: 'https://twitter.com/arjunpatel',
        website: 'https://arjunpatel.design',
        portfolioUrl: 'https://dribbble.com/arjunpatel',
        resumeUrl: 'https://arjunpatel.design/resume.pdf',
        status: 'active'
    },
    'sneha-kapoor': {
        fullName: 'Sneha Kapoor',
        jobTitle: 'Content Creator & Influencer',
        companyName: '500K+ Followers',
        profession: 'influencer',
        bio: '✨ Lifestyle | Fashion | Travel\n📍 Mumbai, India\n🎬 YouTube: 500K+ | Instagram: 300K+\n💌 For collabs: hello@snehakapoor.in',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
        phone: '+919876543213',
        email: 'hello@snehakapoor.in',
        whatsapp: '+919876543213',
        instagram: 'https://instagram.com/snehakapoor',
        youtube: 'https://youtube.com/snehakapoor',
        tiktok: 'https://tiktok.com/@snehakapoor',
        website: 'https://snehakapoor.in',
        mediaKitUrl: 'https://snehakapoor.in/mediakit',
        status: 'active'
    },
    'amit-desai': {
        fullName: 'Amit Desai',
        jobTitle: 'Senior Property Consultant',
        companyName: 'PropFirst Realty',
        profession: 'realtor',
        bio: 'Helping you find your dream home. Specialized in luxury properties across Mumbai, Pune, and Goa. 8+ years in real estate.',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
        phone: '+919876543214',
        email: 'amit@propfirst.in',
        whatsapp: '+919876543214',
        linkedIn: 'https://linkedin.com/in/amitdesairealtor',
        instagram: 'https://instagram.com/amitdesai.realty',
        website: 'https://propfirst.in/amit-desai',
        bookingUrl: 'https://calendly.com/amitdesai-realty',
        status: 'active'
    }
}

interface PageProps {
    params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const profile = mockProfiles[params.slug]

    if (!profile) {
        return { title: 'Profile Not Found | TapOnce' }
    }

    return {
        title: `${profile.fullName} | TapOnce`,
        description: `${profile.jobTitle} at ${profile.companyName}. ${profile.bio?.slice(0, 100)}...`,
        openGraph: {
            title: profile.fullName,
            description: `${profile.jobTitle} at ${profile.companyName}`,
            images: profile.photo ? [profile.photo] : [],
        }
    }
}

// Generate static paths for known profiles
export async function generateStaticParams() {
    return Object.keys(mockProfiles).map((slug) => ({ slug }))
}

export default function PublicProfilePage({ params }: PageProps) {
    const profile = mockProfiles[params.slug]

    if (!profile || profile.status !== 'active') {
        notFound()
    }

    return <PublicProfileClient profile={profile} slug={params.slug} />
}
