/**
 * @file Admin Customers Page
 * @description Customer management with list, detail modal, and actions
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { CustomerTable } from '@/components/admin/CustomerTable'
import { CustomerFilters } from '@/components/admin/CustomerFilters'
import { CustomerDetailModal } from '@/components/admin/CustomerDetailModal'
import { Customer, CustomerStatus } from '@/types/customer'
import { getCustomers, updateCustomerStatus, CustomerListItem } from '@/lib/services/customers'
import { useRouter } from 'next/navigation'

// Transform CustomerListItem to Customer type
function transformCustomer(item: CustomerListItem): Customer {
    return {
        id: item.id,
        profileId: item.profileId,
        slug: item.slug,
        fullName: item.fullName,
        email: item.email || '',
        phone: item.phone || '',
        company: item.company || undefined,
        jobTitle: item.jobTitle || undefined,
        avatarUrl: item.avatarUrl || undefined,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.createdAt,
        customLinks: []
    }
}

export default function AdminCustomersPage() {
    const router = useRouter()
    const [customers, setCustomers] = useState<Customer[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<CustomerStatus | null>(null)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    // Fetch customers from Supabase
    useEffect(() => {
        async function fetchCustomers() {
            setLoading(true)
            const response = await getCustomers({
                search: searchQuery || undefined,
                status: selectedStatus || undefined
            })
            setCustomers(response.customers.map(transformCustomer))
            setTotal(response.total)
            setLoading(false)
        }
        fetchCustomers()
    }, [searchQuery, selectedStatus])

    // Stats
    const stats = useMemo(() => ({
        total: total,
        active: customers.filter(c => c.status === 'active').length,
        pending: customers.filter(c => c.status === 'pending').length,
        suspended: customers.filter(c => c.status === 'suspended').length
    }), [customers, total])

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setModalOpen(true)
    }

    const handleEditCustomer = (customer: Customer) => {
        // TODO: Open edit form or navigate to edit page
        console.log('Edit customer:', customer.id)
    }

    const handleToggleStatus = async (customer: Customer) => {
        const newStatus: CustomerStatus = customer.status === 'active' ? 'suspended' : 'active'

        const result = await updateCustomerStatus(customer.id, newStatus)

        if (result.success) {
            // Update local state
            setCustomers(prev => prev.map(c =>
                c.id === customer.id ? { ...c, status: newStatus } : c
            ))
            setModalOpen(false)
        } else {
            console.error('Failed to update customer status:', result.error)
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
                    <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground">
                        Manage customer profiles and portfolios
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold">{stats.total}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{stats.active} active</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>{stats.pending} pending</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4">
                <CustomerFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    onClearFilters={clearFilters}
                />
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-muted-foreground">Loading customers...</div>
                    </div>
                ) : (
                    <CustomerTable
                        customers={customers}
                        onViewCustomer={handleViewCustomer}
                        onEditCustomer={handleEditCustomer}
                        onToggleStatus={handleToggleStatus}
                    />
                )}
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
                Showing {customers.length} of {total} customers
            </div>

            {/* Detail Modal */}
            <CustomerDetailModal
                customer={selectedCustomer}
                open={modalOpen}
                onOpenChange={setModalOpen}
                onEdit={handleEditCustomer}
                onToggleStatus={handleToggleStatus}
            />
        </div>
    )
}
