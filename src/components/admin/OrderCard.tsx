/**
 * @file Order Card Component
 * @description Card displaying order info in Kanban column
 * 
 * @owner Dev 1
 * @module admin/orders
 */

'use client'

import { useState } from 'react'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { OrderCard as OrderCardType } from '@/types/kanban'

interface OrderCardProps {
    order: OrderCardType
    onClick: () => void
    isDragging?: boolean
}

export function OrderCard({ order, onClick, isDragging }: OrderCardProps) {
    const isUrgent = order.daysInStatus > 3
    const isOverdue = order.daysInStatus > 7

    return (
        <div
            onClick={onClick}
            className={`
        bg-white rounded-lg p-4 shadow-sm border cursor-pointer
        transition-all duration-200
        hover:shadow-md hover:border-blue-300
        ${isDragging ? 'opacity-50 shadow-lg' : ''}
        ${isOverdue ? 'border-l-4 border-l-red-500' : ''}
        ${isUrgent && !isOverdue ? 'border-l-4 border-l-yellow-500' : ''}
      `}
        >
            {/* Header: Order # and Days */}
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-gray-500">
                    #{order.orderNumber}
                </span>
                {order.daysInStatus > 0 && (
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full ${isOverdue
                                ? 'bg-red-100 text-red-700'
                                : isUrgent
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        {order.daysInStatus}d
                    </span>
                )}
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-3 mb-3">
                {order.customerPhotoUrl ? (
                    <img
                        src={order.customerPhotoUrl}
                        alt={order.customerName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                            {order.customerName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                        {order.customerName}
                    </p>
                    {order.customerCompany && (
                        <p className="text-xs text-gray-500 truncate">
                            {order.customerCompany}
                        </p>
                    )}
                </div>
            </div>

            {/* Card Design */}
            <p className="text-sm text-gray-600 mb-2">
                🎴 {order.cardDesignName}
            </p>

            {/* Price and Agent */}
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(order.salePrice)}
                </span>
                {order.agentReferralCode ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {order.agentReferralCode}
                    </span>
                ) : (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        Direct
                    </span>
                )}
            </div>

            {/* Badges */}
            <div className="flex gap-1 mt-2 flex-wrap">
                {order.isBelowMsp && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        Below MSP
                    </span>
                )}
                {order.paymentStatus === 'cod' && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                        COD
                    </span>
                )}
                {order.paymentStatus === 'paid' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Paid
                    </span>
                )}
            </div>
        </div>
    )
}
