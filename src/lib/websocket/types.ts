export type WebSocketEvent =
    | {
        type: "CARD_CREATED";
        payload: { id: string; columnId: string; title: string; description?: string };
    }
    | {
        type: "CARD_UPDATED";
        payload: { id: string; columnId: string; title?: string; description?: string };
    }
    | {
        type: "CARD_DELETED";
        payload: { id: string; columnId: string };
    };
