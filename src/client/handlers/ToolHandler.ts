import { ToolCallRequest } from '../../types';
import { ChatEventHandlers } from '../types';
import { MessageFactory } from '../utils/messageFactory';
import { ToolCallFactory } from '../utils/toolCallFactory';
import { BaseHandler } from './BaseHandler';

export class ToolHandler extends BaseHandler {
  private readonly processedToolCalls = new Set<string>();
  private clientTools: Record<string, Function> = {};
  private sendMessage?: (data: string) => void;

  constructor(
    clientTools: Record<string, Function> = {},
    onReasoningUpdate?: ChatEventHandlers['onReasoningUpdate']
  ) {
    super({ onReasoningUpdate });
    this.clientTools = clientTools;
  }

  async handleToolCallRequest(request: ToolCallRequest): Promise<void> {
    const { callId, toolName, parameters } = request;
    

    if (this.processedToolCalls.has(callId)) {
      return;
    }
    
    this.processedToolCalls.add(callId);
    this.getHandler('onReasoningUpdate')?.(true, `🔧 Handling: ${toolName}`, request);

    try {
      const result = await this.executeToolFunction(toolName, parameters);
      this.sendToolResponse(callId, result);
      this.getHandler('onReasoningUpdate')?.(false, `✅ Completed: ${toolName}`, request);
    } catch (error) {
      this.sendToolError(callId, error);
      this.getHandler('onReasoningUpdate')?.(false, `❌ Error: ${toolName} - ${error}`, request);
    }
  }

  private async executeToolFunction(toolName: string, parameters: Record<string, any>): Promise<any> {
    const toolFunction = this.clientTools[toolName];
    
    if (!toolFunction) {
      throw new Error(`Tool not found: ${toolName}`);
    }

    const result = await toolFunction(parameters);
    
    return result;
  }

  private sendToolResponse(callId: string, result: any): void {
    if (!this.sendMessage) {
      return;
    }

    const message = MessageFactory.serializeToolCallSuccess(callId, result);
    this.sendMessage(message);
  }

  private sendToolError(callId: string, error: unknown): void {
    if (!this.sendMessage) {
      return;
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const message = MessageFactory.serializeToolCallError(callId, errorMessage);
    this.sendMessage(message);
  }

  handleServerToolCall(toolData: any): void {
    
    const onReasoningUpdate = this.getHandler('onReasoningUpdate');
    if (
      onReasoningUpdate &&
      toolData.toolName?.startsWith("lat_") &&
      toolData.toolCallId
    ) {
      const syntheticRequest = ToolCallFactory.createLatitudeToolCall(
        toolData.toolName,
        toolData.toolCallId,
        toolData.args || {}
      );
      
      onReasoningUpdate(true, `🔧 Handling: ${toolData.toolName}`, syntheticRequest);
    }
  }

  handleServerToolResult(toolData: any): void {
    
    const onReasoningUpdate = this.getHandler('onReasoningUpdate');
    if (
      onReasoningUpdate &&
      toolData.toolName?.startsWith("lat_") &&
      toolData.toolCallId
    ) {
      const syntheticRequest = ToolCallFactory.createLatitudeToolCall(
        toolData.toolName,
        toolData.toolCallId
      );
      
      onReasoningUpdate(
        false,
        `✅ Completed: ${toolData.toolName}`,
        syntheticRequest
      );
    }
  }

  clearProcessedToolCalls(): void {
    this.processedToolCalls.clear();
  }

  updateClientTools(tools: Record<string, Function>): void {
    this.clientTools = { ...this.clientTools, ...tools };
  }

  setSendMessageHandler(handler: (data: string) => void): void {
    this.sendMessage = handler;
  }

  setReasoningUpdateHandler(handler: ChatEventHandlers['onReasoningUpdate']): void {
    this.updateEventHandlers({ onReasoningUpdate: handler });
  }
}