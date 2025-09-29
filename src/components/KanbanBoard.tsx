"use client";

import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useColumnsStore } from "@/lib/stores/useColumnsStore";
import { useCardsStore } from "@/lib/stores/useCardsStore";
import KanbanCard from "./KanbanCard";
import type { Card, Column } from "@/lib/api/types";

// Добавляем Draggable обертку для карточки
function DraggableKanbanCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });
  
  const style = transform ? { 
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` 
  } : {};

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className="cursor-grab"
    >
      <KanbanCard card={card} />
    </div>
  );
}

// Добавляем Droppable обертку для колонки
function DroppableColumn({ column, cards }: { column: Column; cards: Card[] }) {
  const { setNodeRef } = useDroppable({ 
    id: column.id 
  });

  return (
    <section
      key={column.id}
      role="list"
      aria-label={`Column: ${column.title}`}
      className="flex-1 border rounded-lg p-4 bg-gray-50 min-h-[500px]"
      ref={setNodeRef}
    >
      <h2 className="font-bold text-lg mb-4">{column.title}</h2>
      <div className="space-y-2">
        {cards.map((card) => (
          <DraggableKanbanCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

export default function KanbanBoard() {
    const { columns } = useColumnsStore();
    const { cards, moveCard } = useCardsStore();

    if (columns.length === 0) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
                <div className="text-red-500">No columns found. Check columns store.</div>
            </div>
        );
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        
        if (over && active.id !== over.id) {
            moveCard(active.id as string, over.id as string);
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div
                className="p-4"
                role="region"
                aria-label="Project board with draggable cards"
            >
                <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
                <div className="flex gap-4">
                    {columns.map((column) => (
                        <DroppableColumn
                            key={column.id}
                            column={column}
                            cards={cards.filter((card) => card.columnId === column.id)}
                        />
                    ))}
                </div>
            </div>
        </DndContext>
    );
}