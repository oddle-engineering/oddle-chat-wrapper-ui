export enum SystemEventType {
  // Connection Events
  CONNECTION_ESTABLISHED = "connection_established",
  CONNECTION_LOST = "connection_lost",
  CONNECTION_RESTORED = "connection_restored",
  CONNECTION_FAILED = "connection_failed",
  RECONNECTING = "reconnecting",

  // Chat Events
  CHAT_COMPLETED = "chat_completed",
  CHAT_ERROR = "chat_error",

}

export interface BaseSystemEvent {
  type: SystemEventType;
  timestamp: Date;
  data?: any;
}

export interface ConnectionEvent extends BaseSystemEvent {
  type:
    | SystemEventType.CONNECTION_ESTABLISHED
    | SystemEventType.CONNECTION_LOST
    | SystemEventType.CONNECTION_RESTORED
    | SystemEventType.CONNECTION_FAILED
    | SystemEventType.RECONNECTING;
  data?: {
    attempt?: number;
    maxAttempts?: number;
    reason?: string;
  };
}

export interface ChatEvent extends BaseSystemEvent {
  type: SystemEventType.CHAT_COMPLETED | SystemEventType.CHAT_ERROR;
  data?: {
    conversationId?: string;
    error?: string;
    errorCode?: string;
  };
}

export type SystemEvent =
  | ConnectionEvent
  | ChatEvent;

export type SystemEventHandler = (event: SystemEvent) => void;
