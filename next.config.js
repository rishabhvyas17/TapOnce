/**
 * @file Next.js Configuration
 * @description Configuration for Next.js 14 with App Router
 * 
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode for development
    reactStrictMode: true,

    // Image optimization configuration
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
        // Use WebP format for optimized images
        formats: ['image/webp'],
    },

    // Experimental features
    experimental: {
        // Enable server actions
        serverActions: {
            bodySizeLimit: '5mb', // For image uploads
        },
    },

    // Headers for security and caching
    async headers() {
        return [
            {
                // Apply to public tap view pages for maximum caching
                source: '/:slug((?!admin|agent|dashboard|api|_next).*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=3600, stale-while-revalidate=86400',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
