import { ToolCallRequest } from '../types/shared';
import { ChatEventHandlers } from '../types';
import { MessageFactory } from '../utils/messageFactory';
import { ToolCallFactory } from '../utils/toolCallFactory';
import { BaseHandler } from './BaseHandler';
import { REASONING_CONSTANTS } from '../constants/reasoning';

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
    
    console.log(`🔧 [ToolHandler] Server requested client tool execution:`, {
      callId,
      toolName,
      parameters,
      timestamp: new Date().toISOString(),
      availableTools: Object.keys(this.clientTools),
    });

    if (this.processedToolCalls.has(callId)) {
      console.log(`⚠️ [ToolHandler] Tool call already processed, skipping:`, { callId, toolName });
      return;
    }
    
    this.processedToolCalls.add(callId);
    
    console.log(`▶️ [ToolHandler] Starting tool execution:`, { callId, toolName });
    this.getHandler('onReasoningUpdate')?.(true, `${REASONING_CONSTANTS.HANDLING_MARKER} ${toolName}`, request);

    try {
      console.log(`🚀 [ToolHandler] Executing tool function:`, { callId, toolName, parameters });
      const result = await this.executeToolFunction(toolName, parameters);
      
      console.log(`✅ [ToolHandler] Tool execution successful:`, { 
        callId, 
        toolName, 
        result: typeof result === 'object' ? JSON.stringify(result) : result,
        resultType: typeof result,
        timestamp: new Date().toISOString(),
      });
      
      this.sendToolResponse(callId, result);
      this.getHandler('onReasoningUpdate')?.(false, `${REASONING_CONSTANTS.COMPLETED_MARKER} ${toolName}`, request);
    } catch (error) {
      console.error(`❌ [ToolHandler] Tool execution failed:`, { 
        callId, 
        toolName, 
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });
      
      this.sendToolError(callId, error);
      this.getHandler('onReasoningUpdate')?.(false, `${REASONING_CONSTANTS.ERROR_MARKER} Error: ${toolName} - ${error}`, request);
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
      console.warn(`⚠️ [ToolHandler] No sendMessage handler available to send response:`, { callId, result });
      return;
    }

    console.log(`📤 [ToolHandler] Sending tool response to server:`, { 
      callId, 
      result: typeof result === 'object' ? JSON.stringify(result) : result,
      timestamp: new Date().toISOString(),
    });

    const message = MessageFactory.serializeToolCallSuccess(callId, result);
    this.sendMessage(message);
    
    console.log(`✉️ [ToolHandler] Tool response sent to server:`, { callId });
  }

  private sendToolError(callId: string, error: unknown): void {
    if (!this.sendMessage) {
      console.warn(`⚠️ [ToolHandler] No sendMessage handler available to send error:`, { callId, error });
      return;
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    console.log(`📤❌ [ToolHandler] Sending tool error to server:`, { 
      callId, 
      errorMessage,
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      timestamp: new Date().toISOString(),
    });

    const message = MessageFactory.serializeToolCallError(callId, errorMessage);
    this.sendMessage(message);
    
    console.log(`✉️❌ [ToolHandler] Tool error sent to server:`, { callId, errorMessage });
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
      
      onReasoningUpdate(true, `${REASONING_CONSTANTS.HANDLING_MARKER} ${toolData.toolName}`, syntheticRequest);
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
        `${REASONING_CONSTANTS.COMPLETED_MARKER} ${toolData.toolName}`,
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