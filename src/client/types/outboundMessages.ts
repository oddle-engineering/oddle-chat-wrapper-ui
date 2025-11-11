import { ContextHelpers } from './shared';

export enum OutboundMessageType {
  // Chat Messages
  CHAT_MESSAGE = 'chat_message',
  
  // Tool Configuration
  CONFIGURE_TOOLS = 'configure_tools',
  UPDATE_TOOLS = 'update_tools',
  UPDATE_CONTEXT_HELPERS = 'update_context_helpers',
  
  // Tool Responses
  TOOL_CALL_RESPONSE = 'tool_call_response',
  
  // Connection Management
  HEARTBEAT_PING = 'heartbeat_ping',
  HEARTBEAT_PONG = 'heartbeat_pong',
}

// Base interface for all outbound messages
export interface BaseOutboundMessage {
  type: OutboundMessageType;
}

// Chat message to server
export interface ChatMessage extends BaseOutboundMessage {
  type: OutboundMessageType.CHAT_MESSAGE;
  content: string;
  media: string[];
  providerResId?: string;
}

// Tool configuration message
export interface OutboundConfigureToolsMessage extends BaseOutboundMessage {
  type: OutboundMessageType.CONFIGURE_TOOLS;
  toolSchemas: any[];
  contextHelpers: ContextHelpers;
}

// Update tools message
export interface UpdateToolsMessage extends BaseOutboundMessage {
  type: OutboundMessageType.UPDATE_TOOLS;
  toolSchemas: any[];
}

// Update context helpers message
export interface UpdateContextHelpersMessage extends BaseOutboundMessage {
  type: OutboundMessageType.UPDATE_CONTEXT_HELPERS;
  contextHelpers: ContextHelpers;
}

// Tool call response message
export interface ToolCallResponseMessage extends BaseOutboundMessage {
  type: OutboundMessageType.TOOL_CALL_RESPONSE;
  callId: string;
  result?: any;
  error?: string;
}

// Heartbeat ping message
export interface OutboundHeartbeatPingMessage extends BaseOutboundMessage {
  type: OutboundMessageType.HEARTBEAT_PING;
  timestamp: string;
  pingTime: number;
}

// Heartbeat pong message
export interface HeartbeatPongMessage extends BaseOutboundMessage {
  type: OutboundMessageType.HEARTBEAT_PONG;
  timestamp: string;
  originalTimestamp?: string;
  pingTime?: string | number;
}

// Union type for all outbound messages
export type OutboundMessage = 
  | ChatMessage
  | OutboundConfigureToolsMessage
  | UpdateToolsMessage
  | UpdateContextHelpersMessage
  | ToolCallResponseMessage
  | OutboundHeartbeatPingMessage
  | HeartbeatPongMessage;