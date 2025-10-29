import {
  ConnectionConfig,
  WEBSOCKET_CLOSE_CODES,
  SystemEventHandler,
} from "../types";
import { ConnectionState } from "./ConnectionState";
import { SystemEventFactory } from "../utils/eventFactory";
import { MessageFactory } from "../utils/messageFactory";

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: ConnectionConfig;
  private connectionState: ConnectionState;
  private reconnectTimer: number | null = null;
  private heartbeatInterval: number | null = null;
  private visibilityChangeHandler: () => void;

  private onOpen?: () => void;
  private onMessage?: (event: MessageEvent) => void;
  private onError?: (error: Event) => void;
  private onClose?: (event: CloseEvent) => void;
  private onSystemEvent?: SystemEventHandler;

  constructor(config: ConnectionConfig, connectionState: ConnectionState) {
    this.config = config;
    this.connectionState = connectionState;
    this.visibilityChangeHandler = this.handleVisibilityChange.bind(this);
    this.registerVisibilityHandler();
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = this.buildWebSocketUrl();
        this.ws = new WebSocket(wsUrl);

        if (!this.ws) {
          reject(new Error("WebSocket not initialized"));
          return;
        }

        this.setupEventHandlers(resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  private buildWebSocketUrl(): string {
    return this.config.apiUrl.replace(/^https?:\/\//, "ws://") + "/ws";
  }

  private setupEventHandlers(
    resolve?: (value?: any) => void,
    reject?: (reason?: any) => void
  ): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.connectionState.setConnected(true);
      this.connectionState.setReconnecting(false);
      this.connectionState.resetReconnectAttempts();
      this.connectionState.updateReconnectDelay(this.config.reconnectDelay);

      this.startHeartbeat();
      this.onOpen?.();
      resolve?.();
    };

    this.ws.onerror = (error) => {
      this.onError?.(error);

      if (error instanceof Event && resolve) {
        this.connectionState.setConnected(true);
        resolve();
      } else {
        reject?.(error);
      }
    };

    this.ws.onmessage = (event) => {
      this.onMessage?.(event);
    };

    this.ws.onclose = (event) => {
      this.connectionState.setConnected(false);
      this.stopHeartbeat();

      this.onClose?.(event);

      const { NORMAL, GOING_AWAY } = WEBSOCKET_CLOSE_CODES;
      if (event.code !== NORMAL && event.code !== GOING_AWAY) {
        this.attemptReconnect();
      }
    };
  }

  private handleVisibilityChange(): void {
    if (
      document.visibilityState === "visible" &&
      !this.connectionState.isConnected &&
      !this.connectionState.isReconnecting
    ) {
      this.attemptReconnect();
    }
  }

  private registerVisibilityHandler(): void {
    if (typeof document !== "undefined") {
      document.addEventListener(
        "visibilitychange",
        this.visibilityChangeHandler
      );
    }
  }

  private attemptReconnect(): void {
    if (
      this.connectionState.isReconnecting ||
      this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts
    ) {
      if (
        this.connectionState.reconnectAttempts >=
        this.config.maxReconnectAttempts
      ) {
        this.onSystemEvent?.(
          SystemEventFactory.connectionLost("Max reconnection attempts reached")
        );
      }
      return;
    }

    this.connectionState.setReconnecting(true);
    this.connectionState.incrementReconnectAttempts();

    const attempt = this.connectionState.reconnectAttempts;
    const maxAttempts = this.config.maxReconnectAttempts;
    this.onSystemEvent?.(SystemEventFactory.reconnecting(attempt, maxAttempts));

    this.reconnectTimer = window.setTimeout(() => {
      if (!this.connectionState.isConnected) {
        this.reconnect();
      }
    }, this.connectionState.reconnectDelay);

    const newDelay = Math.min(this.connectionState.reconnectDelay * 1.5, 30000);
    this.connectionState.updateReconnectDelay(newDelay);
  }

  private reconnect(): void {
    try {
      this.closeConnection();

      const wsUrl = this.buildWebSocketUrl();
      this.ws = new WebSocket(wsUrl);
      this.setupReconnectHandlers();
    } catch (error) {
      this.connectionState.setReconnecting(false);
      setTimeout(
        () => this.attemptReconnect(),
        this.connectionState.reconnectDelay
      );
    }
  }

  private setupReconnectHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.connectionState.setConnected(true);
      this.connectionState.setReconnecting(false);
      this.connectionState.resetReconnectAttempts();
      this.connectionState.updateReconnectDelay(this.config.reconnectDelay);

      this.startHeartbeat();
      this.onSystemEvent?.(SystemEventFactory.connectionRestored());
      this.onOpen?.();
    };

    this.ws.onerror = () => {
      this.connectionState.setReconnecting(false);
      setTimeout(
        () => this.attemptReconnect(),
        this.connectionState.reconnectDelay
      );
    };

    this.ws.onclose = (event) => {
      this.connectionState.setConnected(false);
      this.connectionState.setReconnecting(false);
      this.stopHeartbeat();

      const { NORMAL, GOING_AWAY } = WEBSOCKET_CLOSE_CODES;
      if (event.code !== NORMAL && event.code !== GOING_AWAY) {
        this.attemptReconnect();
      }
    };

    this.ws.onmessage = (event) => {
      this.onMessage?.(event);
    };
  }

  private startHeartbeat(): void {
    // Disabled for now
    return;

    this.stopHeartbeat();

    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.sendHeartbeat();
      } else {
        this.stopHeartbeat();
        this.attemptReconnect();
      }
    }, this.config.heartbeatInterval);
  }

  private sendHeartbeat(): void {
    const message = MessageFactory.serializeHeartbeatPing();
    this.send(message);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  send(data: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
    }
  }

  private closeConnection(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

  disconnect(): void {
    this.clearTimers();
    this.removeEventListeners();
    this.closeConnection();
    this.connectionState.reset();
    this.ws = null;
  }

  private clearTimers(): void {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopHeartbeat();
  }

  private removeEventListeners(): void {
    if (typeof document !== "undefined" && this.visibilityChangeHandler) {
      document.removeEventListener(
        "visibilitychange",
        this.visibilityChangeHandler
      );
    }
  }

  getWebSocketState(): string {
    if (!this.ws) return "null";

    const stateMap: Record<number, string> = {
      [WebSocket.CONNECTING]: "CONNECTING",
      [WebSocket.OPEN]: "OPEN",
      [WebSocket.CLOSING]: "CLOSING",
      [WebSocket.CLOSED]: "CLOSED",
    };

    return stateMap[this.ws.readyState] || "UNKNOWN";
  }

  setEventHandlers(handlers: {
    onOpen?: () => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (error: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onSystemEvent?: SystemEventHandler;
  }): void {
    this.onOpen = handlers.onOpen;
    this.onMessage = handlers.onMessage;
    this.onError = handlers.onError;
    this.onClose = handlers.onClose;
    this.onSystemEvent = handlers.onSystemEvent;
  }
}
