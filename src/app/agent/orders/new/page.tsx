/**
 * @file Order Submission Form
 * @description Form for agents to submit new card orders
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.2
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft,
    AlertTriangle,
    CheckCircle,
    Calculator,
    CreditCard,
    User,
    Phone,
    Mail,
    Building,
    FileText,
    Image as ImageIcon
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { getCardDesigns } from '@/lib/services/catalog'
import { getAgentByProfileId, Agent } from '@/lib/services/agents'
import { createOrder } from '@/lib/services/orders'
import { createClient } from '@/lib/supabase/client'
import { CardDesign } from '@/types/card-design'

const BASE_COMMISSION = 100 // ₹100 base commission per card

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export default function SubmitOrderPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [agent, setAgent] = useState<Agent | null>(null)
    const [cardDesigns, setCardDesigns] = useState<CardDesign[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showBelowMspModal, setShowBelowMspModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [newOrderNumber, setNewOrderNumber] = useState<number | null>(null)

    // Form state
    const [customerName, setCustomerName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [selectedCardId, setSelectedCardId] = useState('')
    const [line1Text, setLine1Text] = useState('')
    const [line2Text, setLine2Text] = useState('')
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'advance_paid' | 'paid' | 'cod'>('cod')
    const [specialInstructions, setSpecialInstructions] = useState('')

    // Fetch agent and card designs
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const agentData = await getAgentByProfileId(user.id)
                setAgent(agentData)

                const { designs } = await getCardDesigns({ status: 'active' })
                setCardDesigns(designs)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    // Get selected card design
    const selectedCard = cardDesigns.find(c => c.id === selectedCardId)
    const msp = selectedCard?.baseMsp || 0

    // Commission calculation
    const commission = useMemo(() => {
        if (!sellingPrice || !msp) return { base: 0, bonus: 0, total: 0 }

        const base = BASE_COMMISSION
        const bonus = sellingPrice >= msp ? Math.floor((sellingPrice - msp) * 0.5) : 0
        const total = sellingPrice >= msp ? base + bonus : 0

        return { base, bonus, total }
    }, [sellingPrice, msp])

    const isBelowMsp = sellingPrice > 0 && sellingPrice < msp
    const isPriceValid = sellingPrice >= msp

    // Handle photo upload
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Please upload a JPG or PNG image')
                return
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Image must be less than 5MB')
                return
            }

            setPhotoFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Validate form
    const isFormValid = useMemo(() => {
        return (
            customerName.trim() &&
            companyName.trim() &&
            phone.trim() &&
            email.trim() &&
            selectedCardId &&
            line1Text.trim() &&
            photoFile &&
            sellingPrice > 0 &&
            agent
        )
    }, [customerName, companyName, phone, email, selectedCardId, line1Text, photoFile, sellingPrice, agent])

    // Handle form submission
    const handleSubmit = async (forceSubmit = false) => {
        if (!isFormValid || !agent || !selectedCard) return

        // Check for below-MSP price
        if (isBelowMsp && !forceSubmit) {
            setShowBelowMspModal(true)
            return
        }

        setIsSubmitting(true)

        try {
            // TODO: Upload photo to Supabase Storage and get URL
            const photoUrl = '' // For now, skip photo upload

            const result = await createOrder({
                customerName: customerName.trim(),
                customerCompany: companyName.trim(),
                customerPhone: phone.trim(),
                customerEmail: email.trim(),
                customerWhatsapp: whatsapp.trim() || phone.trim(),
                customerPhotoUrl: photoUrl,
                cardDesignId: selectedCardId,
                line1Text: line1Text.trim(),
                line2Text: line2Text.trim(),
                mspAtOrder: msp,
                salePrice: sellingPrice,
                commissionAmount: commission.total,
                paymentStatus: paymentStatus,
                isBelowMsp: isBelowMsp,
                specialInstructions: specialInstructions.trim(),
                agentId: agent.id
            })

            if (result.success) {
                setNewOrderNumber(result.orderNumber || 0)
                setShowSuccessModal(true)
            } else {
                alert('Failed to submit order: ' + (result.error || 'Unknown error'))
            }
        } catch (error) {
            alert('Failed to submit order. Please try again.')
        } finally {
            setIsSubmitting(false)
            setShowBelowMspModal(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        )
    }

    if (!agent) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Unable to load agent data</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Submit New Order</h1>
                    <p className="text-muted-foreground">Fill in customer details and card selection</p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Customer & Card Details */}
                <div className="space-y-6">
                    {/* Customer Details Section */}
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" />
                            Customer Details
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="customerName">Full Name *</Label>
                                <Input
                                    id="customerName"
                                    placeholder="e.g., Rahul Verma"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name *</Label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="companyName"
                                        placeholder="e.g., Tech Solutions Pvt Ltd"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="9876543210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="rahul@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                                <Input
                                    id="whatsapp"
                                    type="tel"
                                    placeholder="Same as phone if empty"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card Selection Section */}
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-purple-500" />
                            Card Selection
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Card Design *</Label>
                                <Select value={selectedCardId} onValueChange={setSelectedCardId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a card design" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cardDesigns.map((card) => (
                                            <SelectItem key={card.id} value={card.id}>
                                                <div className="flex items-center gap-3">
                                                    <span>{card.name}</span>
                                                    <Badge variant="secondary">MSP: {formatCurrency(card.baseMsp)}</Badge>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Selected Card Preview */}
                            {selectedCard && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="font-medium">{selectedCard.name}</p>
                                    <p className="text-sm text-muted-foreground">{selectedCard.description}</p>
                                    <p className="mt-2 font-bold text-lg text-green-600">
                                        Your MSP: {formatCurrency(selectedCard.baseMsp)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Customization & Pricing */}
                <div className="space-y-6">
                    {/* Card Customization Section */}
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-orange-500" />
                            Card Customization
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="line1">Line 1 Text * (max 30 chars)</Label>
                                <Input
                                    id="line1"
                                    placeholder="e.g., RAHUL VERMA"
                                    value={line1Text}
                                    onChange={(e) => setLine1Text(e.target.value.slice(0, 30))}
                                    maxLength={30}
                                />
                                <p className="text-xs text-muted-foreground text-right">{line1Text.length}/30</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="line2">Line 2 Text (max 30 chars)</Label>
                                <Input
                                    id="line2"
                                    placeholder="e.g., Founder & CEO"
                                    value={line2Text}
                                    onChange={(e) => setLine2Text(e.target.value.slice(0, 30))}
                                    maxLength={30}
                                />
                                <p className="text-xs text-muted-foreground text-right">{line2Text.length}/30</p>
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-2">
                                <Label>Customer Photo * (800x800px min)</Label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                    {photoPreview ? (
                                        <div className="space-y-2">
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-lg mx-auto"
                                            />
                                            <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                                                <CheckCircle className="w-4 h-4" />
                                                Photo uploaded
                                            </p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setPhotoFile(null)
                                                    setPhotoPreview(null)
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer block">
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png"
                                                onChange={handlePhotoChange}
                                                className="hidden"
                                            />
                                            <div className="py-6">
                                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-muted-foreground">
                                                    Click to upload JPG/PNG (max 5MB)
                                                </p>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Commission Section */}
                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-green-500" />
                            Pricing & Commission
                        </h2>

                        <div className="space-y-4">
                            {selectedCard && (
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        Your MSP for this card: <span className="font-bold">{formatCurrency(msp)}</span>
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="sellingPrice">Final Selling Price (₹) *</Label>
                                <Input
                                    id="sellingPrice"
                                    type="number"
                                    placeholder="Enter price"
                                    value={sellingPrice || ''}
                                    onChange={(e) => setSellingPrice(parseInt(e.target.value) || 0)}
                                    className={isBelowMsp ? 'border-yellow-500' : ''}
                                />
                                {isBelowMsp && (
                                    <p className="text-sm text-yellow-600 flex items-center gap-1">
                                        <AlertTriangle className="w-4 h-4" />
                                        Price below MSP requires admin approval
                                    </p>
                                )}
                            </div>

                            {/* Commission Calculator */}
                            {sellingPrice > 0 && selectedCard && (
                                <div className="p-4 bg-green-50 rounded-lg space-y-2">
                                    <p className="font-medium text-green-800">Your Commission:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Base Commission:</span>
                                            <span>{formatCurrency(commission.base)}</span>
                                        </div>
                                        {commission.bonus > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Negotiation Bonus (50%):</span>
                                                <span>+{formatCurrency(commission.bonus)}</span>
                                            </div>
                                        )}
                                        <hr className="border-green-200" />
                                        <div className="flex justify-between font-bold text-lg text-green-700">
                                            <span>Total Commission:</span>
                                            <span>{formatCurrency(commission.total)}</span>
                                        </div>
                                        {!isPriceValid && (
                                            <p className="text-xs text-yellow-600 mt-2">
                                                * Commission only applies if admin approves below-MSP price
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Payment Status *</Label>
                                <Select value={paymentStatus} onValueChange={(v: any) => setPaymentStatus(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="paid">Paid in Full</SelectItem>
                                        <SelectItem value="advance_paid">Advance Paid</SelectItem>
                                        <SelectItem value="cod">COD (Cash on Delivery)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instructions">Special Instructions (optional)</Label>
                                <Textarea
                                    id="instructions"
                                    placeholder="Any special requests..."
                                    value={specialInstructions}
                                    onChange={(e) => setSpecialInstructions(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        className="w-full h-14 text-lg"
                        size="lg"
                        disabled={!isFormValid || isSubmitting}
                        onClick={() => handleSubmit()}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </Button>
                </div>
            </div>

            {/* Below MSP Warning Modal */}
            <Dialog open={showBelowMspModal} onOpenChange={setShowBelowMspModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-yellow-600">
                            <AlertTriangle className="w-5 h-5" />
                            Price Below MSP
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="mb-4">
                            Your MSP for <strong>{selectedCard?.name}</strong> is <strong>{formatCurrency(msp)}</strong>.
                        </p>
                        <p className="mb-4">
                            Selling at <strong>{formatCurrency(sellingPrice)}</strong> requires admin approval.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Commission will be calculated ONLY if the order is approved.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowBelowMspModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => handleSubmit(true)} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit for Special Approval'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            Order Submitted Successfully!
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 text-center">
                        <p className="text-4xl font-bold text-green-600 mb-2">#{newOrderNumber}</p>
                        <p className="text-muted-foreground">
                            Your order has been submitted and is pending admin approval.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => router.push('/agent/orders')}>
                            View My Orders
                        </Button>
                        <Button onClick={() => {
                            setShowSuccessModal(false)
                            router.push('/agent')
                        }}>
                            Back to Dashboard
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
