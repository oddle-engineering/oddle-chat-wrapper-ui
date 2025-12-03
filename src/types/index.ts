import React from "react";
import type { ContextHelpers } from "../client/types/shared";

export type ChatMode = "sidebar" | "fullscreen" | "modal" | "embedded";
export type ChatPosition = "left" | "right";
export type ChatTheme = "light" | "dark" | "auto";

export enum EntityType {
  BRAND = "BRAND",
  ACCOUNT = "ACCOUNT",
  USER = "USER",
}

/**
 * Supported authentication token types
 */
export enum AuthTokenType {
  /** Oddle MP Auth Token (current) */
  MP_AUTH = "MP_AUTH",
  /** OddlePass Token (future support) */
  ODDLE_PASS = "ODDLE_PASS",
}

/**
 * Connection state for WebSocket chat client
 * Represents the current status of the connection in a type-safe way
 */
export enum ConnectionState {
  /** Not connected and not attempting to connect */
  DISCONNECTED = "disconnected",
  /** Currently attempting initial connection */
  CONNECTING = "connecting", 
  /** Successfully connected and ready to use */
  CONNECTED = "connected",
  /** Lost connection and attempting to reconnect */
  RECONNECTING = "reconnecting",
}

/**
 * Authentication and entity context configuration
 * Groups authentication credentials and entity association into a single object
 */
export interface AuthConfig {
  /** Authentication token value */
  token: string;
  
  /** Type of authentication token being used */
  tokenType?: AuthTokenType;
  
  /** Entity ID (brandId or accountId) - for entity-scoped conversations */
  entityId?: string;
  
  /** Entity type - BRAND, ACCOUNT, or USER */
  entityType?: EntityType;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "reasoning" | "tooling";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
  hasError?: boolean;
  errorMessage?: string;
  isRetrying?: boolean;
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

/**
 * Props passed to custom header render function
 */
export interface CustomHeaderProps {
  mode: ChatMode;
  isCollapsed: boolean;
  isModalOpen?: boolean;
  devMode?: boolean;
  onClose?: () => void;
  onToggleFullscreen?: () => void;
  onToggleCollapse?: () => void;
  onOpenSettings?: () => void;
}


export interface ChatConfig {
  mode: ChatMode;
  position?: ChatPosition;
  headerName: string;
  apiEndpoint: string;
  apiKey?: string;
  theme?: ChatTheme;
  headerDescription?: string;
  placeholderTexts?: string[];
  bubbleText?: string;
  constrainedHeight?: boolean; // When true, embedded mode will fill parent container completely
  headerVisible?: boolean; // When true, shows the header with headerName and headerDescription
  chipName?: string; // Name to display as chip near attachment button (e.g., restaurant name)
  chipLogo?: string; // Logo URL to display inside the chip
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
  
  /**
   * Custom header component for full UI control
   * When provided, this takes precedence over headerName, headerDescription, and headerVisible
   * The function receives control handlers and state for integration
   * 
   * @example
   * ```tsx
   * customHeader: ({ onClose, onToggleFullscreen }) => (
   *   <div className="my-header">
   *     <img src="logo.png" />
   *     <h1>My Chat</h1>
   *     <button onClick={onToggleFullscreen}>Fullscreen</button>
   *   </div>
   * )
   * ```
   */
  customHeader?: (props: CustomHeaderProps) => React.ReactNode;
  
  /**
   * Custom chip component for the input area
   * When provided, this takes precedence over chipName and chipLogo
   * Useful for displaying dynamic context (restaurant, order, etc.)
   * 
   * @example
   * ```tsx
   * customChip: () => (
   *   <div className="my-chip">
   *     <img src="restaurant-logo.png" />
   *     <span>McDonald's - Table 5</span>
   *   </div>
   * )
   * ```
   */
  customChip?: () => React.ReactNode;
  
  /**
   * Custom welcome header component for the header area
   * When provided, this takes precedence over headerName and headerDescription
   * Useful for fully custom header layouts and branding
   * 
   * @example
   * ```tsx
   * welcomeHeader: () => (
   *   <div className="my-welcome">
   *     <img src="logo.png" />
   *     <div>
   *       <h1>Demo Chat</h1>
   *       <p>An AI assistant to help with restaurant management tasks.</p>
   *     </div>
   *   </div>
   * )
   * ```
   */
  welcomeHeader?: () => React.ReactNode;
}

export interface ChatWrapperRef {
  /**
   * Update thread metadata and/or tag for dynamic business context
   * Use this for frequently changing data without affecting entity ownership
   *
   * Common use cases:
   * - Order IDs, table IDs, campaign IDs
   * - Status updates, priority changes
   * - Custom app-specific metadata
   *
   * @param updates - Object containing tag and/or metadata to update
   *
   * @example
   * ```tsx
   * const chatRef = useRef<ChatWrapperRef>(null);
   *
   * // Update order context
   * chatRef.current?.updateMetadata({
   *   metadata: { orderId: 'order_789', tableId: 'table_5', status: 'pending' }
   * });
   *
   * // Update tag and metadata together
   * chatRef.current?.updateMetadata({
   *   tag: 'high-priority',
   *   metadata: { priority: 'urgent', assignedTo: 'agent-123' }
   * });
   * ```
   */
  updateMetadata: (updates: { tag?: string | null; metadata?: any }) => void;
}

export interface ChatWrapperProps {
  // Authentication and entity context (grouped)
  auth: AuthConfig;
  
  // Server configuration
  chatServerUrl: string; // Making connection to WebSocket and HTTP requests
  chatServerKey: string; // Server can detect which app is using the chat server (UD21, etc.)

  // Conversation configuration
  metadata?: any; // Additional metadata for business context (orderId, tableId, etc.)

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
export type { ToolCallRequest, ContextHelpers } from "../client/types/shared";

// Re-export status constants and types
export type {
  ChatStatus,
  StreamingStatus,
  ProcessingStatus,
} from "../constants/chatStatus";
export {
  CHAT_STATUS,
  STREAMING_STATUS,
  PROCESSING_STATUS,
  isChatActive,
  isChatIdle,
  isChatError,
  isProcessingActive,
  isProcessingComplete,
  isProcessingError,
} from "../constants/chatStatus";

// Re-export typed WebSocket message interfaces (recommended over deprecated WebSocketMessage)
export type {
  InboundMessage,
  OutboundMessage,
  InboundMessageType,
  OutboundMessageType,
  ChatEventMessage,
  ToolCallRequestMessage,
  SystemEvent,
  SystemEventType,
} from "../client/types";

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
