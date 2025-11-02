export interface ConnectionConfig {
  apiUrl: string;
  userId?: string;
  maxReconnectAttempts: number;
  reconnectDelay: number;
  heartbeatInterval: number;
}

export interface ConnectionState {
  isConnected: boolean;
  isReconnecting: boolean;
  reconnectAttempts: number;
  reconnectDelay: number;
}

export interface ConnectionStatus {
  connected: boolean;
  reconnectAttempts: number;
  isReconnecting: boolean;
  websocketState: string;
  // Ticket status information
  hasValidTicket: boolean;
  ticketExpiresIn?: number; // seconds until expiration
  isRefreshingTicket: boolean;
}

export const DEFAULT_CONNECTION_CONFIG: Partial<ConnectionConfig> = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1000,
  heartbeatInterval: 30000,
};

export const WEBSOCKET_CLOSE_CODES = {
  NORMAL: 1000,
  GOING_AWAY: 1001,
} as const;

export type WebSocketCloseCode = typeof WEBSOCKET_CLOSE_CODES[keyof typeof WEBSOCKET_CLOSE_CODES];