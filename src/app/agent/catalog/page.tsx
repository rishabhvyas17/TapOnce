/**
 * @file Agent Card Catalog
 * @description Browse available card designs with personalized MSP
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.4
 */

'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Search,
    Package,
    ShoppingCart,
    Check,
    XCircle,
    ArrowUpDown
} from 'lucide-react'

// Mock card designs with agent's personalized MSP
const mockCardDesigns = [
    {
        id: '1',
        name: 'Vertical Blue Premium',
        description: 'Professional vertical design with blue gradient. Perfect for corporate executives and business owners.',
        previewUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop',
        msp: 600,
        baseMsp: 600,
        status: 'active',
        totalSales: 42
    },
    {
        id: '2',
        name: 'Horizontal Gold Elite',
        description: 'Premium horizontal card with elegant gold foil accents. Ideal for luxury brand representatives.',
        previewUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600&h=400&fit=crop',
        msp: 800,
        baseMsp: 800,
        status: 'active',
        totalSales: 28
    },
    {
        id: '3',
        name: 'Minimal White Pro',
        description: 'Clean, minimalist design with subtle elegance. Great for creative professionals and designers.',
        previewUrl: 'https://images.unsplash.com/photo-1541182388248-95b2e42f9eee?w=400&h=600&fit=crop',
        msp: 550,
        baseMsp: 550,
        status: 'active',
        totalSales: 35
    },
    {
        id: '4',
        name: 'Dark Mode Executive',
        description: 'Sleek dark theme for the modern professional. Makes a bold statement.',
        previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop',
        msp: 700,
        baseMsp: 700,
        status: 'active',
        totalSales: 19
    },
    {
        id: '5',
        name: 'Corporate Classic',
        description: 'Traditional business card styling with a modern NFC twist.',
        previewUrl: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=600&fit=crop',
        msp: 500,
        baseMsp: 500,
        status: 'out_of_stock',
        totalSales: 15
    },
    {
        id: '6',
        name: 'Gradient Sunset',
        description: 'Vibrant gradient design that stands out. Perfect for creative industries.',
        previewUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=600&fit=crop',
        msp: 650,
        baseMsp: 650,
        status: 'active',
        totalSales: 22
    },
]

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

type SortOption = 'name_asc' | 'msp_low' | 'msp_high' | 'popular'

export default function AgentCatalogPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active'>('active')
    const [sortBy, setSortBy] = useState<SortOption>('popular')

    // Filter and sort cards
    const filteredCards = useMemo(() => {
        let cards = mockCardDesigns.filter(card => {
            // Search filter
            const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.description.toLowerCase().includes(searchQuery.toLowerCase())

            // Status filter
            const matchesStatus = statusFilter === 'all' || card.status === 'active'

            return matchesSearch && matchesStatus
        })

        // Sort
        switch (sortBy) {
            case 'name_asc':
                cards.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'msp_low':
                cards.sort((a, b) => a.msp - b.msp)
                break
            case 'msp_high':
                cards.sort((a, b) => b.msp - a.msp)
                break
            case 'popular':
                cards.sort((a, b) => b.totalSales - a.totalSales)
                break
        }

        return cards
    }, [searchQuery, statusFilter, sortBy])

    const handleUseCard = (cardId: string) => {
        router.push(`/agent/orders/new?card=${cardId}`)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Card Catalog</h1>
                <p className="text-muted-foreground">Browse available card designs with your personalized pricing</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search cards..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as 'all' | 'active')}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="all">Show All</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-[180px]">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="name_asc">Name A-Z</SelectItem>
                        <SelectItem value="msp_low">MSP: Low to High</SelectItem>
                        <SelectItem value="msp_high">MSP: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Card Grid */}
            {filteredCards.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">No cards found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search or filters
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCards.map((card) => (
                        <div
                            key={card.id}
                            className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow ${card.status === 'out_of_stock' ? 'opacity-70' : ''
                                }`}
                        >
                            {/* Card Preview Image */}
                            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src={card.previewUrl}
                                    alt={card.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Status Badge */}
                                <div className="absolute top-3 right-3">
                                    {card.status === 'active' ? (
                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                            <Check className="w-3 h-3 mr-1" />
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                            <XCircle className="w-3 h-3 mr-1" />
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Card Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{card.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {card.description}
                                </p>

                                {/* MSP Display */}
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700">Your MSP</p>
                                    <p className="text-2xl font-bold text-green-600">{formatCurrency(card.msp)}</p>
                                </div>

                                {/* Sales Info */}
                                <p className="text-xs text-muted-foreground mt-3">
                                    {card.totalSales} cards sold
                                </p>

                                {/* Action Button */}
                                <Button
                                    className="w-full mt-4"
                                    disabled={card.status === 'out_of_stock'}
                                    onClick={() => handleUseCard(card.id)}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    {card.status === 'out_of_stock'
                                        ? 'Out of Stock'
                                        : 'Use This Card for Order'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
