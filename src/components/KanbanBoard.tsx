"use client";

import { useState } from "react";
import { useColumnsStore } from "@/lib/stores/useColumnsStore";
import { useCardsStore } from "@/lib/stores/useCardsStore";
import KanbanCard from "./KanbanCard";

export default function KanbanBoard() {
    const { columns } = useColumnsStore();
    const { cards, moveCard } = useCardsStore();
    const [draggedCard, setDraggedCard] = useState<string | null>(null);

    if (columns.length === 0) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
                <div className="text-red-500">No columns found. Check columns store.</div>
            </div>
        );
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        if (draggedCard) {
            moveCard(draggedCard, columnId);
            setDraggedCard(null);
        }
    };

    return (
        <div
            className="p-4"
            role="region"
            aria-label="Project board with draggable cards"
        >
            <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
            <div className="flex gap-4">
                {columns.map((column) => (
                    <section
                        key={column.id}
                        role="list"
                        aria-label={`Column: ${column.title}`}
                        className="flex-1 border rounded-lg p-4 bg-gray-50 min-h-[500px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        <h2 className="font-bold text-lg mb-4">{column.title}</h2>
                        <div className="space-y-2">
                            {cards
                                .filter((card) => card.columnId === column.id)
                                .map((card) => (
                                    <KanbanCard key={card.id} card={card} />
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}