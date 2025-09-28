"use client";

import { useWSStore } from '../lib/stores/wsStore';

export default function WSStatus() {
    const status = useWSStore((state) => state.status);

    const colors = {
        CONNECTED: "text-green-500",
        DISCONNECTED: "text-red-500",
        CONNECTING: "text-yellow-500",
        ERROR: "text-red-700"
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
            <span className="text-sm font-medium">{status}</span>
        </div>
    );
}