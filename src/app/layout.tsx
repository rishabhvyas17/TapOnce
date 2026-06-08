/**
 * @file Root Layout
 * @description Root layout — premium fonts, comprehensive SEO, structured data
 */

import type { Metadata, Viewport } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
})

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://taponce.in'

export const metadata: Metadata = {
    title: {
        default: 'TapOnce — Premium NFC Business Cards India | Digital Visiting Card',
        template: '%s | TapOnce',
    },
    description:
        'India\'s #1 premium NFC smart business card. One tap shares your portfolio, contact, social media & appointment booking. Metal & PVC cards from ₹1,000. Free shipping. No app needed. Used by 10,000+ doctors, lawyers, architects & founders.',
    keywords: [
        'NFC business card',
        'NFC business card India',
        'digital business card India',
        'smart visiting card',
        'NFC card price India',
        'digital visiting card',
        'contactless business card',
        'NFC card for doctors',
        'NFC card for lawyers',
        'NFC card for real estate agents',
        'NFC card for architects',
        'NFC card for freelancers',
        'metal business card India',
        'premium business card',
        'tap card India',
        'smart card India',
        'business card online India',
        'NFC visiting card',
        'digital card for professionals',
        'eco-friendly business card',
        'reusable business card',
        'smart networking card',
        'QR business card India',
        'buy NFC card online',
        'best digital business card India',
        'NFC card with COD',
        'metal visiting card',
        'NFC card for startups',
        'NFC card for sales teams',
        'digital portfolio card',
        'NFC card free shipping',
        'NFC card Mumbai',
        'NFC card Delhi',
        'NFC card Bangalore',
        'TapOnce',
        'tap once card',
        'smart NFC card for business',
    ],
    authors: [{ name: 'TapOnce' }],
    creator: 'TapOnce',
    publisher: 'TapOnce',
    metadataBase: new URL(BASE_URL),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'TapOnce',
        title: 'TapOnce — Premium NFC Business Cards | One Tap. Every Connection.',
        description: 'India\'s premium NFC smart business cards. Share your portfolio, contact & social media with a single tap. Metal & PVC cards from ₹1,000. Free shipping.',
        url: BASE_URL,
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TapOnce — Premium NFC Business Cards India',
        description: 'One tap shares your portfolio, contact & socials. Metal & PVC cards from ₹1,000. Free shipping India-wide.',
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
    themeColor: '#0A0A0A',
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
                {/* Organization Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'TapOnce',
                            url: BASE_URL,
                            logo: `${BASE_URL}/images/logo.png`,
                            description: 'India\'s premium NFC smart business cards for modern professionals. Share your portfolio, contact and social media with a single tap.',
                            sameAs: [
                                'https://instagram.com/taponce',
                                'https://twitter.com/taponce',
                                'https://linkedin.com/company/taponce',
                            ],
                            contactPoint: {
                                '@type': 'ContactPoint',
                                contactType: 'customer service',
                                email: 'hello@taponce.in',
                                availableLanguage: ['English', 'Hindi'],
                            },
                            address: {
                                '@type': 'PostalAddress',
                                addressCountry: 'IN',
                            },
                        }),
                    }}
                />
                {/* WebSite Schema with SearchAction */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'TapOnce',
                            url: BASE_URL,
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: `${BASE_URL}/search?q={search_term_string}`,
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />
                {/* Product Schema — Metal Card */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: 'TapOnce Premium Metal NFC Business Card',
                            description: 'Laser-engraved matte black stainless steel NFC business card. One tap shares your digital portfolio, contact, and social media.',
                            brand: { '@type': 'Brand', name: 'TapOnce' },
                            offers: {
                                '@type': 'Offer',
                                price: '1500',
                                priceCurrency: 'INR',
                                availability: 'https://schema.org/InStock',
                                url: `${BASE_URL}/order`,
                                shippingDetails: {
                                    '@type': 'OfferShippingDetails',
                                    shippingRate: {
                                        '@type': 'MonetaryAmount',
                                        value: '0',
                                        currency: 'INR',
                                    },
                                    deliveryTime: {
                                        '@type': 'ShippingDeliveryTime',
                                        businessDays: {
                                            '@type': 'QuantitativeValue',
                                            minValue: 3,
                                            maxValue: 5,
                                        },
                                    },
                                    shippingDestination: {
                                        '@type': 'DefinedRegion',
                                        addressCountry: 'IN',
                                    },
                                },
                            },
                            aggregateRating: {
                                '@type': 'AggregateRating',
                                ratingValue: '4.9',
                                reviewCount: '500',
                                bestRating: '5',
                            },
                        }),
                    }}
                />
                {/* BreadcrumbList Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                {
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Home',
                                    item: BASE_URL,
                                },
                            ],
                        }),
                    }}
                />
            </head>
            <body className={`${outfit.variable} ${dmSans.variable} font-sans`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
