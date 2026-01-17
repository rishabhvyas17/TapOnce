'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KanbanOrder } from '@/types/kanban';
import { Currency } from 'lucide-react';

interface OrderCardProps {
    order: KanbanOrder;
}

export function OrderCard({ order }: OrderCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: order.id,
        data: {
            type: 'Order',
            order,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-50 h-[150px] bg-muted/50 border-2 border-dashed border-primary/20 rounded-lg"
            />
        );
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
            <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs">
                            #{order.orderNumber}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <CardTitle className="text-sm font-medium mt-1">
                        {order.customerName}
                    </CardTitle>
                    <CardDescription className="text-xs truncate">
                        {order.designName || 'Standard Design'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <span className="text-xs">Price:</span>
                        </div>
                        <div className="font-semibold text-green-600">
                            ₹{order.salePrice}
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                        <span>MSP: ₹{order.msp}</span>
                        {order.salePrice < order.msp && (
                            <span className="text-red-500 font-bold">Below MSP</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
