"use client";

import { useBoardsQuery, useCreateBoard } from "@/lib/stores/useBoardsStore";

export default function BoardsList() {
    const { data, isLoading, error } = useBoardsQuery();
    const createBoardMutation = useCreateBoard();

    if (isLoading) return (
        <div className="p-4 flex items-center gap-2">
            <div className="animate-spin border-2 border-t-transparent w-4 h-4 rounded-full"></div>
            Loading boards...
        </div>
    );

    if (error) return (
        <div role="alert" className="p-4 bg-red-100 text-red-800 rounded">
            ❌ Failed to load boards: {error.message}
        </div>
    );

    const handleCreateBoard = () => {
        createBoardMutation.mutate("New Project");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Projects</h1>

            {createBoardMutation.isError && (
                <div role="alert" className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                    ❌ Failed to create board: {createBoardMutation.error.message}
                </div>
            )}

            <ul className="space-y-2">
                {data?.map((board) => (
                    <li key={board.id} className="p-3 bg-gray-100 rounded">
                        {board.title}
                    </li>
                ))}
            </ul>
            <button
                onClick={handleCreateBoard}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={createBoardMutation.isPending}
            >
                {createBoardMutation.isPending ? (
                    <div className="flex items-center gap-2">
                        <div className="animate-spin border-2 border-t-transparent w-4 h-4 rounded-full"></div>
                        Creating...
                    </div>
                ) : (
                    "➕ Add Project"
                )}
            </button>
        </div>
    );
}