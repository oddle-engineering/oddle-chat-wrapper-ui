import { forwardRef } from "react";
import { MessageItem } from "./MessageItem";
import { ThinkingBubble } from "./ThinkingBubble";
import { useChatContext } from "../contexts";

/**
 * MessagesList - Displays the list of chat messages
 * 
 * Uses ChatContext to access all message-related state and functions.
 * No props needed - all data comes from context.
 */
export const MessagesList = forwardRef<HTMLDivElement>((_, ref) => {
  const {
    messages,
    isThinking,
    isHandlingTool,
  } = useChatContext();

  return (
    <div className="chat-wrapper__messages">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
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