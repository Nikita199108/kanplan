import { create } from 'zustand';

// Типы для статусов
type Status = 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING' | 'ERROR';

// Интерфейс для store
interface WSStore {
    status: Status;
    setStatus: (status: Status) => void;
}

// Создаем store
export const useWSStore = create<WSStore>((set) => ({
    status: 'DISCONNECTED',
    setStatus: (status) => set({ status }),
}));