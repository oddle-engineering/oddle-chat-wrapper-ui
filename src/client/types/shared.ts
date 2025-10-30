// Shared types used across client and main application

export interface ToolCallRequest {
  toolName: string;
  parameters: Record<string, any>;
  callId: string;
}

export interface ContextHelpers {
  [key: string]: any;
}