import { create } from "zustand";
import { Board } from "../api/types";
import { mockBoardsApi } from "../api/boards";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ===== Zustand Store =====
interface BoardsState {
    boards: Board[];
    setBoards: (boards: Board[]) => void;
    addBoard: (board: Board) => void;
    updateBoard: (id: string, data: Partial<Board>) => void;
    removeBoard: (id: string) => void;
}

export const useBoardsStore = create<BoardsState>((set) => ({
    boards: [],
    setBoards: (boards) => set({ boards }),
    addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
    updateBoard: (id, data) =>
        set((state) => ({
            boards: state.boards.map((b) =>
                b.id === id ? { ...b, ...data } : b
            ),
        })),
    removeBoard: (id) =>
        set((state) => ({
            boards: state.boards.filter((b) => b.id !== id),
        })),
}));

// ===== Hooks с React Query =====
export function useBoardsQuery() {
    const setBoards = useBoardsStore((s) => s.setBoards);
    const query = useQuery({
        queryKey: ["boards"],
        queryFn: () => mockBoardsApi.getBoards(),
    });

    if (query.data && query.isSuccess) {
        setBoards(query.data);
    }

    return query;
}

export function useCreateBoard() {
    const queryClient = useQueryClient();
    const addBoard = useBoardsStore((s) => s.addBoard);

    return useMutation({
        mutationFn: (title: string) => mockBoardsApi.createBoard({ title }),
        onSuccess: (newBoard) => {
            addBoard(newBoard);
            queryClient.invalidateQueries({ queryKey: ["boards"] });
        },
    });
}