"use client"

import React from "react"
import {
    ProfileHero,
    QuickActions,
    AboutSection,
    SocialLinks,
    ActionCards,
    StickyContactCTA,
    ProfileFooter,
    Profile
} from "@/components/public-profile"

interface PublicProfileClientProps {
    profile: Profile
    slug: string
}

export default function PublicProfileClient({ profile, slug }: PublicProfileClientProps) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Hero Section */}
            <ProfileHero profile={profile} />

            {/* Quick Contact Actions */}
            <QuickActions profile={profile} />

            {/* About/Bio Section */}
            <AboutSection bio={profile.bio} />

            {/* Social Links */}
            <SocialLinks profile={profile} />

            {/* Profession-specific Action Cards */}
            <ActionCards profile={profile} />

            {/* Footer */}
            <ProfileFooter />

            {/* Sticky Save Contact CTA */}
            <StickyContactCTA profile={profile} />
        </div>
    )
}
