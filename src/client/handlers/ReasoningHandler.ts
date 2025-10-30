import { ChatEventHandlers } from '../types';
import { ToolCallFactory } from '../utils/toolCallFactory';
import { BaseHandler } from './BaseHandler';
import { REASONING_CONSTANTS } from '../constants/reasoning';

export class ReasoningHandler extends BaseHandler {
  private readonly reasoningStartTimes = new Map<string, number>();
  private readonly reasoningContent = new Map<string, string>();

  constructor(onReasoningUpdate?: ChatEventHandlers['onReasoningUpdate']) {
    super({ onReasoningUpdate });
  }

  protected onHandlersUpdated(_handlers: Partial<ChatEventHandlers>): void {
    // No additional logic needed for reasoning handler
  }

  private triggerReasoningUpdate(
    isStreaming: boolean,
    content: string,
    reasoningId: string,
    type: 'thinking' | 'end',
    metadata?: Record<string, any>
  ): void {
    const handler = this.getHandler('onReasoningUpdate');
    if (!handler) return;

    const syntheticRequest = ToolCallFactory.createReasoningCall(
      reasoningId,
      type,
      metadata || {}
    );

    handler(isStreaming, content, syntheticRequest);
  }

  handleReasoningStart(reasoningData: any): void {
    const reasoningId = reasoningData.id || "reasoning";
    
    this.reasoningStartTimes.set(reasoningId, Date.now());
    this.reasoningContent.set(reasoningId, "");
  }

  handleReasoningDelta(reasoningData: any): void {
    if (!reasoningData.text) return;

    const reasoningId = reasoningData.id || "reasoning";
    const existingContent = this.reasoningContent.get(reasoningId) || "";
    const newContent = existingContent + reasoningData.text;
    
    this.reasoningContent.set(reasoningId, newContent);
    
    const formattedContent = `${REASONING_CONSTANTS.THINKING_PREFIX} ${newContent}`;
    this.triggerReasoningUpdate(
      true,
      formattedContent,
      reasoningId,
      'thinking',
      { text: newContent }
    );
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

    const contentToShow = accumulatedContent || REASONING_CONSTANTS.UI_TEXT.THOUGHT;
    const finalContent = `${REASONING_CONSTANTS.THOUGHT_PREFIX} ${contentToShow}${durationText}`;
    
    this.triggerReasoningUpdate(
      false,
      finalContent,
      reasoningId,
      'end',
      { duration: durationText, fullContent: accumulatedContent }
    );
    
    this.reasoningContent.delete(reasoningId);
  }

  setReasoningUpdateHandler(handler: ChatEventHandlers['onReasoningUpdate']): void {
    this.updateEventHandlers({ onReasoningUpdate: handler });
  }
}