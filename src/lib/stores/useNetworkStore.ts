import { create } from "zustand";
import { syncOfflineActions } from "../offline/sync";

interface NetworkState {
    online: boolean;
    setOnline: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
    online: typeof window !== "undefined" ? navigator.onLine : true,
    setOnline: (status) => set({ online: status }),
}));

// подписка на события браузера
if (typeof window !== "undefined") {
    window.addEventListener("online", async () => {
        useNetworkStore.getState().setOnline(true);
        console.log("Online! - starting sync");
        await syncOfflineActions();
    });

    window.addEventListener("offline", () => {
        useNetworkStore.getState().setOnline(false);
    });
}