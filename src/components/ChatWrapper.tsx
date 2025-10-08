import { useEffect } from 'react';
import { ChatConfig } from '../types';
import { useChatConnection } from '../hooks/useChatConnection';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import clsx from 'clsx';

export function ChatWrapper(config: ChatConfig) {
  const { messages, isLoading, error, sendMessage } = useChatConnection(
    config.apiEndpoint,
    config.apiKey
  );

  useEffect(() => {
    if (config.onError && error) {
      config.onError(error);
    }
  }, [error, config]);

  const containerClasses = clsx(
    'chat-wrapper',
    `chat-wrapper--${config.mode}`,
    config.position && `chat-wrapper--${config.position}`,
    config.theme && `chat-wrapper--${config.theme}`
  );

  return (
    <div className={containerClasses} style={config.customStyles}>
      <div className="chat-wrapper__header">
        <h2 className="chat-wrapper__title">{config.appName}</h2>
      </div>
      
      <MessageList messages={messages} />
      
      <MessageInput
        onSend={sendMessage}
        disabled={isLoading}
        placeholder={config.placeholder || 'Type a message...'}
      />
      
      {error && (
        <div className="chat-wrapper__error">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}