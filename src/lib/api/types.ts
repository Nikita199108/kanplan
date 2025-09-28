
export interface Board {
    id: string;
    title: string;
    createdAt: string;
}

export interface Column {
    id: string;
    boardId: string;
    title: string;
    order: number;
}

export interface Card {
    id: string;
    columnId: string;
    title: string;
    description?: string;
    order: number;
}