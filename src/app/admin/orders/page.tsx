/**
 * @file Admin Orders Page
 * @description Kanban board for order management with filters and detail modal
 * 
 * @owner Dev 1
 */

import { AdminOrdersBoard } from '@/components/admin/AdminOrdersBoard';
import { KanbanColumn, KanbanOrder, OrderStatus } from '@/types/kanban';
import { getOrders } from '@/lib/services/orders';
import { getAgents } from '@/lib/services/agents';

// Static columns configuration
const columns: KanbanColumn[] = [
    { id: 'pending_approval', title: 'Pending Approval', color: '#fbbf24' },
    { id: 'approved', title: 'Approved', color: '#3b82f6' },
    { id: 'printing', title: 'Printing', color: '#a855f7' },
    { id: 'ready_to_ship', title: 'Ready to Ship', color: '#ec4899' },
    { id: 'shipped', title: 'Shipped', color: '#10b981' },
    { id: 'delivered', title: 'Delivered', color: '#6366f1' },
];

export default async function AdminOrdersPage() {
    // Fetch real data from Supabase
    const [ordersResponse, agentsResponse] = await Promise.all([
        getOrders(),
        getAgents()
    ]);

    // Transform orders to KanbanOrder format
    const orders: KanbanOrder[] = ordersResponse.orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        status: order.status as OrderStatus,
        msp: order.mspAtOrder,
        salePrice: order.salePrice,
        createdAt: order.createdAt,
        designName: order.cardDesign?.name,
        agentId: order.agent?.id,
        agentName: order.agent?.fullName,
        isDirectSale: order.isDirectSale
    }));

    // Transform agents for filter dropdown
    const agents = agentsResponse.agents.map(agent => ({
        id: agent.id,
        fullName: agent.fullName,
        referralCode: agent.referralCode
    }));

    return (
        <div className="flex flex-col p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Board</h1>
                    <p className="text-muted-foreground">
                        Manage orders via drag-and-drop. Click a card to view details.
                        {ordersResponse.total > 0 && (
                            <span className="ml-2 text-sm">({ordersResponse.total} orders)</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="bg-muted/10 rounded-xl border p-4">
                <AdminOrdersBoard
                    columns={columns}
                    orders={orders}
                    agents={agents}
                />
            </div>
        </div>
    );
}
