"use client";

import { create } from "zustand";
import { Card } from "../api/types";
import { mockCardsApi } from "../api/cards";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFiltersStore } from "./useFiltersStore";

// ===== Zustand Store =====
interface CardsState {
    cards: Card[];
    setCards: (cards: Card[]) => void;
    addCard: (card: Card) => void;
    updateCard: (id: string, data: Partial<Card>) => void;
    removeCard: (id: string) => void;
    moveCard: (cardId: string, newColumnId: string) => void;
}

export const useCardsStore = create<CardsState>((set) => ({
    cards: [],
    setCards: (cards) => set({ cards }),
    addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
    updateCard: (id, data) =>
        set((state) => ({
            cards: state.cards.map((c) =>
                c.id === id ? { ...c, ...data } : c
            ),
        })),
    removeCard: (id) =>
        set((state) => ({
            cards: state.cards.filter((c) => c.id !== id),
        })),
    moveCard: (cardId, newColumnId) => set((state) => ({
        cards: state.cards.map(card =>
            card.id === cardId ? { ...card, columnId: newColumnId } : card
        )
    })),
}));

// ===== Hooks с React Query =====
export function useCardsQuery(columnId: string) {
    const setCards = useCardsStore((s) => s.setCards);
    const query = useQuery({
        queryKey: ["cards", columnId],
        queryFn: () => mockCardsApi.getCards(columnId),
    });

    if (query.data && query.isSuccess) {
        setCards(query.data);
    }

    return query;
}

export function useCreateCard(columnId: string) {
    const queryClient = useQueryClient();
    const addCard = useCardsStore((s) => s.addCard);

    return useMutation({
        mutationFn: (title: string) => mockCardsApi.createCard(columnId, title),
        onSuccess: (newCard) => {
            addCard(newCard);
            queryClient.invalidateQueries({ queryKey: ["cards", columnId] });
        },
    });
}

export function useFilteredCards() {
    const { search, tags } = useFiltersStore();
    const cards = useCardsStore((s) => s.cards);

    let result = cards;

    if (search.trim()) {
        const lower = search.toLowerCase();
        result = result.filter(
            (c) =>
                c.title.toLowerCase().includes(lower) ||
                c.description?.toLowerCase().includes(lower)
        );
    }

    if (tags.length > 0) {
        result = result.filter(() => {
            return true; 
        });
    }

    return result;
}