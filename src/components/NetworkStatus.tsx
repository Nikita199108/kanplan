"use client";
import { useNetworkStore } from "@/lib/stores/useNetworkStore";

export default function NetworkStatus() {
    const online = useNetworkStore((s) => s.online);

    return (
        <div className={`fixed top-4 left-4 z-50 ${online ? 'text-green-500' : 'text-red-500'}`}>
            {online ? "Online" : "Offline (working locally)"}
        </div>
    );
}