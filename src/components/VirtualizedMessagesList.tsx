import { forwardRef } from 'react';
import { VirtualizedMessageList } from './VirtualizedMessageList';
import { MessageItem } from './MessageItem';
import { ThinkingBubble } from './ThinkingBubble';
import { useChatContext } from '../contexts';

/**
 * VirtualizedMessagesList - Wrapper that combines VirtualizedMessageList with ThinkingBubble
 * 
 * This component handles the display of messages using virtualization for performance,
 * and includes the thinking bubble for streaming states. Only uses virtualization
 * when there are many messages (50+) to avoid UI changes for smaller conversations.
 */
export const VirtualizedMessagesList = forwardRef<HTMLDivElement, {
  height: number;
  className?: string;
}>((props, ref) => {
  const {
    messages,
    isThinking,
    isHandlingTool,
  } = useChatContext();

  // Only use virtualization for large message lists to avoid UI changes
  const shouldUseVirtualization = messages.length > 50;

  if (!shouldUseVirtualization) {
    // Use traditional list for smaller conversations
    return (
      <div className={props.className || "chat-wrapper__messages"}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <ThinkingBubble isVisible={isThinking && !isHandlingTool} />
        <div ref={ref} />
      </div>
    );
  }

  // Use virtualization for large lists
  return (
    <div style={{ position: 'relative', height: props.height }}>
      <VirtualizedMessageList
        messages={messages}
        height={props.height - 60} // Reserve space for thinking bubble
        className={props.className}
      />
      {/* Thinking bubble rendered outside virtualized area */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px'
      }}>
        <ThinkingBubble isVisible={isThinking && !isHandlingTool} />
      </div>
      {/* Hidden scroll anchor for external scroll control */}
      <div ref={ref} style={{ position: 'absolute', bottom: 0, height: 1 }} />
    </div>
  );
});

VirtualizedMessagesList.displayName = 'VirtualizedMessagesList';