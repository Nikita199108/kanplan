"use client";

import { create } from "zustand";
import { Column } from "../api/types";
import { mockColumnsApi } from "../api/columns";

interface ColumnsState {
    columns: Column[];
    setColumns: (columns: Column[]) => void;
    addColumn: (column: Column) => void;
    updateColumn: (id: string, data: Partial<Column>) => void;
    removeColumn: (id: string) => void;
}

export const useColumnsStore = create<ColumnsState>((set) => ({
    columns: [],
    setColumns: (columns) => set({ columns }),
    addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
    updateColumn: (id, data) =>
        set((state) => ({
            columns: state.columns.map((c) =>
                c.id === id ? { ...c, ...data } : c
            ),
        })),
    removeColumn: (id) =>
        set((state) => ({
            columns: state.columns.filter((c) => c.id !== id),
        })),
}));

// Автоматически загружаем колонки при инициализации
mockColumnsApi.getColumns("1").then(columns => {
    useColumnsStore.getState().setColumns(columns);
});

// Автоматически загружаем карточки
import { mockCardsApi } from "../api/cards";
import { useCardsStore } from "./useCardsStore";

mockCardsApi.getCards("1").then(cards => {
    useCardsStore.getState().setCards(cards);
});