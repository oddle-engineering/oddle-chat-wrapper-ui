import { ToolCallRequest } from '../../types';
import { ChatEventHandlers } from '../types';

export class ReasoningHandler {
  private readonly reasoningStartTimes = new Map<string, number>();
  private readonly reasoningContent = new Map<string, string>();
  private onReasoningUpdate?: ChatEventHandlers['onReasoningUpdate'];

  constructor(onReasoningUpdate?: ChatEventHandlers['onReasoningUpdate']) {
    this.onReasoningUpdate = onReasoningUpdate;
  }

  handleReasoningStart(reasoningData: any): void {
    const reasoningId = reasoningData.id || "reasoning";
    
    this.reasoningStartTimes.set(reasoningId, Date.now());
    this.reasoningContent.set(reasoningId, "");
  }

  handleReasoningDelta(reasoningData: any): void {
    
    if (this.onReasoningUpdate && reasoningData.text) {
      const reasoningId = reasoningData.id || "reasoning";
      const existingContent = this.reasoningContent.get(reasoningId) || "";
      const newContent = existingContent + reasoningData.text;
      
      this.reasoningContent.set(reasoningId, newContent);
      
      const syntheticRequest: ToolCallRequest = {
        toolName: "reasoning",
        callId: reasoningId,
        parameters: { phase: "thinking", text: newContent },
      };
      
      this.onReasoningUpdate(true, `🧠 ${newContent}`, syntheticRequest);
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

    if (this.onReasoningUpdate) {
      const syntheticRequest: ToolCallRequest = {
        toolName: "reasoning",
        callId: reasoningId,
        parameters: {
          phase: "end",
          duration: durationText,
          fullContent: accumulatedContent,
        },
      };
      
      const contentToShow = accumulatedContent || "Thought";
      const finalContent = `🧠 ${contentToShow}${durationText}`;
      
      this.onReasoningUpdate(false, finalContent, syntheticRequest);
    }
    
    this.reasoningContent.delete(reasoningId);
  }

  setReasoningUpdateHandler(handler: ChatEventHandlers['onReasoningUpdate']): void {
    this.onReasoningUpdate = handler;
  }
}