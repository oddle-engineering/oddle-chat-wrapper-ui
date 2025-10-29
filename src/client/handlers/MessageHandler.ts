import { WebSocketMessage, ToolCallRequest } from '../../types';
import { 
  ChatEventHandlers,
  InboundMessageType,
  ChatEventType,
  ProviderEventType,
} from '../types';
import { ReasoningHandler } from './ReasoningHandler';
import { ToolHandler } from './ToolHandler';
import { SystemEventFactory } from '../utils/eventFactory';
import { MessageFactory } from '../utils/messageFactory';
import { ToolCallFactory } from '../utils/toolCallFactory';

export class MessageHandler {
  private reasoningHandler: ReasoningHandler;
  private toolHandler: ToolHandler;
  private handlers: ChatEventHandlers;
  private sendMessage?: (data: string) => void;

  constructor(
    handlers: ChatEventHandlers,
    clientTools: Record<string, Function> = {}
  ) {
    this.handlers = handlers;
    this.reasoningHandler = new ReasoningHandler(handlers.onReasoningUpdate);
    this.toolHandler = new ToolHandler(clientTools, handlers.onReasoningUpdate);
  }

  handleMessage(event: MessageEvent): WebSocketMessage | null {
    try {
      const data: WebSocketMessage = JSON.parse(event.data);
      
      switch (data.type) {
        case InboundMessageType.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case InboundMessageType.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case InboundMessageType.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case InboundMessageType.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case InboundMessageType.CHAT_EVENT:
          this.handleChatEvent(data);
          break;
        case InboundMessageType.CHAT_FINISHED:
          this.handleChatFinished(data);
          break;
        case InboundMessageType.CHAT_ERROR:
          this.handleChatError(data);
          break;
        case InboundMessageType.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(data as ToolCallRequest);
          break;
        case InboundMessageType.BUSINESS_DATA_UPDATE:
          this.handleBusinessDataUpdate(data);
          break;
        case InboundMessageType.HEARTBEAT_PING:
          this.handleHeartbeatPing(data);
          break;
        case InboundMessageType.HEARTBEAT_ACK:
          // Heartbeat acknowledged
          break;
        case InboundMessageType.ERROR:
          this.handleError(data);
          break;
        default:
          // Handle unknown message types
          break;
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  private handleSessionEstablished(): void {
    // Session establishment is handled by the main client
  }

  private handleToolsConfigured(): void {
    // Tools configured event - handled internally
  }

  private handleClientToolsUpdated(): void {
    // Client tools updated event - handled internally
  }

  private handleConfigureToolsRequest(): void {
    // Configure tools request - handled internally
  }

  private handleChatEvent(data: WebSocketMessage): void {
    switch (data.event) {
      case ChatEventType.PROVIDER_EVENT:
        this.handleProviderEvent(data);
        break;
      case ChatEventType.LATITUDE_EVENT:
        this.handleLatitudeEvent(data);
        break;
      case ChatEventType.CONTENT_DELTA:
        if (data.data?.delta) {
          this.handlers.onSetMessage?.(data.data.delta);
        }
        break;
      default:
        // Handle unknown chat event types
        break;
    }
  }

  private handleProviderEvent(data: WebSocketMessage): void {
    const eventType = data.data?.type;
    
    switch (eventType) {
      case ProviderEventType.TEXT_DELTA:
        if (data.data.textDelta) {
          this.handlers.onSetMessage?.(data.data.textDelta);
        }
        break;
      case ProviderEventType.REASONING_START:
        this.reasoningHandler.handleReasoningStart(data.data);
        break;
      case ProviderEventType.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(data.data);
        break;
      case ProviderEventType.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(data.data);
        break;
      case ProviderEventType.TOOL_CALL:
        this.toolHandler.handleServerToolCall(data.data);
        break;
      case ProviderEventType.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(data.data);
        break;
      default:
        // Handle unknown provider event types
        break;
    }
  }

  private handleLatitudeEvent(data: WebSocketMessage): void {
    
    if (data.data?.type === ProviderEventType.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const toolResultData = data.data;
      
      if (toolResultData.toolCallId && toolResultData.toolName) {
        const syntheticRequest = ToolCallFactory.createServerToolCall(
          toolResultData.toolName,
          toolResultData.toolCallId
        );
        
        this.handlers.onReasoningUpdate(
          false,
          `✅ Completed: ${toolResultData.toolName}`,
          syntheticRequest
        );
      }
    }
  }

  private handleChatFinished(data: WebSocketMessage): void {
    this.handlers.onSystemEvent?.(SystemEventFactory.chatCompleted(data.uuid));
  }

  private handleChatError(data: WebSocketMessage): void {
    this.handlers.onSystemEvent?.(SystemEventFactory.chatError(data.error || 'Unknown error'));
  }

  private handleToolCallRequest(request: ToolCallRequest): void {
    this.toolHandler.handleToolCallRequest(request);
  }

  private handleBusinessDataUpdate(data: WebSocketMessage): void {
    
    if (this.handlers.onBusinessDataUpdate) {
      this.handlers.onBusinessDataUpdate(data.data);
    }
    
    // Business data update handled by onBusinessDataUpdate callback
  }

  private handleHeartbeatPing(data: WebSocketMessage): void {
    if (!this.sendMessage) {
      return;
    }

    const message = MessageFactory.serializeHeartbeatPong(
      data.timestamp,
      data.pingTime
    );
    this.sendMessage(message);
  }

  private handleError(data: WebSocketMessage): void {
    this.handlers.onSystemEvent?.(SystemEventFactory.chatError(data.error || 'Unknown WebSocket error'));
  }

  updateClientTools(tools: Record<string, Function>): void {
    this.toolHandler.updateClientTools(tools);
  }

  clearProcessedToolCalls(): void {
    this.toolHandler.clearProcessedToolCalls();
  }

  setSendMessageHandler(handler: (data: string) => void): void {
    this.sendMessage = handler;
    this.toolHandler.setSendMessageHandler(handler);
  }

  updateEventHandlers(handlers: Partial<ChatEventHandlers>): void {
    Object.assign(this.handlers, handlers);
    
    // Update all sub-handlers
    this.reasoningHandler.updateEventHandlers(handlers);
    this.toolHandler.updateEventHandlers(handlers);
  }
}