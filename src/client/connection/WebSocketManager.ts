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

    this.ws.onopen = () => this.handleConnectionOpened(resolve);
    this.ws.onerror = (error) => this.handleConnectionError(error, resolve, reject);
    this.ws.onmessage = (event) => this.onMessage?.(event);
    this.ws.onclose = (event) => this.handleConnectionClosed(event);
  }

  private handleConnectionOpened(resolve?: (value?: any) => void): void {
    this.updateConnectionState(true, false);
    this.startHeartbeat();
    this.onOpen?.();
    resolve?.();
  }

  private handleConnectionError(
    error: Event,
    resolve?: (value?: any) => void,
    reject?: (reason?: any) => void
  ): void {
    this.onError?.(error);

    if (error instanceof Event && resolve) {
      this.connectionState.setConnected(true);
      resolve();
    } else {
      reject?.(error);
    }
  }

  private handleConnectionClosed(event: CloseEvent): void {
    this.processConnectionClosure(event);
    this.onClose?.(event);

    if (this.shouldReconnectAfterClose(event.code)) {
      this.attemptReconnect();
    }
  }

  private updateConnectionState(connected: boolean, reconnecting: boolean): void {
    this.connectionState.setConnected(connected);
    this.connectionState.setReconnecting(reconnecting);
    this.connectionState.resetReconnectAttempts();
    this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
  }

  private processConnectionClosure(_event?: CloseEvent): void {
    this.connectionState.setConnected(false);
    this.stopHeartbeat();
  }

  private shouldReconnectAfterClose(closeCode: number): boolean {
    const { NORMAL, GOING_AWAY } = WEBSOCKET_CLOSE_CODES;
    return closeCode !== NORMAL && closeCode !== GOING_AWAY;
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
      this.scheduleReconnectAfterError();
    }
  }

  private setupReconnectHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => this.handleReconnectionOpened();
    this.ws.onerror = () => this.handleReconnectionError();
    this.ws.onmessage = (event) => this.onMessage?.(event);
    this.ws.onclose = (event) => this.handleReconnectionClosed(event);
  }

  private handleReconnectionOpened(): void {
    this.updateConnectionState(true, false);
    this.startHeartbeat();
    this.onSystemEvent?.(SystemEventFactory.connectionRestored());
    this.onOpen?.();
  }

  private handleReconnectionError(): void {
    this.scheduleReconnectAfterError();
  }

  private scheduleReconnectAfterError(): void {
    this.connectionState.setReconnecting(false);
    setTimeout(
      () => this.attemptReconnect(),
      this.connectionState.reconnectDelay
    );
  }

  private handleReconnectionClosed(event: CloseEvent): void {
    this.processConnectionClosure(event);
    this.connectionState.setReconnecting(false);

    if (this.shouldReconnectAfterClose(event.code)) {
      this.attemptReconnect();
    }
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
