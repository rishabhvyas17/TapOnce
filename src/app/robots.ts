import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://taponce.in'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/agent/', '/dashboard/', '/api/', '/login', '/logout'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
