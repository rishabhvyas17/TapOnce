/**
 * @file Admin Catalog Page
 * @description Card design catalog management
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CardDesignCard } from '@/components/admin/catalog/CardDesignCard'
import { CardDesignModal } from '@/components/admin/catalog/CardDesignModal'
import { AgentMspModal } from '@/components/admin/catalog/AgentMspModal'
import { CardDesign, CardDesignStatus, CreateCardDesignPayload, UpdateCardDesignPayload } from '@/types/card-design'
import {
    getCardDesigns,
    createCardDesign,
    updateCardDesign,
    getAgentMsps,
    updateAgentMsp
} from '@/lib/services/catalog'
import { Plus, Package, Search, CheckCircle, XCircle, TrendingUp } from 'lucide-react'

export default function AdminCatalogPage() {
    const [designs, setDesigns] = useState<CardDesign[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<CardDesignStatus | 'all'>('all')

    // Modal states
    const [designModalOpen, setDesignModalOpen] = useState(false)
    const [mspModalOpen, setMspModalOpen] = useState(false)
    const [selectedDesign, setSelectedDesign] = useState<CardDesign | null>(null)
    const [agentMsps, setAgentMsps] = useState<{ agentId: string; agentName: string; mspAmount: number | null }[]>([])

    // Fetch designs from Supabase
    useEffect(() => {
        async function fetchDesigns() {
            setLoading(true)
            const response = await getCardDesigns({
                status: statusFilter === 'all' ? undefined : statusFilter
            })
            setDesigns(response.designs)
            setTotal(response.total)
            setLoading(false)
        }
        fetchDesigns()
    }, [statusFilter])

    // Stats
    const stats = useMemo(() => ({
        total: total,
        active: designs.filter(d => d.status === 'active').length,
        inactive: designs.filter(d => d.status === 'inactive').length,
        totalSales: designs.reduce((sum, d) => sum + d.totalSales, 0)
    }), [designs, total])

    // Filtered designs (client-side search)
    const filteredDesigns = useMemo(() => {
        return designs.filter(design => {
            const matchesSearch =
                design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                design.description?.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesSearch
        })
    }, [designs, searchQuery])

    const handleAddDesign = () => {
        setSelectedDesign(null)
        setDesignModalOpen(true)
    }

    const handleEditDesign = (design: CardDesign) => {
        setSelectedDesign(design)
        setDesignModalOpen(true)
    }

    const handleSetAgentMsp = async (design: CardDesign) => {
        setSelectedDesign(design)
        // Fetch agent MSPs for this design
        const msps = await getAgentMsps(design.id)
        setAgentMsps(msps)
        setMspModalOpen(true)
    }

    const handleToggleStatus = async (design: CardDesign) => {
        const newStatus: CardDesignStatus = design.status === 'active' ? 'inactive' : 'active'
        const result = await updateCardDesign(design.id, { status: newStatus })

        if (result.success) {
            setDesigns(prev => prev.map(d =>
                d.id === design.id ? { ...d, status: newStatus } : d
            ))
        }
    }

    const handleDeleteDesign = async (design: CardDesign) => {
        if (confirm(`Are you sure you want to delete "${design.name}"?`)) {
            // For now, just set to inactive (soft delete)
            const result = await updateCardDesign(design.id, { status: 'inactive' })
            if (result.success) {
                setDesigns(prev => prev.filter(d => d.id !== design.id))
            }
        }
    }

    const handleSubmitDesign = async (data: CreateCardDesignPayload | UpdateCardDesignPayload) => {
        if (selectedDesign) {
            // Update existing
            const result = await updateCardDesign(selectedDesign.id, data as UpdateCardDesignPayload)
            if (result.success) {
                setDesigns(prev => prev.map(d =>
                    d.id === selectedDesign.id
                        ? { ...d, ...data, updatedAt: new Date().toISOString() }
                        : d
                ))
            }
        } else {
            // Create new
            const result = await createCardDesign(data as CreateCardDesignPayload)
            if (result.success && result.id) {
                // Refresh list
                const response = await getCardDesigns()
                setDesigns(response.designs)
                setTotal(response.total)
            }
        }
        setDesignModalOpen(false)
    }

    const handleSaveAgentMsps = async (
        designId: string,
        updates: { agentId: string; mspAmount: number }[]
    ) => {
        for (const update of updates) {
            await updateAgentMsp(designId, update.agentId, update.mspAmount)
        }
        setMspModalOpen(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-muted-foreground">Loading card designs...</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Card Catalog</h1>
                    <p className="text-muted-foreground">
                        Manage card designs and agent pricing
                    </p>
                </div>
                <Button onClick={handleAddDesign}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Card
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Package className="w-4 h-4" />
                        <span className="text-sm">Total Designs</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <XCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Inactive</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-500">{stats.inactive}</p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Total Sales</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalSales}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search designs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={(v) => setStatusFilter(v as CardDesignStatus | 'all')}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Card Grid */}
            {filteredDesigns.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No card designs found</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Add your first card design to get started'}
                        </p>
                        {searchQuery === '' && statusFilter === 'all' && (
                            <Button onClick={handleAddDesign}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Card
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDesigns.map((design) => (
                        <CardDesignCard
                            key={design.id}
                            design={design}
                            onEdit={handleEditDesign}
                            onSetAgentMsp={handleSetAgentMsp}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDeleteDesign}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <CardDesignModal
                design={selectedDesign}
                open={designModalOpen}
                onOpenChange={setDesignModalOpen}
                onSubmit={handleSubmitDesign}
            />

            <AgentMspModal
                design={selectedDesign}
                agents={agentMsps}
                open={mspModalOpen}
                onOpenChange={setMspModalOpen}
                onSave={handleSaveAgentMsps}
            />
        </div>
    )
}
