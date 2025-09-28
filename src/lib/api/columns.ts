import { apiClient } from './client';
import type { Column } from './types';

export const columnsApi = {
    getColumns: (boardId: string) =>
        apiClient.get<Column[]>(`/boards/${boardId}/columns`),

    createColumn: (boardId: string, title: string) =>
        apiClient.post<Column>(`/boards/${boardId}/columns`, { title }),

    updateColumn: (id: string, updates: Partial<Column>) =>
        apiClient.patch<Column>(`/columns/${id}`, updates),

    deleteColumn: (id: string) =>
        apiClient.delete<void>(`/columns/${id}`),
};

let mockColumns: Column[] = [
    { id: "1", boardId: "1", title: "To Do", order: 1 },
    { id: "2", boardId: "1", title: "In Progress", order: 2 },
    { id: "3", boardId: "1", title: "Done", order: 3 },
];

export const mockColumnsApi = {
    getColumns: (boardId: string): Promise<Column[]> => {
        const columns = mockColumns.filter(col => col.boardId === boardId);
        return Promise.resolve(columns);
    },

    createColumn: (boardId: string, title: string): Promise<Column> => {
        const newColumn: Column = {
            id: String(Date.now()),
            boardId,
            title,
            order: mockColumns.filter(col => col.boardId === boardId).length + 1,
        };
        mockColumns.push(newColumn);
        return Promise.resolve(newColumn);
    },

    deleteColumn: (id: string): Promise<void> => {
        mockColumns = mockColumns.filter(col => col.id !== id);
        return Promise.resolve();
    },

    updateColumn: (id: string, updates: Partial<Column>): Promise<Column> => {
        const columnIndex = mockColumns.findIndex(col => col.id === id);
        if (columnIndex === -1) {
            return Promise.reject(new Error('Column not found'));
        }

        mockColumns[columnIndex] = { ...mockColumns[columnIndex], ...updates };
        return Promise.resolve(mockColumns[columnIndex]);
    }
};