import { ToolCallRequest, ContextHelpers } from "./shared";
import { SystemEventHandler } from "./systemEvents";

/**
 * Payload emitted when the agent calls the universal `render_ui` tool.
 * The chat-ui-library converts this into a UI-component message rather than
 * executing it as a regular tool.
 */
export interface UIComponentRenderRequest {
  callId: string;
  componentName: string;
  props: Record<string, any>;
  status: "streaming" | "complete" | "error";
}

export interface WebSocketChatClientProps {
  // Authentication and server properties
  userMpAuthToken: string;
  chatServerUrl: string;
  chatServerKey: string;

  // Entity configuration
  entityId?: string;
  entityType?: string;

  // Existing properties
  toolSchemas?: any[];
  clientTools?: Record<string, Function>;
  componentSchemas?: any[]; // Generative-UI component schemas (JSON Schema form)
  contextHelpers: ContextHelpers;
  onSetMessage?: (char: string) => void;
  onSystemEvent?: SystemEventHandler;
  onReasoningUpdate?: (
    isThinking: boolean,
    content: string,
    toolCallRequest?: ToolCallRequest
  ) => void;
  onUIComponent?: (request: UIComponentRenderRequest) => void;
  onThreadCreated?: (data: {
    providerResId: string;
    threadId: string;
    canUpdateMetadata: boolean;
    updateEndpoint: string;
  }) => void;
  onMessagesPersisted?: (data: {
    threadId?: string;
    providerResId?: string;
  }) => void;
  onError?: (error: Error, classification?: { reason: string; errorType: string }) => void;
}

export interface ChatEventHandlers {
  onSetMessage?: (char: string) => void;
  onSystemEvent?: SystemEventHandler;
  onReasoningUpdate?: (
    isThinking: boolean,
    content: string,
    request: ToolCallRequest
  ) => void;
  onUIComponent?: (request: UIComponentRenderRequest) => void;
  onThreadCreated?: (data: {
    providerResId: string;
    threadId: string;
    canUpdateMetadata: boolean;
    updateEndpoint: string;
  }) => void;
  onMessagesPersisted?: (data: {
    threadId?: string;
    providerResId?: string;
  }) => void;
}

export interface ReasoningEvent {
  id: string;
  type: 'start' | 'delta' | 'end';
  text?: string;
  duration?: string;
}

export interface TriggerMessageParams {
  message: string;
  media?: string[];
  providerResId?: string;
  mcpHeaders?: { [key: string]: Record<string, string> };
}

export interface ChatPayload {
  type: string;
  content: string;
  media: string[];
  userId?: string;
  providerResId?: string;
}