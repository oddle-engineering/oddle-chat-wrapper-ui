import { ContextHelpers } from '../types/shared';
import {
  OutboundMessageType,
  ChatMessage,
  OutboundConfigureToolsMessage,
  UpdateToolsMessage,
  UpdateContextHelpersMessage,
  ToolCallResponseMessage,
  OutboundHeartbeatPingMessage,
  HeartbeatPongMessage,
  OutboundMessage,
} from '../types/outboundMessages';

export class MessageFactory {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(params: {
    content: string;
    media?: string[];
    userId?: string;
    providerResId?: string;
  }): ChatMessage {
    return {
      type: OutboundMessageType.CHAT_MESSAGE,
      content: params.content,
      media: params.media || [],
      userId: params.userId,
      providerResId: params.providerResId,
    };
  }

  /**
   * Create a configure tools message
   */
  static createConfigureToolsMessage(
    toolSchemas: any[],
    contextHelpers: ContextHelpers
  ): OutboundConfigureToolsMessage {
    return {
      type: OutboundMessageType.CONFIGURE_TOOLS,
      toolSchemas,
      contextHelpers,
    };
  }

  /**
   * Create an update tools message
   */
  static createUpdateToolsMessage(toolSchemas: any[]): UpdateToolsMessage {
    return {
      type: OutboundMessageType.UPDATE_TOOLS,
      toolSchemas,
    };
  }

  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(
    contextHelpers: ContextHelpers
  ): UpdateContextHelpersMessage {
    return {
      type: OutboundMessageType.UPDATE_CONTEXT_HELPERS,
      contextHelpers,
    };
  }

  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(
    callId: string,
    result: any
  ): ToolCallResponseMessage {
    return {
      type: OutboundMessageType.TOOL_CALL_RESPONSE,
      callId,
      result,
    };
  }

  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(
    callId: string,
    error: string
  ): ToolCallResponseMessage {
    return {
      type: OutboundMessageType.TOOL_CALL_RESPONSE,
      callId,
      error,
    };
  }

  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing(): OutboundHeartbeatPingMessage {
    return {
      type: OutboundMessageType.HEARTBEAT_PING,
      timestamp: new Date().toISOString(),
      pingTime: Date.now(),
    };
  }

  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(
    originalTimestamp?: string,
    pingTime?: string | number
  ): HeartbeatPongMessage {
    return {
      type: OutboundMessageType.HEARTBEAT_PONG,
      timestamp: new Date().toISOString(),
      originalTimestamp,
      pingTime,
    };
  }

  /**
   * Serialize a message to JSON string for sending over WebSocket
   */
  static serialize(message: OutboundMessage): string {
    return JSON.stringify(message);
  }

  /**
   * Generic helper to create and serialize any message in one call
   */
  private static createAndSerialize<T extends OutboundMessage>(
    creator: () => T
  ): string {
    return this.serialize(creator());
  }

  /**
   * Helper methods to create and serialize messages in one call
   */
  static serializeChatMessage(params: {
    content: string;
    media?: string[];
    userId?: string;
    providerResId?: string;
  }): string {
    return this.createAndSerialize(() => this.createChatMessage(params));
  }

  static serializeConfigureTools(
    toolSchemas: any[],
    contextHelpers: ContextHelpers
  ): string {
    return this.createAndSerialize(() => 
      this.createConfigureToolsMessage(toolSchemas, contextHelpers)
    );
  }

  static serializeUpdateTools(toolSchemas: any[]): string {
    return this.createAndSerialize(() => this.createUpdateToolsMessage(toolSchemas));
  }

  static serializeUpdateContextHelpers(contextHelpers: ContextHelpers): string {
    return this.createAndSerialize(() => 
      this.createUpdateContextHelpersMessage(contextHelpers)
    );
  }

  static serializeToolCallSuccess(callId: string, result: any): string {
    return this.createAndSerialize(() => 
      this.createToolCallSuccessResponse(callId, result)
    );
  }

  static serializeToolCallError(callId: string, error: string): string {
    return this.createAndSerialize(() => 
      this.createToolCallErrorResponse(callId, error)
    );
  }

  static serializeHeartbeatPing(): string {
    return this.createAndSerialize(() => this.createHeartbeatPing());
  }

  static serializeHeartbeatPong(
    originalTimestamp?: string,
    pingTime?: string | number
  ): string {
    return this.createAndSerialize(() => 
      this.createHeartbeatPong(originalTimestamp, pingTime)
    );
  }
}