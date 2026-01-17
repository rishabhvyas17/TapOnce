import { KanbanBoard } from '@/components/admin/KanbanBoard';
import { KanbanColumn, KanbanOrder } from '@/types/kanban';

// Mock Data
const columns: KanbanColumn[] = [
    { id: 'pending_approval', title: 'Pending Approval', color: '#fbbf24' }, // amber-400
    { id: 'approved', title: 'Approved', color: '#3b82f6' }, // blue-500
    { id: 'printing', title: 'Printing', color: '#a855f7' }, // purple-500
    { id: 'ready_to_ship', title: 'Ready to Ship', color: '#ec4899' }, // pink-500
    { id: 'shipped', title: 'Shipped', color: '#10b981' }, // emerald-500
    { id: 'delivered', title: 'Delivered', color: '#6366f1' }, // indigo-500
];

const initialOrders: KanbanOrder[] = [
    {
        id: '1',
        orderNumber: 1001,
        customerName: 'Rahul Verma',
        status: 'pending_approval',
        msp: 600,
        salePrice: 999,
        createdAt: new Date().toISOString(),
        designName: 'Vertical Blue Premium'
    },
    {
        id: '2',
        orderNumber: 1002,
        customerName: 'Priya Singh',
        status: 'approved',
        msp: 800,
        salePrice: 1299,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        designName: 'Horizontal Gold Elite'
    },
    {
        id: '3',
        orderNumber: 1003,
        customerName: 'Amit Shah',
        status: 'printing',
        msp: 500,
        salePrice: 650,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        designName: 'Minimal White'
    },
    {
        id: '4',
        orderNumber: 1004,
        customerName: 'Eco Corp',
        status: 'pending_approval',
        msp: 600,
        salePrice: 500, // Below MSP
        createdAt: new Date().toISOString(),
        designName: 'Vertical Blue Premium'
    }
];

export default function AdminOrdersPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Board</h1>
                    <p className="text-muted-foreground">Manage orders via drag-and-drop.</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-muted/10 rounded-xl border p-4">
                <KanbanBoard initialColumns={columns} initialOrders={initialOrders} />
            </div>
        </div>
    );
}
