"use client";

import { useState, useRef, useEffect } from "react";
import { useCardsStore } from "@/lib/stores/useCardsStore";
import { useColumnsStore } from "@/lib/stores/useColumnsStore";

interface KanbanCardProps {
    card: {
        id: string;
        title: string;
        description?: string;
        columnId: string;
    };
    isNewlyCreated?: boolean;
}

export default function KanbanCard({ card, isNewlyCreated = false }: KanbanCardProps) {
    const [grabbed, setGrabbed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const cardRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { moveCard, updateCard } = useCardsStore();
    const { columns } = useColumnsStore();

    // Focus management for new cards
    useEffect(() => {
        if (isNewlyCreated) {
            setIsEditing(true);
            setTimeout(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            }, 100);
        }
    }, [isNewlyCreated]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isEditing) {
                setGrabbed(!grabbed);
            }
        }

        if (grabbed && !isEditing) {
            const currentColumnIndex = columns.findIndex(col => col.id === card.columnId);

            switch (e.key) {
                case "ArrowRight":
                    e.preventDefault();
                    if (currentColumnIndex < columns.length - 1) {
                        moveCard(card.id, columns[currentColumnIndex + 1].id);
                        setGrabbed(false);
                    }
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (currentColumnIndex > 0) {
                        moveCard(card.id, columns[currentColumnIndex - 1].id);
                        setGrabbed(false);
                    }
                    break;
                case "Escape":
                    setGrabbed(false);
                    break;
            }
        }

        if (e.key === "Escape" && isEditing) {
            setTitle(card.title);
            setIsEditing(false);
            cardRef.current?.focus();
        }

        if (e.key === "Enter" && isEditing) {
            handleSave();
        }
    };

    const handleSave = () => {
        if (title.trim()) {
            updateCard(card.id, { title: title.trim() });
        } else {
            setTitle(card.title);
        }
        setIsEditing(false);
        cardRef.current?.focus();
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 100);
    };

    return (
        <div
            ref={cardRef}
            tabIndex={0}
            role="button"
            aria-label={`Card: ${card.title}. ${grabbed ? 'Grabbed, use arrow keys to move' : 'Press enter to grab'}`}
            aria-grabbed={grabbed}
            onKeyDown={handleKeyDown}
            onDoubleClick={handleDoubleClick}
            className={`p-3 bg-white border rounded shadow-sm cursor-move hover:shadow-md transition-all ${grabbed ? 'ring-2 ring-blue-500 scale-105' : 'focus:ring-2 focus:ring-blue-400'
                } ${isEditing ? 'ring-2 ring-green-500' : ''}`}
        >
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Edit card title"
                />
            ) : (
                <>
                    <h3 className="font-medium">{card.title}</h3>
                    {card.description && (
                        <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                    )}
                </>
            )}
            <div className="text-xs text-gray-500 mt-2">
                {isEditing
                    ? "Press ENTER to save, ESC to cancel"
                    : grabbed
                        ? "Use ← → arrows to move, ESC to cancel"
                        : "Press SPACE/ENTER to grab, double-click to edit"
                }
            </div>
        </div>
    );
}