import { ToolCallRequest } from '../types/shared';
import { ChatEventHandlers } from '../types';
import { MessageFactory } from '../utils/messageFactory';
import { ToolCallFactory } from '../utils/toolCallFactory';
import { BaseHandler } from './BaseHandler';
import { REASONING_CONSTANTS } from '../constants/reasoning';

/**
 * Tool name reserved for the universal generative-UI render tool.
 * The chat-server auto-resolves this tool and emits a dedicated `ui_component`
 * message to the client — it should NOT arrive here as a tool_call_request.
 */
export const RENDER_UI_TOOL_NAME = 'render_ui';

export class ToolHandler extends BaseHandler {
  private readonly processedToolCalls = new Set<string>();
  private clientTools: Record<string, Function> = {};
  private sendMessage?: (data: string) => void;

  constructor(
    clientTools: Record<string, Function> = {},
    onReasoningUpdate?: ChatEventHandlers['onReasoningUpdate'],
    onUIComponent?: ChatEventHandlers['onUIComponent']
  ) {
    super({ onReasoningUpdate, onUIComponent });
    this.clientTools = clientTools;
  }

  async handleToolCallRequest(request: ToolCallRequest): Promise<void> {
    const { callId, toolName, parameters } = request;

    if (this.processedToolCalls.has(callId)) {
      return;
    }

    this.processedToolCalls.add(callId);

    // Defensive: if the server ever forwards `render_ui` as a tool_call_request
    // (it shouldn't — generative UI is delivered via the `ui_component` message),
    // skip executing it as a real tool and ack synthetically so the agent
    // doesn't hang. The actual render is driven by `ui_component`.
    if (toolName === RENDER_UI_TOOL_NAME) {
      this.sendToolResponse(callId, { rendered: true });
      return;
    }

    this.getHandler('onReasoningUpdate')?.(true, `${REASONING_CONSTANTS.HANDLING_MARKER} ${toolName}`, request);

    try {
      const result = await this.executeToolFunction(toolName, parameters);
      this.sendToolResponse(callId, result);
      this.getHandler('onReasoningUpdate')?.(false, `${REASONING_CONSTANTS.COMPLETED_MARKER} ${toolName}`, request);
    } catch (error) {
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