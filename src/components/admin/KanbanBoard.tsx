'use client';

import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    closestCorners
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { KanbanColumn as IKanbanColumn, KanbanOrder, OrderStatus } from '@/types/kanban';
import { KanbanColumn } from './KanbanColumn';
import { OrderCard } from './OrderCard';

interface KanbanBoardProps {
    initialColumns: IKanbanColumn[];
    initialOrders: KanbanOrder[];
}

export function KanbanBoard({ initialColumns, initialOrders }: KanbanBoardProps) {
    const [columns] = useState<IKanbanColumn[]>(initialColumns);
    const [orders, setOrders] = useState<KanbanOrder[]>(initialOrders);
    const [activeOrder, setActiveOrder] = useState<KanbanOrder | null>(null);

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3px movement required before drag starts
            },
        })
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Order') {
            setActiveOrder(event.active.data.current.order);
            return;
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAOrder = active.data.current?.type === 'Order';
        const isOverAOrder = over.data.current?.type === 'Order';
        const isOverAColumn = over.data.current?.type === 'Column';

        if (!isActiveAOrder) return;

        // Dragging an Order over another Order
        if (isActiveAOrder && isOverAOrder) {
            setOrders((orders) => {
                const activeIndex = orders.findIndex((t) => t.id === activeId);
                const overIndex = orders.findIndex((t) => t.id === overId);

                if (orders[activeIndex].status !== orders[overIndex].status) {
                    // Different column - simpler logic handled in DragEnd usually but needed here for visual
                    orders[activeIndex].status = orders[overIndex].status;
                    return arrayMove(orders, activeIndex, overIndex - 1); // rough approx
                }

                return arrayMove(orders, activeIndex, overIndex);
            });
        }

        // Dragging an Order over a Column
        if (isActiveAOrder && isOverAColumn) {
            setOrders((orders) => {
                const activeIndex = orders.findIndex((t) => t.id === activeId);
                if (orders[activeIndex].status !== overId) {
                    orders[activeIndex].status = overId as OrderStatus;
                    return arrayMove(orders, activeIndex, activeIndex); // trigger re-render
                }
                return orders;
            });
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveOrder(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAOrder = active.data.current?.type === 'Order';
        const isOverAOrder = over.data.current?.type === 'Order';
        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveAOrder && isOverAOrder) {
            // Logic handled in onDragOver for sorting mostly
            // Here we would sync with backend
        }

        if (isActiveAOrder && isOverAColumn) {
            // Dropped on empty column area
            setOrders(orders => {
                const activeIndex = orders.findIndex(t => t.id === activeId);
                const activeOrder = orders[activeIndex];
                if (activeOrder.status !== overId) {
                    // update status
                    const newOrders = [...orders];
                    newOrders[activeIndex] = { ...newOrders[activeIndex], status: overId as OrderStatus };
                    return newOrders;
                }
                return orders;
            });
        }
    }

    // Client-side only rendering for Portal
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="flex h-full overflow-x-auto overflow-y-hidden gap-4 pb-4">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="flex gap-4 min-w-full">
                    {columns.map((col) => (
                        <KanbanColumn
                            key={col.id}
                            column={col}
                            orders={orders.filter((order) => order.status === col.id)}
                        />
                    ))}
                </div>

                {mounted && createPortal(
                    <DragOverlay>
                        {activeOrder && (
                            <div className="opacity-80 rotate-2">
                                <OrderCard order={activeOrder} />
                            </div>
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}
