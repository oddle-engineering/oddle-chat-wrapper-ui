import React from "react";
import type { ContextHelpers } from '../client/types/shared';

export type ChatMode = "sidebar" | "fullscreen" | "modal" | "embedded";
export type ChatPosition = "left" | "right";
export type ChatTheme = "light" | "dark" | "auto";
export enum EntityType {
  BRAND = "BRAND",
  ACCOUNT = "ACCOUNT", 
  USER = "USER",
}


export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "reasoning" | "tooling";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
  toolData?: {
    toolName: string;
    callId: string;
    parameters?: Record<string, any>;
    result?: any;
    status?: "processing" | "completed" | "error";
  };
}

export interface StreamEvent {
  type: string;
  event?: string;
  data?: any;
  content?: string;
  error?: string;
  done?: boolean;
  uuid?: string;
  result?: any;
  tool?: string;
  parameters?: any[] | Record<string, any> | any;
  todos?: any[];
  briefs?: any[];
}

export interface ToolResult {
  id: string;
  title: string;
  description?: string;
  status?: string;
  created_at: string;
  [key: string]: any;
}

export interface ChatConfig {
  mode: ChatMode;
  position?: ChatPosition;
  appName: string;
  apiEndpoint: string;
  apiKey?: string;
  theme?: ChatTheme;
  description?: string;
  placeholder?: string;
  placeholderTexts?: string[];
  welcomeMessage?: string;
  promptPath?: string;
  bubbleText?: string;
  constrainedHeight?: boolean; // When true, embedded mode will fill parent container completely
  headerVisible?: boolean; // When true, shows the header with appName and description
  restaurantName?: string; // Restaurant name to display as chip near attachment button
  restaurantLogo?: string; // Restaurant logo URL to display inside the chip
  suggestedPrompts?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode; // Optional icon component for the prompt
  }>; // Suggested prompts to display when no messages are present
  features?: {
    fileUpload?: boolean;
    voiceInput?: boolean;
    messageHistory?: boolean;
    exportChat?: boolean;
    showToolResults?: boolean;
    showBubbleText?: boolean;
  };
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  onToolResult?: (tool: string, result: any) => void;
  onStreamingStatusChange?: (status: string) => void;
  customStyles?: React.CSSProperties;
  endpoint?: "brief-planner" | "conversation";
}

export interface ChatWrapperProps {
  // Authentication and server configuration
  userMpAuthToken: string; // Use for Authorization header in HTTPS requests and WebSocket initialization
  chatServerUrl: string; // Making connection to WebSocket and HTTP requests
  chatServerKey: string; // Server can detect which app is using the chat server (UD21, etc.)
  
  // Entity and conversation configuration
  threadId?: string; // Optional: Load specific thread history by ID
  userId: string;
  entityId?: string; // Either brandId or accountId, depending on EntityType
  entityType?: EntityType;
  
  
  // Existing props
  config: Omit<ChatConfig, "apiEndpoint">;
  tools?: Tools; // Unified tools with execution functions
  devMode?: boolean;
  contextHelpers?: ContextHelpers;
}

export interface ConversationResponse {
  conversationId: string;
  message: string;
}

export interface Thread {
  id: string;
  userId: string;
  convUuid: string;
  providerResId?: string;
  title: string;
  agentType: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ThreadsResponse {
  threads: Thread[];
}

export interface MessagesResponse {
  messages: Message[];
  providerResId?: string;
}

export interface ToolParameter {
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  schema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    additionalProperties?: boolean;
    $schema?: string;
    enum?: string[];
    items?: any;
  };
}

// Tool schema interface (sent to server)
export interface ToolSchema {
  name: string;
  description: string;
  parameters: ToolParameter[];
}

// Enhanced tool interface with execution function (client-side)
export interface Tool extends ToolSchema {
  execute: (params: any) => Promise<any> | any;
}

// Type for tools array
export type Tools = Tool[];

// Legacy ClientTool interface (for backward compatibility)
export interface ClientTool {
  name: string;
  description: string;
  parameters: ToolParameter[];
}

export type ClientTools = ClientTool[];

// Re-export shared types for backward compatibility
export type { ToolCallRequest, ContextHelpers } from '../client/types/shared';

// Re-export status constants and types
export type { 
  ChatStatus, 
  StreamingStatus, 
  ProcessingStatus 
} from '../constants/chatStatus';
export { 
  CHAT_STATUS, 
  STREAMING_STATUS, 
  PROCESSING_STATUS,
  isChatActive,
  isChatIdle,
  isChatError,
  isProcessingActive,
  isProcessingComplete,
  isProcessingError
} from '../constants/chatStatus';

// Re-export typed WebSocket message interfaces (recommended over deprecated WebSocketMessage)
export type {
  InboundMessage,
  OutboundMessage,
  InboundMessageType,
  OutboundMessageType,
  ChatEventMessage,
  ToolCallRequestMessage,
  SystemEvent,
  SystemEventType
} from '../client/types';

// DEPRECATED: Use InboundMessage or OutboundMessage from client/types instead
// This interface is kept temporarily for backward compatibility
export interface WebSocketMessage {
  type: string;
  content?: string;
  data?: any;
  event?: string;
  error?: string;
  toolName?: string;
  parameters?: Record<string, any>;
  callId?: string;
  result?: any;
  timestamp?: string;
  uuid?: string;
  connectionInfo?: any;
  toolSchemas?: any[];
  contextHelpers?: ContextHelpers;
  agentType?: string;
  pingTime?: string;
  originalTimestamp?: string;
}
