/**
 * @file Sub-Agent Network
 * @description Recruit and manage sub-agents for override commissions
 * 
 * @owner Dev 2
 * @module agent
 * 
 * @see ProductRequirementsDocument.txt Section 6.2.6
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Users,
    Copy,
    Share2,
    QrCode,
    CheckCircle,
    TrendingUp,
    Calendar,
    Package,
    DollarSign
} from 'lucide-react'
import { getAgentByProfileId, getSubAgents, Agent, SubAgent } from '@/lib/services/agents'
import { createClient } from '@/lib/supabase/client'

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

export default function SubAgentNetworkPage() {
    const [loading, setLoading] = useState(true)
    const [agent, setAgent] = useState<Agent | null>(null)
    const [subAgents, setSubAgents] = useState<SubAgent[]>([])
    const [copied, setCopied] = useState(false)
    const [showQrModal, setShowQrModal] = useState(false)

    // Fetch agent and sub-agents
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const agentData = await getAgentByProfileId(user.id)
                if (agentData) {
                    setAgent(agentData)
                    const subAgentList = await getSubAgents(agentData.id)
                    setSubAgents(subAgentList)
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    // Calculate totals
    const stats = useMemo(() => {
        const totalSubAgents = subAgents.length
        const activeSubAgents = subAgents.filter(s => s.status === 'active').length
        const totalOverrideEarnings = subAgents.reduce((sum, s) => sum + s.overrideEarnings, 0)
        const totalNetworkSales = subAgents.reduce((sum, s) => sum + s.totalSales, 0)
        return { totalSubAgents, activeSubAgents, totalOverrideEarnings, totalNetworkSales }
    }, [subAgents])

    const referralLink = agent ? `https://taponce.in/agent-signup?ref=${agent.referralCode}` : ''

    const handleCopyLink = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleShareWhatsApp = () => {
        if (agent) {
            const message = `Join TapOnce as a Sales Agent and start earning! 💼\n\nUse my referral code: ${agent.referralCode}\n\nSign up here: ${referralLink}`
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading your network...</div>
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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">My Network</h1>
                <p className="text-muted-foreground">Recruit sub-agents and earn override commissions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-xl border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Recruits</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalSubAgents}</p>
                    <p className="text-xs text-muted-foreground">{stats.activeSubAgents} active</p>
                </div>

                <div className="p-5 bg-white rounded-xl border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <Package className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Network Sales</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalNetworkSales}</p>
                    <p className="text-xs text-muted-foreground">Cards sold by recruits</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/20">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm text-white/80">Override Earnings</span>
                    </div>
                    <p className="text-3xl font-bold">{formatCurrency(stats.totalOverrideEarnings)}</p>
                    <p className="text-xs text-white/70">2% of sub-agent sales</p>
                </div>

                <div className="p-5 bg-white rounded-xl border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-orange-100">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Avg per Agent</span>
                    </div>
                    <p className="text-3xl font-bold">
                        {stats.totalSubAgents > 0 ? formatCurrency(stats.totalOverrideEarnings / stats.totalSubAgents) : '₹0'}
                    </p>
                    <p className="text-xs text-muted-foreground">Override earnings</p>
                </div>
            </div>

            {/* Recruitment Section */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Recruit New Agents</h2>
                        <p className="text-white/80 text-sm mb-4">
                            Share your referral link and earn 2% override commission on every sale they make!
                        </p>

                        {/* Referral Link */}
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                            <Input
                                readOnly
                                value={referralLink}
                                className="bg-transparent border-0 text-white placeholder:text-white/50 flex-1"
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleCopyLink}
                            >
                                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={handleCopyLink}
                            className="gap-2"
                        >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={handleShareWhatsApp}
                            className="gap-2"
                        >
                            <Share2 className="w-4 h-4" />
                            WhatsApp
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => setShowQrModal(true)}
                            className="gap-2"
                        >
                            <QrCode className="w-4 h-4" />
                            QR Code
                        </Button>
                    </div>
                </div>

                {/* Referral Code Display */}
                <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-white/70">Your Referral Code</p>
                    <p className="text-3xl font-bold tracking-wider mt-1">{agent.referralCode}</p>
                </div>
            </div>

            {/* Sub-Agents List */}
            <div className="bg-white rounded-xl border">
                <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        Your Recruited Agents ({stats.totalSubAgents})
                    </h3>
                </div>

                {subAgents.length === 0 ? (
                    <div className="p-8 text-center">
                        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No recruits yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Share your referral link to start building your network!
                        </p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {subAgents.map((subAgent) => (
                            <div
                                key={subAgent.id}
                                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50"
                            >
                                {/* Agent Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {subAgent.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold">{subAgent.fullName}</h4>
                                            <Badge
                                                variant={subAgent.status === 'active' ? 'default' : 'secondary'}
                                                className={subAgent.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                            >
                                                {subAgent.status === 'active' ? '✅ Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            Joined {formatDate(subAgent.joinedAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Sales</p>
                                        <p className="font-bold">{subAgent.totalSales} cards</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Your Override</p>
                                        <p className="font-bold text-green-600">{formatCurrency(subAgent.overrideEarnings)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* QR Code Modal */}
            <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-center">Your Referral QR Code</DialogTitle>
                    </DialogHeader>
                    <div className="py-6 text-center">
                        {/* Placeholder QR Code */}
                        <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                            <QrCode className="w-24 h-24 text-gray-400" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                            Scan to join as agent under <strong>{agent.referralCode}</strong>
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowQrModal(false)} className="w-full">
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
