// Shared types used across client and main application

export interface ToolCallRequest {
  toolName: string;
  parameters: Record<string, any>;
  callId: string;
}

export interface ContextHelpers {
  /** Locale for translations (default: 'en') */
  locale?: string;
  /** Additional context data */
  [key: string]: any;
}