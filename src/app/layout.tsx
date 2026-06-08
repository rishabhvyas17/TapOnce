/**
 * @file Root Layout
 * @description Root layout — fonts, SEO, providers
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const display = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
    weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
    title: {
        default: 'TapOnce — Premium NFC Business Cards | Share With a Tap',
        template: '%s | TapOnce',
    },
    description:
        'India\'s premium NFC smart business cards. Share your professional profile, socials & contact with a single tap. No app needed. Metal & PVC cards starting ₹1000.',
    keywords: [
        'NFC business card',
        'digital business card India',
        'smart card',
        'NFC card',
        'professional networking card',
        'contactless business card',
        'metal business card',
        'TapOnce',
        'tap card',
    ],
    authors: [{ name: 'TapOnce' }],
    creator: 'TapOnce',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'TapOnce',
        title: 'TapOnce — Premium NFC Business Cards',
        description: 'Share your professional profile with a single tap. Premium metal & PVC NFC cards for modern professionals.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TapOnce — Premium NFC Business Cards',
        description: 'Share your professional profile with a single tap.',
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export const viewport: Viewport = {
    themeColor: '#FFFFFF',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    colorScheme: 'light',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="light">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'TapOnce',
                            url: process.env.NEXT_PUBLIC_APP_URL || 'https://taponce.in',
                            description: 'Premium NFC smart business cards for modern professionals',
                            contactPoint: {
                                '@type': 'ContactPoint',
                                contactType: 'customer service',
                                email: 'support@taponce.in',
                            },
                        }),
                    }}
                />
            </head>
            <body className={`${inter.variable} ${display.variable} font-sans`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
