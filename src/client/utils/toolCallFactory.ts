import { ToolCallRequest } from '../types/shared';

export class ToolCallFactory {
  /**
   * Create a synthetic ToolCallRequest for server-side tool calls
   */
  static createServerToolCall(
    toolName: string,
    callId: string,
    parameters: Record<string, any> = {}
  ): ToolCallRequest {
    return {
      toolName,
      callId,
      parameters,
    };
  }

  /**
   * Create a synthetic ToolCallRequest for reasoning operations
   */
  static createReasoningCall(
    reasoningId: string,
    phase: 'thinking' | 'end',
    data: { text?: string; duration?: string; fullContent?: string }
  ): ToolCallRequest {
    return {
      toolName: 'reasoning',
      callId: reasoningId,
      parameters: { phase, ...data },
    };
  }

  /**
   * Create a synthetic ToolCallRequest for Latitude tool calls
   */
  static createLatitudeToolCall(
    toolName: string,
    toolCallId: string,
    args: Record<string, any> = {}
  ): ToolCallRequest {
    return {
      toolName,
      callId: toolCallId,
      parameters: args,
    };
  }
}