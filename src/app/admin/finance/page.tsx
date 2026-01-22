/**
 * @file Admin Finance Page
 * @description Financial dashboard with revenue, expenses, and profit tracking
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { RevenueCard } from '@/components/admin/finance/RevenueCard'
import { ExpenseBreakdown, ExpenseCategory } from '@/components/admin/finance/ExpenseBreakdown'
import { AddExpenseModal } from '@/components/admin/finance/AddExpenseModal'
import { CommissionLiabilities } from '@/components/admin/finance/CommissionLiabilities'
import { CodPendingPayments } from '@/components/admin/finance/CodPendingPayments'
import { ProfitSummary } from '@/components/admin/finance/ProfitSummary'
import { PayoutModal } from '@/components/admin/PayoutModal'
import { Agent, CommissionLiability, PayoutPayload } from '@/types/agent'
import {
    getRevenueStats,
    getExpenses,
    addExpense,
    getCodPendingPayments,
    RevenueStats,
    ExpenseItem,
    CodOrder
} from '@/lib/services/finance'
import { getCommissionLiabilities, processPayout, getAgentById } from '@/lib/services/agents'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Package } from 'lucide-react'

export default function AdminFinancePage() {
    const [loading, setLoading] = useState(true)
    const [revenue, setRevenue] = useState<RevenueStats | null>(null)
    const [expenses, setExpenses] = useState<ExpenseItem[]>([])
    const [liabilities, setLiabilities] = useState<CommissionLiability[]>([])
    const [codOrders, setCodOrders] = useState<CodOrder[]>([])
    const [addExpenseOpen, setAddExpenseOpen] = useState(false)
    const [payoutModalOpen, setPayoutModalOpen] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

    // Fetch all data from Supabase
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const [revenueData, expensesData, liabilitiesData, codData] = await Promise.all([
                getRevenueStats(),
                getExpenses(),
                getCommissionLiabilities(),
                getCodPendingPayments()
            ])
            setRevenue(revenueData)
            setExpenses(expensesData)
            setLiabilities(liabilitiesData)
            setCodOrders(codData)
            setLoading(false)
        }
        fetchData()
    }, [])

    const totalExpenses = useMemo(() =>
        expenses.reduce((sum, e) => sum + e.amount, 0),
        [expenses]
    )

    const totalOwed = useMemo(() =>
        liabilities.reduce((sum, l) => sum + l.availableBalance, 0),
        [liabilities]
    )

    const totalCodPending = codOrders.reduce((sum, o) => sum + o.amount, 0)

    const handleAddExpense = async (data: {
        category: ExpenseCategory
        amount: number
        description: string
        date: string
    }) => {
        const result = await addExpense(data)
        if (result.success) {
            // Refresh expenses
            const newExpenses = await getExpenses()
            setExpenses(newExpenses)
        }
    }

    const handlePayAgent = async (agentId: string) => {
        const agent = await getAgentById(agentId)
        if (agent) {
            setSelectedAgent(agent)
            setPayoutModalOpen(true)
        }
    }

    const handlePayout = async (agentId: string, data: PayoutPayload) => {
        const result = await processPayout(agentId, data)
        if (result.success) {
            // Refresh liabilities
            const newLiabilities = await getCommissionLiabilities()
            setLiabilities(newLiabilities)
            // Refresh expenses
            const newExpenses = await getExpenses()
            setExpenses(newExpenses)
            setPayoutModalOpen(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-muted-foreground">Loading financial data...</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Finance</h1>
                <p className="text-muted-foreground">
                    Track revenue, expenses, and profitability
                </p>
            </div>

            {/* Revenue Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <RevenueCard
                    title="Today"
                    amount={revenue?.today || 0}
                    previousAmount={revenue?.todayPrevious || 0}
                />
                <RevenueCard
                    title="This Week"
                    amount={revenue?.week || 0}
                    previousAmount={revenue?.weekPrevious || 0}
                />
                <RevenueCard
                    title="This Month"
                    amount={revenue?.month || 0}
                    previousAmount={revenue?.monthPrevious || 0}
                    highlight
                />
                <RevenueCard
                    title="All Time"
                    amount={revenue?.allTime || 0}
                    icon="trend"
                />
            </div>

            {/* Sales Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Agent Sales</span>
                    </div>
                    <p className="text-2xl font-bold">₹{((revenue?.agentSales || 0) / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {revenue?.allTime ? (((revenue.agentSales || 0) / revenue.allTime) * 100).toFixed(0) : 0}% of total
                    </p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Direct Sales</span>
                    </div>
                    <p className="text-2xl font-bold">₹{((revenue?.directSales || 0) / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {revenue?.allTime ? (((revenue.directSales || 0) / revenue.allTime) * 100).toFixed(0) : 0}% of total
                    </p>
                </div>
            </div>

            {/* Main Content - Tabs */}
            <Tabs defaultValue="overview" className="flex-1">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="commissions">Commissions</TabsTrigger>
                    <TabsTrigger value="cod">COD Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <ExpenseBreakdown
                            expenses={expenses}
                            totalExpenses={totalExpenses}
                            onAddExpense={() => setAddExpenseOpen(true)}
                        />
                        <ProfitSummary
                            totalRevenue={revenue?.month || 0}
                            totalExpenses={totalExpenses}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="commissions" className="mt-4">
                    <CommissionLiabilities
                        liabilities={liabilities}
                        totalOwed={totalOwed}
                        onPayAgent={handlePayAgent}
                    />
                </TabsContent>

                <TabsContent value="cod" className="mt-4">
                    <CodPendingPayments
                        orders={codOrders}
                        totalAmount={totalCodPending}
                    />
                </TabsContent>
            </Tabs>

            {/* Modals */}
            <AddExpenseModal
                open={addExpenseOpen}
                onOpenChange={setAddExpenseOpen}
                onSubmit={handleAddExpense}
            />

            <PayoutModal
                agent={selectedAgent}
                open={payoutModalOpen}
                onOpenChange={setPayoutModalOpen}
                onSubmit={handlePayout}
            />
        </div>
    )
}
