import { forwardRef, useMemo } from "react";
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

  // Find the most recent ui-component that the user hasn't yet replied to.
  // Walk back from the end: if we hit a user message first, every prior
  // ui-component is already answered. Interactive cards (e.g. AskUserInputV0)
  // use this to stay unlocked when they're the active question — including
  // when rehydrated from history as the last message in an unanswered thread.
  const latestUnansweredCallId = useMemo<string | null>(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role === "user") return null;
      if (m.role === "ui-component" && m.uiComponent?.callId) {
        return m.uiComponent.callId;
      }
    }
    return null;
  }, [messages]);

  return (
    <div className="chat-wrapper__messages">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isLatestUiComponent={
            !!message.uiComponent?.callId &&
            message.uiComponent.callId === latestUnansweredCallId
          }
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