/**
 * @file Root Layout
 * @description Root layout for the entire application
 * 
 * @owner All Developers
 * @shared Core layout wrapping all pages
 * 
 * This layout:
 * - Sets up fonts
 * - Includes global CSS
 * - Wraps with providers (auth, theme, etc.)
 */

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'TapOnce - Digital Business Cards',
        template: '%s | TapOnce',
    },
    description:
        'Share your professional profile with a tap. NFC-powered digital business cards for modern professionals.',
    keywords: [
        'NFC business card',
        'digital business card',
        'smart card',
        'networking',
        'professional profile',
    ],
    authors: [{ name: 'TapOnce' }],
    creator: 'TapOnce',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'TapOnce',
        title: 'TapOnce - Digital Business Cards',
        description: 'Share your professional profile with a tap.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TapOnce - Digital Business Cards',
        description: 'Share your professional profile with a tap.',
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
}

export const viewport: Viewport = {
    themeColor: '#3b82f6',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
