/**
 * @file Profile Editor
 * @description Edit all public profile information
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.2
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    User,
    Phone,
    Mail,
    Building,
    Globe,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    Link,
    Camera,
    CheckCircle,
    Eye
} from 'lucide-react'
import { getCustomerByProfileId, updateCustomerProfile, Customer } from '@/lib/services/customers'
import { createClient } from '@/lib/supabase/client'

export default function ProfileEditorPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Form state
    const [photo, setPhoto] = useState('')
    const [fullName, setFullName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [website, setWebsite] = useState('')

    // Fetch customer data
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const customerData = await getCustomerByProfileId(user.id)
                if (customerData) {
                    setCustomer(customerData)
                    // Populate form fields
                    setPhoto(customerData.avatarUrl || '')
                    setFullName(customerData.fullName || '')
                    setJobTitle(customerData.jobTitle || '')
                    setCompanyName(customerData.company || '')
                    setBio(customerData.bio || '')
                    setPhone(customerData.phone || '')
                    setEmail(customerData.email || '')
                    setWhatsapp(customerData.whatsapp || '')
                    setLinkedIn(customerData.linkedinUrl || '')
                    setInstagram(customerData.instagramUrl || '')
                    setFacebook(customerData.facebookUrl || '')
                    setTwitter(customerData.twitterUrl || '')
                    setWebsite(customerData.websiteUrl || '')
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhoto(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = async () => {
        if (!customer) return

        setIsSaving(true)

        const result = await updateCustomerProfile(customer.id, {
            fullName,
            jobTitle,
            company: companyName,
            bio,
            phone,
            whatsapp,
            linkedinUrl: linkedIn,
            instagramUrl: instagram,
            facebookUrl: facebook,
            twitterUrl: twitter,
            websiteUrl: website
        })

        setIsSaving(false)

        if (result.success) {
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
        } else {
            alert('Failed to save: ' + (result.error || 'Unknown error'))
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading your profile...</div>
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <p className="text-muted-foreground">Update your public profile information</p>
                </div>
                <div className="flex gap-2">
                    <a href="/dashboard/preview">
                        <Button variant="outline" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Preview
                        </Button>
                    </a>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                        {showSuccess ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Saved!
                            </>
                        ) : (
                            isSaving ? 'Saving...' : 'Save Changes'
                        )}
                    </Button>
                </div>
            </div>

            {showSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Profile updated successfully! Changes are now live.
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Photo & Personal Info */}
                <div className="space-y-6">
                    {/* Profile Photo */}
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="font-semibold mb-4">Profile Photo</h2>
                        <div className="text-center">
                            <div className="relative inline-block">
                                <img
                                    src={photo || 'https://via.placeholder.com/128'}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                    <Camera className="w-4 h-4 text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                Min 800×800px • Max 5MB • JPG, PNG
                            </p>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-500" />
                            Personal Information
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Job Title / Headline</Label>
                                <Input
                                    id="jobTitle"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="e.g., Founder & CEO"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="companyName"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Your company"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio / About Me (max 500 chars)</Label>
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value.slice(0, 500))}
                                    placeholder="Tell people about yourself..."
                                    rows={4}
                                />
                                <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column - Contact Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-500" />
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="pl-10"
                                        disabled
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                                <Input
                                    id="whatsapp"
                                    type="tel"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    placeholder="Same as phone if empty"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Social Links */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-500" />
                            Social Links
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="linkedin"
                                        value={linkedIn}
                                        onChange={(e) => setLinkedIn(e.target.value)}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram</Label>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="instagram"
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                        placeholder="https://instagram.com/yourhandle"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook</Label>
                                <div className="relative">
                                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="facebook"
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        placeholder="https://facebook.com/yourpage"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter / X</Label>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="twitter"
                                        value={twitter}
                                        onChange={(e) => setTwitter(e.target.value)}
                                        placeholder="https://twitter.com/yourhandle"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website / Portfolio</Label>
                                <div className="relative">
                                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder="https://yourwebsite.com"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
