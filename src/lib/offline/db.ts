import { openDB } from "idb";

const DB_NAME = "offline-actions";
const STORE_NAME = "actions";

export interface OfflineAction {
    id: string; 
    type: "CREATE" | "UPDATE" | "DELETE";
    entity: "card" | "column" | "board";
    payload: unknown; 
    timestamp: number;
}

export async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        },
    });
}

export async function saveAction(action: OfflineAction) {
    const db = await getDB();
    await db.put(STORE_NAME, action);
}

export async function getAllActions(): Promise<OfflineAction[]> {
    const db = await getDB();
    return (await db.getAll(STORE_NAME)) as OfflineAction[];
}

export async function clearActions() {
    const db = await getDB();
    await db.clear(STORE_NAME);
}