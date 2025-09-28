import { getAllActions, clearActions } from "./db";
import { mockCardsApi } from "../api/cards";

export async function syncOfflineActions() {
    const actions = await getAllActions();

    for (const action of actions.sort((a, b) => a.timestamp - b.timestamp)) {
        try {
            if (action.entity === "card") {
                const payload = action.payload as {
                    id: string;
                    columnId: string;
                    title: string;
                    description?: string;
                    order?: number;
                };

                if (action.type === "CREATE") {
                    await mockCardsApi.createCard(payload.columnId, payload.title);
                }
                if (action.type === "UPDATE") {
                    await mockCardsApi.updateCard(payload.id, {
                        title: payload.title,
                        description: payload.description,
                        columnId: payload.columnId,
                        order: payload.order
                    });
                }
                if (action.type === "DELETE") {
                    await mockCardsApi.deleteCard(payload.id);
                }
            }
        } catch (err) {
            console.error("Sync error", action, err);
        }
    }

    await clearActions();
}