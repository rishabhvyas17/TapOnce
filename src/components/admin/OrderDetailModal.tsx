/**
 * @file Order Detail Modal Component
 * @description Modal showing full order details with actions
 * 
 * @owner Dev 1
 * @module admin/orders
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import type { OrderDetail } from '@/types/kanban'
import type { OrderStatus } from '@/types/order'
import { getStatusConfig, getValidTransitions } from '@/config/order-statuses'

interface OrderDetailModalProps {
    order: OrderDetail
    isOpen: boolean
    onClose: () => void
    onStatusChange: (newStatus: OrderStatus, data?: any) => Promise<void>
}

export function OrderDetailModal({
    order,
    isOpen,
    onClose,
    onStatusChange,
}: OrderDetailModalProps) {
    const [loading, setLoading] = useState(false)
    const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '')
    const [adminNotes, setAdminNotes] = useState(order.adminNotes || '')
    const [rejectionReason, setRejectionReason] = useState('')

    if (!isOpen) return null

    const statusConfig = getStatusConfig(order.status)
    const validTransitions = getValidTransitions(order.status)

    const handleStatusChange = async (newStatus: OrderStatus) => {
        setLoading(true)
        try {
            const additionalData: any = {}

            if (newStatus === 'shipped' && trackingNumber) {
                additionalData.tracking_number = trackingNumber
            }
            if (newStatus === 'rejected' && rejectionReason) {
                additionalData.rejection_reason = rejectionReason
            }
            if (adminNotes !== order.adminNotes) {
                additionalData.admin_notes = adminNotes
            }

            await onStatusChange(newStatus, additionalData)
        } finally {
            setLoading(false)
        }
    }

    const generateWekonnectMessage = () => {
        const msg = `🎴 *TapOnce Order Update*

📦 Order #${order.orderNumber}
👤 Customer: ${order.customerName}
📞 Phone: ${order.customerPhone}
💰 Amount: ${formatCurrency(order.salePrice)}
${order.trackingNumber ? `📍 Tracking: ${order.trackingNumber}` : ''}

Status: ${statusConfig.label}

Thank you for choosing TapOnce! 🙏`

        navigator.clipboard.writeText(msg)
        alert('Message copied to clipboard!')
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}
                            >
                                {statusConfig.icon} {statusConfig.label}
                            </span>
                            {order.isDirectSale && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                    Direct Sale
                                </span>
                            )}
                            {order.isBelowMsp && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                    Below MSP
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Customer Info */}
                    <section>
                        <h3 className="font-semibold text-gray-900 mb-3">Customer Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Name:</span>
                                <p className="font-medium">{order.customerName}</p>
                            </div>
                            {order.customerCompany && (
                                <div>
                                    <span className="text-gray-500">Company:</span>
                                    <p className="font-medium">{order.customerCompany}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-gray-500">Phone:</span>
                                <p className="font-medium">
                                    <a href={`tel:${order.customerPhone}`} className="text-blue-600">
                                        {order.customerPhone}
                                    </a>
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500">Email:</span>
                                <p className="font-medium">
                                    <a href={`mailto:${order.customerEmail}`} className="text-blue-600">
                                        {order.customerEmail}
                                    </a>
                                </p>
                            </div>
                            {order.customerWhatsapp && (
                                <div>
                                    <span className="text-gray-500">WhatsApp:</span>
                                    <p className="font-medium">
                                        <a
                                            href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            className="text-green-600"
                                        >
                                            {order.customerWhatsapp}
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Order Info */}
                    <section>
                        <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Card Design:</span>
                                <p className="font-medium">{order.cardDesignName}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Sale Price:</span>
                                <p className="font-medium text-lg">{formatCurrency(order.salePrice)}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">MSP at Order:</span>
                                <p className="font-medium">{formatCurrency(order.mspAtOrder)}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Commission:</span>
                                <p className="font-medium text-green-600">
                                    {formatCurrency(order.commissionAmount)}
                                </p>
                            </div>
                            {order.agentReferralCode && (
                                <div>
                                    <span className="text-gray-500">Agent:</span>
                                    <p className="font-medium">
                                        {order.agentName} ({order.agentReferralCode})
                                    </p>
                                </div>
                            )}
                            <div>
                                <span className="text-gray-500">Created:</span>
                                <p className="font-medium">{formatDateTime(order.createdAt)}</p>
                            </div>
                        </div>
                    </section>

                    {/* Card Content */}
                    {(order.line1Text || order.line2Text) && (
                        <section>
                            <h3 className="font-semibold text-gray-900 mb-3">Card Content</h3>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm">
                                {order.line1Text && <p className="font-medium">{order.line1Text}</p>}
                                {order.line2Text && <p className="text-gray-600">{order.line2Text}</p>}
                            </div>
                        </section>
                    )}

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                        <section>
                            <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm">
                                <p>{order.shippingAddress.line1}</p>
                                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                                    {order.shippingAddress.pincode}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Tracking Number Input */}
                    {(order.status === 'ready_to_ship' || order.status === 'shipped') && (
                        <section>
                            <Label htmlFor="tracking">Tracking Number</Label>
                            <Input
                                id="tracking"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                placeholder="Enter tracking number"
                                className="mt-1"
                            />
                        </section>
                    )}

                    {/* Admin Notes */}
                    <section>
                        <Label htmlFor="notes">Admin Notes</Label>
                        <textarea
                            id="notes"
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            placeholder="Add internal notes..."
                            className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                            rows={3}
                        />
                    </section>

                    {/* Rejection Reason */}
                    {validTransitions.includes('rejected') && (
                        <section>
                            <Label htmlFor="rejection">Rejection Reason</Label>
                            <textarea
                                id="rejection"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Enter reason for rejection..."
                                className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                                rows={2}
                            />
                        </section>
                    )}
                </div>

                {/* Actions Footer */}
                <div className="sticky bottom-0 bg-white border-t p-4 flex flex-wrap gap-2">
                    <Button variant="outline" onClick={generateWekonnectMessage}>
                        📋 Copy Message
                    </Button>

                    {validTransitions.map((nextStatus) => {
                        const nextConfig = getStatusConfig(nextStatus)
                        const isDestructive = nextStatus === 'rejected' || nextStatus === 'cancelled'

                        return (
                            <Button
                                key={nextStatus}
                                variant={isDestructive ? 'destructive' : 'default'}
                                onClick={() => handleStatusChange(nextStatus)}
                                disabled={loading}
                            >
                                {nextConfig.icon} Move to {nextConfig.label}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
