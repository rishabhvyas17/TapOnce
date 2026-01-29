/**
 * @file Customer Type Definitions
 * @description Types for customer profiles and public tap view
 * 
 * @owner Dev 3 (primary), Dev 1 (for admin customer management)
 * @shared Used by Admin Dashboard, Customer Dashboard, and Public Tap View
 * 
 * @see docs/DATABASE_SCHEMA.md - customers table
 * @see docs/API_CONTRACTS.md - Customers API
 * @see ProductRequirementsDocument.txt Section 6.3 & 6.4 for customer requirements
 */

/**
 * Customer account status
 */
export type CustomerStatus = 'active' | 'pending' | 'suspended'

/**
 * Custom link for customer profile
 */
export interface CustomLink {
    label: string
    url: string
}

/**
 * Full customer profile (for dashboard/admin)
 */
export interface Customer {
    id: string
    profileId: string

    // Basic info
    slug: string
    fullName: string
    company?: string
    jobTitle?: string
    tagline?: string
    bio?: string
    avatarUrl?: string
    location?: string

    // Contact
    phone: string
    email: string
    whatsapp?: string

    // Social links
    linkedinUrl?: string
    instagramUrl?: string
    facebookUrl?: string
    twitterUrl?: string
    websiteUrl?: string
    customLinks: CustomLink[]

    // Profile customization
    profession?: string
    themePreset?: string
    accentColor?: string
    ctaText?: string
    ctaUrl?: string

    // Status
    status: CustomerStatus

    // Timestamps
    createdAt: string
    updatedAt: string
}

/**
 * Public profile data (for tap view page)
 * Subset of Customer - only what's shown publicly
 */
export interface PublicProfile {
    fullName: string
    jobTitle?: string
    company?: string
    bio?: string
    avatarUrl?: string
    phone: string
    email: string
    whatsapp?: string
    linkedinUrl?: string
    instagramUrl?: string
    facebookUrl?: string
    twitterUrl?: string
    websiteUrl?: string
    customLinks: CustomLink[]
}

/**
 * Customer profile update payload
 */
export interface UpdateCustomerPayload {
    fullName?: string
    jobTitle?: string
    company?: string
    tagline?: string
    bio?: string
    avatarUrl?: string
    location?: string
    phone?: string
    email?: string
    whatsapp?: string
    linkedinUrl?: string
    instagramUrl?: string
    facebookUrl?: string
    twitterUrl?: string
    websiteUrl?: string
    customLinks?: CustomLink[]
    profession?: string
    themePreset?: string
    accentColor?: string
    ctaText?: string
    ctaUrl?: string
}

/**
 * Customer list query parameters
 */
export interface CustomerListParams {
    status?: CustomerStatus
    agentId?: string
    search?: string
    page?: number
    limit?: number
}

/**
 * Customer list response
 */
export interface CustomerListResponse {
    customers: Customer[]
    total: number
    page: number
    limit: number
}

/**
 * vCard data structure for .vcf generation
 */
export interface VCardData {
    fullName: string
    jobTitle?: string
    company?: string
    phone: string
    email: string
    whatsapp?: string
    websiteUrl?: string
    linkedinUrl?: string
    instagramUrl?: string
    bio?: string
}
