import { create } from "zustand";
import { wsClient } from "./client";
import { WebSocketEvent } from "./types";
import { useCardsStore } from "../stores/useCardsStore";

interface WSState {
    status: "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "RECONNECTING";
    start: () => void;
}

export const useWSStore = create<WSState>((set) => ({
    status: "DISCONNECTED",
    start: () => {
        wsClient.connect();
        wsClient.onStatus((status) => set({ status }));

        wsClient.onEvent((event: WebSocketEvent) => {
            const cardsStore = useCardsStore.getState();

            if (event.type === "CARD_CREATED") {
                console.log("New card created:", event.payload);
                cardsStore.addCard({
                    ...event.payload,
                    order: 0
                });
            }
            if (event.type === "CARD_UPDATED") {
                console.log("Card updated:", event.payload);
                cardsStore.updateCard(event.payload.id, event.payload);
            }
            if (event.type === "CARD_DELETED") {
                console.log("Card deleted:", event.payload);
                cardsStore.removeCard(event.payload.id);
            }
        });
    },
}));