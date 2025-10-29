import { ChatEventHandlers } from '../types';
import { ToolCallFactory } from '../utils/toolCallFactory';
import { BaseHandler } from './BaseHandler';

export class ReasoningHandler extends BaseHandler {
  private readonly reasoningStartTimes = new Map<string, number>();
  private readonly reasoningContent = new Map<string, string>();

  constructor(onReasoningUpdate?: ChatEventHandlers['onReasoningUpdate']) {
    super({ onReasoningUpdate });
  }

  protected onHandlersUpdated(_handlers: Partial<ChatEventHandlers>): void {
    // No additional logic needed for reasoning handler
  }

  handleReasoningStart(reasoningData: any): void {
    const reasoningId = reasoningData.id || "reasoning";
    
    this.reasoningStartTimes.set(reasoningId, Date.now());
    this.reasoningContent.set(reasoningId, "");
  }

  handleReasoningDelta(reasoningData: any): void {
    
    if (this.getHandler('onReasoningUpdate') && reasoningData.text) {
      const reasoningId = reasoningData.id || "reasoning";
      const existingContent = this.reasoningContent.get(reasoningId) || "";
      const newContent = existingContent + reasoningData.text;
      
      this.reasoningContent.set(reasoningId, newContent);
      
      const syntheticRequest = ToolCallFactory.createReasoningCall(
        reasoningId,
        'thinking',
        { text: newContent }
      );
      
      this.getHandler('onReasoningUpdate')?.(true, `🧠 ${newContent}`, syntheticRequest);
    }
  }

  handleReasoningEnd(reasoningData: any): void {
    
    const reasoningId = reasoningData.id || "reasoning";
    const accumulatedContent = this.reasoningContent.get(reasoningId) || "";
    const startTime = this.reasoningStartTimes.get(reasoningId);
    
    let durationText = "";
    if (startTime) {
      const duration = (Date.now() - startTime) / 1000;
      durationText = ` for ${duration.toFixed(1)} seconds`;
      this.reasoningStartTimes.delete(reasoningId);
    }

    const onReasoningUpdate = this.getHandler('onReasoningUpdate');
    if (onReasoningUpdate) {
      const syntheticRequest = ToolCallFactory.createReasoningCall(
        reasoningId,
        'end',
        { duration: durationText, fullContent: accumulatedContent }
      );
      
      const contentToShow = accumulatedContent || "Thought";
      const finalContent = `🧠 ${contentToShow}${durationText}`;
      
      onReasoningUpdate(false, finalContent, syntheticRequest);
    }
    
    this.reasoningContent.delete(reasoningId);
  }

  setReasoningUpdateHandler(handler: ChatEventHandlers['onReasoningUpdate']): void {
    this.updateEventHandlers({ onReasoningUpdate: handler });
  }
}