import { ToolCallRequest } from './shared';

// Main inbound message types from server
export enum InboundMessageType {
  // Session Management
  SESSION_ESTABLISHED = 'session_established',
  
  // Tool Configuration
  TOOLS_CONFIGURED = 'tools_configured',
  CLIENT_TOOLS_UPDATED = 'client_tools_updated',
  CONFIGURE_TOOLS = 'configure_tools',
  
  // Chat Messages
  CHAT_EVENT = 'chat_event',
  CHAT_FINISHED = 'chat_finished',
  CHAT_ERROR = 'chat_error',
  
  // Thread Management
  THREAD_CREATED = 'thread_created',
  
  // Tool Execution
  TOOL_CALL_REQUEST = 'tool_call_request',
  
  
  // Connection Management
  HEARTBEAT_PING = 'heartbeat_ping',
  HEARTBEAT_ACK = 'heartbeat_ack',
  
  // Error Handling
  ERROR = 'error',
}

// Chat event sub-types
export enum ChatEventType {
  PROVIDER_EVENT = 'provider-event',
  LATITUDE_EVENT = 'latitude-event',
  CONTENT_DELTA = 'content-delta',
}

// Provider event sub-types
export enum ProviderEventType {
  TEXT_DELTA = 'text-delta',
  REASONING_START = 'reasoning-start',
  REASONING_DELTA = 'reasoning-delta',
  REASONING_END = 'reasoning-end',
  TOOL_CALL = 'tool-call',
  TOOL_RESULT = 'tool-result',
}

// Base interface for all inbound messages
export interface BaseInboundMessage {
  type: InboundMessageType;
  data?: any;
  event?: string;
  error?: string;
  timestamp?: string;
  uuid?: string;
}

// Session management messages
export interface SessionEstablishedMessage extends BaseInboundMessage {
  type: InboundMessageType.SESSION_ESTABLISHED;
}

// Tool configuration messages
export interface ToolsConfiguredMessage extends BaseInboundMessage {
  type: InboundMessageType.TOOLS_CONFIGURED;
  data?: {
    toolCount?: number;
    toolNames?: string[];
  };
}

export interface ClientToolsUpdatedMessage extends BaseInboundMessage {
  type: InboundMessageType.CLIENT_TOOLS_UPDATED;
  data?: {
    toolCount?: number;
    toolNames?: string[];
  };
}

export interface ConfigureToolsMessage extends BaseInboundMessage {
  type: InboundMessageType.CONFIGURE_TOOLS;
  data?: {
    toolSchemas?: any[];
    contextHelpers?: any;
  };
}

// Chat messages
export interface ChatEventMessage extends BaseInboundMessage {
  type: InboundMessageType.CHAT_EVENT;
  event: ChatEventType;
  data?: {
    type?: ProviderEventType | string;
    textDelta?: string;
    delta?: string;
    id?: string;
    text?: string;
    toolName?: string;
    toolCallId?: string;
    args?: Record<string, any>;
    result?: any;
  };
}

export interface ChatFinishedMessage extends BaseInboundMessage {
  type: InboundMessageType.CHAT_FINISHED;
  uuid?: string;
  data?: {
    conversationId?: string;
    messageCount?: number;
  };
}

export interface ChatErrorMessage extends BaseInboundMessage {
  type: InboundMessageType.CHAT_ERROR;
  error: string;
  data?: {
    errorCode?: string;
    details?: any;
  };
}

// Thread management messages
export interface ThreadCreatedMessage extends BaseInboundMessage {
  type: InboundMessageType.THREAD_CREATED;
  data: {
    providerResId: string;
    threadId: string;
    canUpdateMetadata: boolean;
    updateEndpoint: string;
  };
}

// Tool execution messages
export interface ToolCallRequestMessage extends BaseInboundMessage, ToolCallRequest {
  type: InboundMessageType.TOOL_CALL_REQUEST;
}


// Connection management messages
export interface HeartbeatPingMessage extends BaseInboundMessage {
  type: InboundMessageType.HEARTBEAT_PING;
  timestamp: string;
  pingTime?: string | number;
}

export interface HeartbeatAckMessage extends BaseInboundMessage {
  type: InboundMessageType.HEARTBEAT_ACK;
  timestamp?: string;
  originalTimestamp?: string;
}

// Error messages
export interface ErrorMessage extends BaseInboundMessage {
  type: InboundMessageType.ERROR;
  error: string;
  data?: {
    errorCode?: string;
    details?: any;
  };
}

// Union type for all inbound messages
export type InboundMessage = 
  | SessionEstablishedMessage
  | ToolsConfiguredMessage
  | ClientToolsUpdatedMessage
  | ConfigureToolsMessage
  | ChatEventMessage
  | ChatFinishedMessage
  | ChatErrorMessage
  | ThreadCreatedMessage
  | ToolCallRequestMessage
  | HeartbeatPingMessage
  | HeartbeatAckMessage
  | ErrorMessage;

// Type guards for message types
export const isSessionEstablished = (msg: BaseInboundMessage): msg is SessionEstablishedMessage =>
  msg.type === InboundMessageType.SESSION_ESTABLISHED;

export const isToolsConfigured = (msg: BaseInboundMessage): msg is ToolsConfiguredMessage =>
  msg.type === InboundMessageType.TOOLS_CONFIGURED;

export const isChatEvent = (msg: BaseInboundMessage): msg is ChatEventMessage =>
  msg.type === InboundMessageType.CHAT_EVENT;

export const isToolCallRequest = (msg: BaseInboundMessage): msg is ToolCallRequestMessage =>
  msg.type === InboundMessageType.TOOL_CALL_REQUEST;


export const isChatError = (msg: BaseInboundMessage): msg is ChatErrorMessage =>
  msg.type === InboundMessageType.CHAT_ERROR;

export const isThreadCreated = (msg: BaseInboundMessage): msg is ThreadCreatedMessage =>
  msg.type === InboundMessageType.THREAD_CREATED;