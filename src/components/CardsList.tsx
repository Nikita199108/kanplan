"use client";

import { useFilteredCards } from "@/lib/stores/useCardsStore";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function CardsList() {
    const cards = useFilteredCards();
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: cards.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 80,
        overscan: 5,
    });

    return (
        <div
            ref={parentRef}
            className="h-[500px] overflow-y-auto border rounded p-2"
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    position: "relative",
                    width: "100%",
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const card = cards[virtualRow.index];
                    return (
                        <div
                            key={card.id}
                            className="absolute top-0 left-0 w-full border-b p-2 bg-white"
                            style={{
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            <h3 className="font-bold">{card.title}</h3>
                            <p className="text-sm">{card.description}</p>
                            <div className="text-xs text-gray-500">
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}