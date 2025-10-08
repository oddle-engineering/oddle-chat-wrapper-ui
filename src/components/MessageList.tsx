import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="chat-wrapper__messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-wrapper__message chat-wrapper__message--${message.role}`}
        >
          <div className="chat-wrapper__message-content">
            {message.content}
            {message.isStreaming && (
              <span className="chat-wrapper__streaming-indicator">...</span>
            )}
          </div>
          <div className="chat-wrapper__message-timestamp">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}