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
  private currentTicket: string | null = null;
  private currentSessionId: string | null = null;
  private intentionalDisconnect: boolean = false; // Track intentional disconnects

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

  connect(ticket?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.intentionalDisconnect = false; // Reset flag when connecting
        
        if (ticket) {
          this.currentTicket = ticket;
        }

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
    // Convert HTTP URL to WebSocket URL if needed
    // https:// -> wss://, http:// -> ws://
    let url = this.config.apiUrl
      .replace(/^https:\/\//, 'wss://')
      .replace(/^http:\/\//, 'ws://');
    
    // Add the /ws path if it's not already there
    url = url.endsWith('/ws') ? url : url + '/ws';
    
    // Prefer sessionId for reconnection if available (session-based resume)
    // Otherwise fallback to single-use ticket for initial auth
    if (this.currentSessionId) {
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}sessionId=${this.currentSessionId}`;
      return url;
    }

    // Add ticket to URL if available (used only for initial authentication)
    if (this.currentTicket) {
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}ticket=${this.currentTicket}`;
    }
    
    return url;
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
    _resolve?: (value?: any) => void,
    reject?: (reason?: any) => void
  ): void {
    this.onError?.(error);
    this.connectionState.setConnected(false);

    // If this is during initial connection, reject the promise and don't auto-reconnect
    if (reject) {
      reject(error);
      return;
    }
    
    // Only schedule reconnection for established connections that fail
    // (not initial connection failures)
    if (!this.intentionalDisconnect) {
      this.scheduleReconnectAfterError();
    }
  }

  private handleConnectionClosed(event: CloseEvent): void {
    console.log('[WebSocketManager] Connection closed', { 
      code: event.code, 
      reason: event.reason,
      intentionalDisconnect: this.intentionalDisconnect 
    });
    this.processConnectionClosure(event);
    this.onClose?.(event);

    if (this.shouldReconnectAfterClose(event.code)) {
      console.log('[WebSocketManager] Should reconnect, calling attemptReconnect');
      this.attemptReconnect();
    } else {
      console.log('[WebSocketManager] Should NOT reconnect');
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
    console.log('[WebSocketManager] shouldReconnectAfterClose check', {
      closeCode,
      intentionalDisconnect: this.intentionalDisconnect,
      NORMAL: WEBSOCKET_CLOSE_CODES.NORMAL,
      GOING_AWAY: WEBSOCKET_CLOSE_CODES.GOING_AWAY,
    });

    // Don't reconnect if it was an intentional disconnect
    if (this.intentionalDisconnect) {
      console.log('[WebSocketManager] Intentional disconnect - no reconnect');
      return false;
    }
    
    // For chat apps, reconnect on ANY abnormal closure
    // Close code 1000 = Normal closure (user initiated)
    // Close code 1001 = Going away (browser closing)
    // Close code 1006 = Abnormal closure (server crash, no close frame)
    // Any other code = server error or network issue
    
    const { NORMAL } = WEBSOCKET_CLOSE_CODES;
    
    // Only skip reconnection for normal, user-initiated closures
    // Reconnect for everything else including server crashes (1006), errors (1011), etc.
    const shouldReconnect = closeCode !== NORMAL;
    
    console.log('[WebSocketManager] Should reconnect?', shouldReconnect);
    return shouldReconnect;
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
    console.log('[WebSocketManager] attemptReconnect called', {
      reconnectAttempts: this.connectionState.reconnectAttempts,
      maxReconnectAttempts: this.config.maxReconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      reconnectTimer: this.reconnectTimer,
    });

    // Check if we've hit max reconnection attempts
    if (this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log('[WebSocketManager] Max reconnection attempts reached');
      this.onSystemEvent?.(
        SystemEventFactory.connectionLost("Max reconnection attempts reached")
      );
      this.connectionState.setReconnecting(false);
      return;
    }

    // Check if a reconnection is already in progress (timer is set)
    if (this.reconnectTimer !== null) {
      console.log('[WebSocketManager] Reconnection already in progress, skipping');
      // Already scheduled, don't create duplicate timers
      return;
    }

    this.connectionState.setReconnecting(true);
    this.connectionState.incrementReconnectAttempts();

    const attempt = this.connectionState.reconnectAttempts;
    const maxAttempts = this.config.maxReconnectAttempts;
    console.log('[WebSocketManager] Firing RECONNECTING event', { attempt, maxAttempts });
    this.onSystemEvent?.(SystemEventFactory.reconnecting(attempt, maxAttempts));

    const baseDelay = this.config.reconnectDelay;
    const jitter = Math.random() * 90 + 10; // 10-100ms jitter
    const delayWithJitter = baseDelay + jitter;
    
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null; // Clear the timer reference
      if (!this.connectionState.isConnected) {
        this.reconnect();
      }
    }, delayWithJitter);
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

  /**
   * Update the ticket for future connections
   */
  updateTicket(ticket: string): void {
    this.currentTicket = ticket;
  }

  /**
   * Update the sessionId to be used for reconnections.
   * The server issues a sessionId in the `session_established` message which
   * should be used for subsequent reconnect attempts (tickets can be single-use).
   */
  updateSession(sessionId: string): void {
    this.currentSessionId = sessionId;
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
    // Keep reconnecting state true during the delay to maintain UI consistency
    // Just schedule another attempt - attemptReconnect will handle deduplication
    const baseDelay = this.config.reconnectDelay;
    const jitter = Math.random() * 90 + 10; // 10-100ms jitter
    const delayWithJitter = baseDelay + jitter;
    
    // Clear any existing timer first
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    setTimeout(
      () => this.attemptReconnect(),
      delayWithJitter
    );
  }

  private handleReconnectionClosed(event: CloseEvent): void {
    this.processConnectionClosure(event);
    // Don't set reconnecting to false here - let attemptReconnect manage the state
    // This prevents UI flashing between "reconnecting" and "disconnected"

    if (this.shouldReconnectAfterClose(event.code)) {
      this.attemptReconnect();
    } else {
      // Only set to false if we're NOT going to reconnect
      this.connectionState.setReconnecting(false);
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
      // Close with NORMAL code (1000) to prevent reconnection
      this.ws.close(WEBSOCKET_CLOSE_CODES.NORMAL);
    }
  }

  disconnect(): void {
    this.intentionalDisconnect = true; // Mark as intentional disconnect
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
