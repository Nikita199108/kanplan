import { apiClient } from './client';
import type { Card } from './types';

export const cardsApi = {
    getCards: (columnId: string) =>
        apiClient.get<Card[]>(`/columns/${columnId}/cards`),

    createCard: (columnId: string, title: string) =>
        apiClient.post<Card>(`/columns/${columnId}/cards`, { title }),

    updateCard: (id: string, updates: Partial<Card>) =>
        apiClient.patch<Card>(`/cards/${id}`, updates),

    deleteCard: (id: string) =>
        apiClient.delete<void>(`/cards/${id}`),
};

let mockCards: Card[] = [
    {
        id: "1",
        columnId: "1",
        title: "Buy milk",
        description: "2.5% fat",
        order: 1
    },
    {
        id: "2",
        columnId: "1",
        title: "Refuel the car",
        order: 2
    },
    {
        id: "3",
        columnId: "2",
        title: "Call mom",
        order: 1
    },
];

export const mockCardsApi = {
    getCards: (columnId: string): Promise<Card[]> => {
        const cards = mockCards.filter(card => card.columnId === columnId);
        return Promise.resolve(cards);
    },

    createCard: (columnId: string, title: string): Promise<Card> => {
        const newCard: Card = {
            id: String(Date.now()),
            columnId,
            title,
            order: mockCards.filter(card => card.columnId === columnId).length + 1,
        };
        mockCards.push(newCard);
        return Promise.resolve(newCard);
    },

    deleteCard: (id: string): Promise<void> => {
        mockCards = mockCards.filter(card => card.id !== id);
        return Promise.resolve();
    },

    updateCard: (id: string, updates: Partial<Card>): Promise<Card> => {
        const cardIndex = mockCards.findIndex(card => card.id === id);
        if (cardIndex === -1) {
            return Promise.reject(new Error('Card not found'));
        }

        mockCards[cardIndex] = { ...mockCards[cardIndex], ...updates };
        return Promise.resolve(mockCards[cardIndex]);
    }
};