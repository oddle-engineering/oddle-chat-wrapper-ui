import React, { forwardRef } from "react";
import { Message } from "../types";
import { MessageItem } from "./MessageItem";
import { ThinkingBubble } from "./ThinkingBubble";

interface MessagesListProps {
  messages: Message[];
  isThinking: boolean;
  isHandlingTool: boolean;
  getReasoningTitle: (content: string, isStreaming?: boolean) => string;
  getReasoningStatus: (
    content: string,
    isStreaming?: boolean
  ) => "processing" | "completed" | "error";
  getReasoningDuration: (content: string) => string | undefined;
  getReasoningContentOnly: (content: string) => string;
  getToolingTitle: (content: string, isStreaming?: boolean) => string;
  getToolingStatus: (
    content: string,
    isStreaming?: boolean
  ) => "processing" | "completed" | "error";
  clientTools: any[];
  currentAssistantMessageIdRef: React.MutableRefObject<string | null>;
}

export const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(({
  messages,
  isThinking,
  isHandlingTool,
  getReasoningTitle,
  getReasoningStatus,
  getReasoningDuration,
  getReasoningContentOnly,
  getToolingTitle,
  getToolingStatus,
  clientTools,
  currentAssistantMessageIdRef,
}, ref) => {
  return (
    <div className="chat-wrapper__messages">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          getReasoningTitle={getReasoningTitle}
          getReasoningStatus={getReasoningStatus}
          getReasoningDuration={getReasoningDuration}
          getReasoningContentOnly={getReasoningContentOnly}
          getToolingTitle={getToolingTitle}
          getToolingStatus={getToolingStatus}
          clientTools={clientTools}
          currentAssistantMessageIdRef={currentAssistantMessageIdRef}
        />
      ))}
      
      {/* Thinking bubble for assistant streaming */}
      <ThinkingBubble isVisible={isThinking && !isHandlingTool} />
      
      {/* Scroll anchor */}
      <div ref={ref} />
    </div>
  );
});

MessagesList.displayName = "MessagesList";