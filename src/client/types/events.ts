import { ToolCallRequest, ContextHelpers } from "./shared";
import { SystemEventHandler } from "./systemEvents";

export interface WebSocketChatClientProps {
  // Authentication and server properties
  userMpAuthToken: string;
  chatServerUrl: string;
  chatServerKey: string;
  
  // Entity configuration
  providerResId?: string;
  userId: string;
  entityId?: string;
  entityType?: string;
  
  // Existing properties
  toolSchemas?: any[];
  clientTools?: Record<string, Function>;
  contextHelpers: ContextHelpers;
  onSetMessage?: (char: string) => void;
  onSystemEvent?: SystemEventHandler;
  onReasoningUpdate?: (
    isThinking: boolean,
    content: string,
    toolCallRequest?: ToolCallRequest
  ) => void;
}

export interface ChatEventHandlers {
  onSetMessage?: (char: string) => void;
  onSystemEvent?: SystemEventHandler;
  onReasoningUpdate?: (
    isThinking: boolean,
    content: string,
    request: ToolCallRequest
  ) => void;
}

export interface ReasoningEvent {
  id: string;
  type: 'start' | 'delta' | 'end';
  text?: string;
  duration?: string;
}

export interface TriggerMessageParams {
  message: string;
  app?: string;
  media?: string[];
  convUuid?: string;
  agentPromptPath?: string;
}

export interface ChatPayload {
  type: string;
  content: string;
  app: string;
  media: string[];
  saveToDatabase: boolean;
  userId?: string;
  convUuid?: string;
  agentPromptPath?: string;
}