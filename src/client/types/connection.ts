export interface ConnectionConfig {
  apiUrl: string;
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
  ticketExpiresIn?: number; // milliseconds until expiration
}

export const DEFAULT_CONNECTION_CONFIG: Partial<ConnectionConfig> = {
  maxReconnectAttempts: Infinity,
  reconnectDelay: 1000,
  heartbeatInterval: 30000,
};

export const WEBSOCKET_CLOSE_CODES = {
  NORMAL: 1000,            // Normal closure
  GOING_AWAY: 1001,        // Endpoint going away (e.g., tab closing)
  PROTOCOL_ERROR: 1002,    // Protocol error
  UNSUPPORTED_DATA: 1003,  // Unsupported data
  NO_STATUS_RCVD: 1005,    // No status code was provided (abnormal closure)
  ABNORMAL_CLOSURE: 1006,  // Connection was closed abnormally
  INVALID_FRAME_PAYLOAD_DATA: 1007, // Invalid frame payload data
  POLICY_VIOLATION: 1008,  // Policy violation
  MESSAGE_TOO_BIG: 1009,   // Message too big
  MANDATORY_EXTENSION: 1010, // Mandatory extension
  INTERNAL_ERROR: 1011,    // Internal server error
  SERVICE_RESTART: 1012,   // Service restart
  TRY_AGAIN_LATER: 1013,   // Try again later
  BAD_GATEWAY: 1014,       // Bad gateway
  TLS_HANDSHAKE: 1015,     // TLS handshake failure
} as const;

export type WebSocketCloseCode = typeof WEBSOCKET_CLOSE_CODES[keyof typeof WEBSOCKET_CLOSE_CODES];