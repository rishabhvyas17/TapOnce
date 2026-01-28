/**
 * @file Admin Agents Page
 * @description Agent management with list, create, detail, and payout modals
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { AgentTable } from '@/components/admin/AgentTable'
import { AgentFilters } from '@/components/admin/AgentFilters'
import { AgentDetailModal } from '@/components/admin/AgentDetailModal'
import { CreateAgentModal } from '@/components/admin/CreateAgentModal'
import { PayoutModal } from '@/components/admin/PayoutModal'
import { PendingApplications } from '@/components/admin/PendingApplications'
import { Agent, AgentStatus, CreateAgentPayload, PayoutPayload } from '@/types/agent'
import { AgentApplication } from '@/types/agent-application'
import { Users, IndianRupee, TrendingUp, Wallet, Loader2, RefreshCw } from 'lucide-react'

// Transform AgentListItem to Agent type
function transformAgent(item: AgentListItem): Agent {
    return {
        id: item.id,
        profileId: item.profileId,
        fullName: item.fullName,
        email: item.email || '',
        phone: item.phone || '',
        referralCode: item.referralCode,
        city: item.city || undefined,
        upiId: item.upiId || undefined,
        bankAccount: item.bankAccount || undefined,
        bankIfsc: item.bankIfsc || undefined,
        baseCommission: item.baseCommission,
        totalSales: item.totalSales,
        totalEarnings: item.totalEarnings,
        availableBalance: item.availableBalance,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.createdAt
    }
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export default function AdminAgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<AgentStatus | null>(null)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [payoutAgent, setPayoutAgent] = useState<Agent | null>(null)
    const [payoutModalOpen, setPayoutModalOpen] = useState(false)

    // Fetch agents from API on mount
    const fetchAgents = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/agents', {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setAgents(data.agents || [])
            } else {
                console.error('Failed to fetch agents')
            }
        } catch (err) {
            console.error('Error fetching agents:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])

    // Filtered agents
    const filteredAgents = useMemo(() => {
        let result = agents

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(a =>
                a.fullName.toLowerCase().includes(query) ||
                a.email.toLowerCase().includes(query) ||
                a.referralCode.toLowerCase().includes(query) ||
                a.phone.includes(query)
            )
        }
        fetchAgents()
    }, [searchQuery, selectedStatus])

    // Stats
    const stats = useMemo(() => ({
        total: total,
        active: agents.filter(a => a.status === 'active').length,
        totalSales: agents.reduce((sum, a) => sum + a.totalSales, 0),
        totalOwed: agents.reduce((sum, a) => sum + a.availableBalance, 0),
        totalEarnings: agents.reduce((sum, a) => sum + a.totalEarnings, 0)
    }), [agents, total])

    const handleViewAgent = (agent: Agent) => {
        setSelectedAgent(agent)
        setDetailModalOpen(true)
    }

    const handleEditAgent = (agent: Agent) => {
        // TODO: Open edit form
        console.log('Edit agent:', agent.id)
    }

    const handlePayAgent = (agent: Agent) => {
        setPayoutAgent(agent)
        setPayoutModalOpen(true)
        setDetailModalOpen(false)
    }

    const handleToggleStatus = async (agent: Agent) => {
        const newStatus: AgentStatus = agent.status === 'active' ? 'inactive' : 'active'

        const result = await updateAgentStatus(agent.id, newStatus)

        if (result.success) {
            setAgents(prev => prev.map(a =>
                a.id === agent.id ? { ...a, status: newStatus } : a
            ))
            setDetailModalOpen(false)
        } else {
            console.error('Failed to update agent status:', result.error)
        }
    }

    const handleCreateAgent = async (data: CreateAgentPayload) => {
        // TODO: Implement createAgent service function
        console.log('Create agent:', data)
        // For now, close modal - real implementation would call Supabase
        setCreateModalOpen(false)
    }

    const handlePayout = async (agentId: string, data: PayoutPayload) => {
        const result = await processPayout(agentId, data)

        if (result.success) {
            // Update local state
            setAgents(prev => prev.map(a =>
                a.id === agentId
                    ? { ...a, availableBalance: a.availableBalance - data.amount }
                    : a
            ))
            setPayoutModalOpen(false)
        } else {
            console.error('Failed to process payout:', result.error)
        }
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedStatus(null)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
                    <p className="text-muted-foreground">
                        Manage marketing agents and commissions
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">Total Agents</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-green-600">{stats.active} active</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Total Sales</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalSales}</p>
                    <p className="text-xs text-muted-foreground">cards sold</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-xs">Total Earnings</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(stats.totalEarnings)}
                    </p>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50">
                    <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <Wallet className="w-4 h-4" />
                        <span className="text-xs">Commission Owed</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">
                        {formatCurrency(stats.totalOwed)}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4">
                <AgentFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    onClearFilters={clearFilters}
                    onCreateAgent={() => setCreateModalOpen(true)}
                />
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-muted-foreground">Loading agents...</div>
                    </div>
                ) : (
                    <AgentTable
                        agents={agents}
                        onViewAgent={handleViewAgent}
                        onEditAgent={handleEditAgent}
                        onPayAgent={handlePayAgent}
                        onToggleStatus={handleToggleStatus}
                    />
                )}
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
                Showing {agents.length} of {total} agents
            </div>

            {/* Pending Applications Section */}
            <div className="mt-6 bg-white border rounded-lg p-4">
                <PendingApplications
                    onApprove={(application: AgentApplication) => {
                        // Open create modal pre-filled with application data
                        setCreateModalOpen(true)
                        // Note: You could pre-fill the create form here
                        console.log('Approve application:', application)
                    }}
                />
            </div>

            {/* Modals */}
            <AgentDetailModal
                agent={selectedAgent}
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                onEdit={handleEditAgent}
                onPay={handlePayAgent}
                onToggleStatus={handleToggleStatus}
            />

            <CreateAgentModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                existingAgents={agents}
                onSubmit={handleCreateAgent}
            />

            <PayoutModal
                agent={payoutAgent}
                open={payoutModalOpen}
                onOpenChange={setPayoutModalOpen}
                onSubmit={handlePayout}
            />
        </div>
    )
}
