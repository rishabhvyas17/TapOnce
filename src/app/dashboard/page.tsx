/**
 * @file Customer Dashboard Home
 * @description Welcome screen with quick actions
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.5
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Copy,
    CheckCircle,
    Edit,
    Eye,
    Download,
    ExternalLink,
    Calendar,
    RefreshCw
} from 'lucide-react'
import { getCustomerByProfileId, Customer } from '@/lib/services/customers'
import { createClient } from '@/lib/supabase/client'

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

export default function CustomerDashboardHome() {
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [copied, setCopied] = useState(false)

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

    const profileUrl = customer ? `https://taponce.in/${customer.slug}` : ''

    const handleCopyUrl = () => {
        if (profileUrl) {
            navigator.clipboard.writeText(profileUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading your dashboard...</div>
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
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Hi {customer.fullName}!</h1>
                        <p className="text-white/80">Your card is active and ready to share.</p>

                        {/* Profile URL */}
                        <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-lg p-3 max-w-md">
                            <span className="text-sm truncate flex-1">{profileUrl}</span>
                            <button
                                onClick={handleCopyUrl}
                                className="p-2 hover:bg-white/10 rounded transition-colors"
                                title="Copy URL"
                            >
                                {copied ? (
                                    <CheckCircle className="w-5 h-5 text-green-300" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                            <a
                                href={`/${customer.slug}`}
                                target="_blank"
                                className="p-2 hover:bg-white/10 rounded transition-colors"
                                title="Open in new tab"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <Badge className={customer.status === 'active' ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                        {customer.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {customer.status === 'active' ? 'Active' : customer.status}
                    </Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Profile Created</span>
                    </div>
                    <p className="text-xl font-bold">{formatDate(customer.createdAt)}</p>
                </div>

                <div className="bg-white rounded-xl border p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <RefreshCw className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Last Profile Update</span>
                    </div>
                    <p className="text-xl font-bold">{formatDate(customer.updatedAt)}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href="/dashboard/profile">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2" size="lg">
                            <Edit className="w-6 h-6 text-blue-500" />
                            <span>Edit Profile</span>
                        </Button>
                    </a>
                    <a href="/dashboard/preview">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2" size="lg">
                            <Eye className="w-6 h-6 text-purple-500" />
                            <span>Preview Public Page</span>
                        </Button>
                    </a>
                    <a href="/dashboard/download">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2" size="lg">
                            <Download className="w-6 h-6 text-green-500" />
                            <span>Download Portfolio</span>
                        </Button>
                    </a>
                </div>
            </div>

            {/* Help Section */}
            <div className="bg-gray-50 rounded-xl border p-6 text-center">
                <p className="text-muted-foreground mb-2">Need to change your password?</p>
                <p className="text-sm">
                    Contact admin via WhatsApp or email for password reset assistance.
                </p>
            </div>
        </div>
    )
}
