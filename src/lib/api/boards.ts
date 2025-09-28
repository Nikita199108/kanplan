import { apiClient } from './client';
import type { Board } from './types';

export const boardsApi = {
    getBoards: () => apiClient.get<Board[]>('/boards'),

    createBoard: (title: string) =>
        apiClient.post<Board>('/boards', { title }),

    updateBoard: (id: string, updates: Partial<Board>) =>
        apiClient.patch<Board>(`/boards/${id}`, updates),

    deleteBoard: (id: string) =>
        apiClient.delete<void>(`/boards/${id}`),
};

let mockBoards: Board[] = [
    { id: "1", title: "Project A", createdAt: new Date().toISOString() },
    { id: "2", title: "Project B", createdAt: new Date().toISOString() },
];

export const mockBoardsApi = {
    getBoards: (): Promise<Board[]> => {
        return Promise.resolve(mockBoards);
    },

    createBoard: (data: { title: string }): Promise<Board> => {
        const newBoard: Board = {
            id: String(Date.now()),
            title: data.title,
            createdAt: new Date().toISOString(),
        };
        mockBoards.push(newBoard);
        return Promise.resolve(newBoard);
    },

    deleteBoard: (id: string): Promise<void> => {
        mockBoards = mockBoards.filter((b) => b.id !== id);
        return Promise.resolve();
    },

    updateBoard: (id: string, updates: Partial<Board>): Promise<Board> => {
        const boardIndex = mockBoards.findIndex((b) => b.id === id);
        if (boardIndex === -1) {
            return Promise.reject(new Error('Board not found'));
        }

        mockBoards[boardIndex] = { ...mockBoards[boardIndex], ...updates };
        return Promise.resolve(mockBoards[boardIndex]);
    }
};