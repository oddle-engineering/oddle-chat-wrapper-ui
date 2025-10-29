import { ToolCallRequest, ContextHelpers } from "../../types";
import { SystemEventHandler } from "./systemEvents";

export interface WebSocketChatClientProps {
  apiUrl?: string;
  userId?: string;
  toolSchemas?: any[];
  clientTools?: Record<string, Function>;
  contextHelpers: ContextHelpers;
  onSetMessage?: (char: string) => void;
  onSystemEvent?: SystemEventHandler;
  onBusinessDataUpdate?: (data: any) => void;
  onReasoningUpdate?: (
    isThinking: boolean,
    content: string,
    toolCallRequest?: ToolCallRequest
  ) => void;
}

export interface ChatEventHandlers {
  onSetMessage?: (char: string) => void;
  onSystemEvent?: SystemEventHandler;
  onBusinessDataUpdate?: (data: any) => void;
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