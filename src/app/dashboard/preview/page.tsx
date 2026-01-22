/**
 * @file Preview Mode
 * @description See how profile looks before saving
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.3
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
    Phone,
    Mail,
    MessageCircle,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    Globe,
    Download,
    ArrowLeft,
    Share2
} from 'lucide-react'
import { getCustomerByProfileId, Customer } from '@/lib/services/customers'
import { createClient } from '@/lib/supabase/client'

export default function PreviewPage() {
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<Customer | null>(null)

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

    const socialLinks = useMemo(() => {
        if (!customer) return []
        return [
            { url: customer.linkedinUrl, icon: Linkedin, label: 'LinkedIn', color: 'bg-blue-600' },
            { url: customer.instagramUrl, icon: Instagram, label: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
            { url: customer.twitterUrl, icon: Twitter, label: 'Twitter', color: 'bg-sky-500' },
            { url: customer.websiteUrl, icon: Globe, label: 'Website', color: 'bg-gray-700' },
        ].filter(link => link.url)
    }, [customer])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading preview...</div>
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
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <a href="/dashboard/profile">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Editor
                    </Button>
                </a>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                    <a href="/dashboard/download">
                        <Button className="gap-2">
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </a>
                </div>
            </div>

            {/* Preview Container */}
            <div className="flex justify-center">
                <div className="relative">
                    {/* Phone Frame */}
                    <div className="bg-gray-800 rounded-[40px] p-3 shadow-2xl">
                        <div className="bg-black rounded-[32px] p-1">
                            {/* Notch */}
                            <div className="bg-black w-24 h-6 mx-auto rounded-b-xl relative z-10"></div>

                            {/* Screen */}
                            <div className="bg-white rounded-[28px] w-[320px] h-[640px] overflow-y-auto">
                                {/* Preview Content */}
                                <div className="p-6 text-center">
                                    {/* Profile Photo */}
                                    <img
                                        src={customer.avatarUrl || 'https://via.placeholder.com/112'}
                                        alt={customer.fullName}
                                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                                    />

                                    {/* Name & Title */}
                                    <h1 className="text-xl font-bold mt-4">{customer.fullName}</h1>
                                    <p className="text-gray-600">{customer.jobTitle || ''}</p>
                                    <p className="text-gray-500 text-sm">{customer.company || ''}</p>

                                    {/* Bio */}
                                    {customer.bio && (
                                        <p className="text-gray-600 text-sm mt-4 px-2">{customer.bio}</p>
                                    )}

                                    {/* Save Contact Button */}
                                    <Button className="w-full mt-6 gap-2">
                                        <Download className="w-4 h-4" />
                                        Save Contact
                                    </Button>

                                    {/* Quick Actions */}
                                    <div className="flex justify-center gap-3 mt-4">
                                        <a href={`tel:${customer.phone}`} className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                                            <Phone className="w-5 h-5" />
                                        </a>
                                        <a href={`mailto:${customer.email}`} className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                        <a href={`https://wa.me/${(customer.whatsapp || customer.phone)?.replace(/\D/g, '')}`} className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                                            <MessageCircle className="w-5 h-5" />
                                        </a>
                                    </div>

                                    {/* Social Links */}
                                    {socialLinks.length > 0 && (
                                        <div className="space-y-3 mt-6">
                                            {socialLinks.map((social, index) => (
                                                <a
                                                    key={index}
                                                    href={social.url}
                                                    target="_blank"
                                                    className={`flex items-center gap-3 p-3 ${social.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                                                >
                                                    <social.icon className="w-5 h-5" />
                                                    <span>{social.label}</span>
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <p className="text-xs text-gray-400 mt-8">
                                        Powered by TapOnce
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
