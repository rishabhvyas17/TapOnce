/**
 * @file Download Portfolio
 * @description Export profile as PDF or image for offline sharing
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.6
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
    FileText,
    Image as ImageIcon,
    Download,
    CheckCircle
} from 'lucide-react'
import { getCustomerByProfileId, Customer } from '@/lib/services/customers'
import { createClient } from '@/lib/supabase/client'

export default function DownloadPage() {
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [downloading, setDownloading] = useState<string | null>(null)
    const [downloaded, setDownloaded] = useState<string[]>([])

    // Fetch customer data
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const customerData = await getCustomerByProfileId(user.id)
                setCustomer(customerData)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleDownload = async (type: 'pdf' | 'square' | 'landscape') => {
        setDownloading(type)
        // Simulate download - in production would generate actual files
        await new Promise(resolve => setTimeout(resolve, 1500))
        setDownloading(null)
        setDownloaded(prev => [...prev, type])
    }

    const downloadOptions = useMemo(() => {
        const fullName = customer?.fullName || 'Profile'
        return [
            {
                id: 'pdf',
                title: 'Download as PDF',
                description: 'Formatted digital business card with all your contact info and social links.',
                filename: `${fullName.replace(/\s+/g, '_')}_SmartCard_Portfolio.pdf`,
                icon: FileText,
                color: 'text-red-500',
                bgColor: 'bg-red-50'
            },
            {
                id: 'square',
                title: 'Square Image (1080×1080)',
                description: 'Perfect for Instagram, WhatsApp profile, and social media posts.',
                filename: `${fullName.replace(/\s+/g, '_')}_SmartCard_Square.png`,
                icon: ImageIcon,
                color: 'text-purple-500',
                bgColor: 'bg-purple-50'
            },
            {
                id: 'landscape',
                title: 'Landscape Image (1200×630)',
                description: 'Ideal for LinkedIn posts, email signatures, and website banners.',
                filename: `${fullName.replace(/\s+/g, '_')}_SmartCard_Landscape.png`,
                icon: ImageIcon,
                color: 'text-blue-500',
                bgColor: 'bg-blue-50'
            }
        ]
    }, [customer])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Unable to load your profile</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Download Portfolio</h1>
                <p className="text-muted-foreground">Export your profile for offline sharing</p>
            </div>

            {/* Download Options */}
            <div className="space-y-4">
                {downloadOptions.map((option) => {
                    const isDownloading = downloading === option.id
                    const isDownloaded = downloaded.includes(option.id)

                    return (
                        <div
                            key={option.id}
                            className="bg-white rounded-xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${option.bgColor}`}>
                                    <option.icon className={`w-6 h-6 ${option.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{option.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                                    <p className="text-xs text-gray-400 mt-2 font-mono">{option.filename}</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => handleDownload(option.id as 'pdf' | 'square' | 'landscape')}
                                disabled={isDownloading}
                                variant={isDownloaded ? 'outline' : 'default'}
                                className="gap-2 min-w-[140px]"
                            >
                                {isDownloading ? (
                                    'Generating...'
                                ) : isDownloaded ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Downloaded
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Download
                                    </>
                                )}
                            </Button>
                        </div>
                    )
                })}
            </div>

            {/* Use Cases */}
            <div className="bg-gray-50 rounded-xl border p-6">
                <h3 className="font-semibold mb-4">Great for:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Email signature attachment</li>
                    <li>• LinkedIn posts and profile banner</li>
                    <li>• Print on traditional paper cards as backup</li>
                    <li>• Share via WhatsApp as image</li>
                    <li>• Add to presentations and portfolios</li>
                </ul>
            </div>
        </div>
    )
}
