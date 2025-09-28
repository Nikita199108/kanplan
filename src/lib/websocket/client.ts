import { WebSocketEvent } from "./types";

type EventHandler = (event: WebSocketEvent) => void;
type StatusHandler = (status: WebSocketStatus) => void;

export type WebSocketStatus = "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "RECONNECTING";

export class WSClient {
    private url: string;
    private ws: WebSocket | null = null;
    private eventHandlers: EventHandler[] = [];
    private statusHandlers: StatusHandler[] = [];
    private reconnectAttempts = 0;
    private maxRetries = 5;

    constructor(url: string) {
        this.url = url;
    }

    connect() {
        this.setStatus("CONNECTING");
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            this.setStatus("CONNECTED");
            this.reconnectAttempts = 0;
        };

        this.ws.onclose = () => {
            this.setStatus("DISCONNECTED");
            this.tryReconnect();
        };

        this.ws.onerror = () => {
            this.ws?.close();
        };

        this.ws.onmessage = (event) => {
            try {
                const data: WebSocketEvent = JSON.parse(event.data);
                this.eventHandlers.forEach((h) => h(data));
            } catch (err) {
                console.error("Error parsing WS message:", err);
            }
        };
    }

    private tryReconnect() {
        if (this.reconnectAttempts < this.maxRetries) {
            this.reconnectAttempts++;
            const delay = 1000 * 2 ** (this.reconnectAttempts - 1);
            this.setStatus("RECONNECTING");
            console.warn(`Reconnecting in ${delay} ms...`);
            setTimeout(() => this.connect(), delay);
        } else {
            this.setStatus("DISCONNECTED");
            console.error("Max reconnection attempts reached.");
        }
    }

    onEvent(handler: EventHandler) {
        this.eventHandlers.push(handler);
    }

    onStatus(handler: StatusHandler) {
        this.statusHandlers.push(handler);
    }

    private setStatus(status: WebSocketStatus) {
        this.statusHandlers.forEach((h) => h(status));
    }

    send(event: WebSocketEvent) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(event));
        }
    }
}

export const wsClient = new WSClient("ws://localhost:1234");