'use client';

/**
 * @file Admin Orders Client Component
 * @description Client wrapper for KanbanBoard with Supabase mutations
 * 
 * @owner Dev 1
 */

import { KanbanBoard } from '@/components/admin/KanbanBoard';
import { KanbanColumn, KanbanOrder, OrderStatus } from '@/types/kanban';
import { updateOrderStatus } from '@/lib/services/orders';
import { useRouter } from 'next/navigation';

interface Agent {
    id: string;
    fullName: string;
    referralCode: string;
}

interface AdminOrdersBoardProps {
    columns: KanbanColumn[];
    orders: KanbanOrder[];
    agents: Agent[];
}

export function AdminOrdersBoard({ columns, orders, agents }: AdminOrdersBoardProps) {
    const router = useRouter();

    const handleOrderUpdate = async (orderId: string, newStatus: OrderStatus) => {
        const result = await updateOrderStatus(orderId, newStatus);

        if (result.success) {
            // Refresh the page to get updated data
            router.refresh();
        } else {
            console.error('Failed to update order:', result.error);
            // Could add toast notification here
        }
    };

    const handleOrderApprove = async (orderId: string) => {
        const result = await updateOrderStatus(orderId, 'approved');

        if (result.success) {
            router.refresh();
        } else {
            console.error('Failed to approve order:', result.error);
        }
    };

    const handleOrderReject = async (orderId: string, reason: string) => {
        const result = await updateOrderStatus(orderId, 'rejected', {
            rejectionReason: reason
        });

        if (result.success) {
            router.refresh();
        } else {
            console.error('Failed to reject order:', result.error);
        }
    };

    return (
        <KanbanBoard
            initialColumns={columns}
            initialOrders={orders}
            agents={agents}
            onOrderUpdate={handleOrderUpdate}
            onOrderApprove={handleOrderApprove}
            onOrderReject={handleOrderReject}
        />
    );
}
