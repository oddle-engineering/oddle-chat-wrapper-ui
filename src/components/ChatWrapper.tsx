import { useEffect } from 'react';
import { ChatWrapperProps } from '../types';
import { useChatConnection } from '../hooks/useChatConnection';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import '../styles/chat-wrapper.css';

export function ChatWrapper({ apiUrl, config, tools }: ChatWrapperProps) {
  const { messages, isLoading, error, sendMessage } = useChatConnection(
    apiUrl,
    config.apiKey
  );

  // Log available tools for debugging (tools will be used by the chat API)
  if (tools && Object.keys(tools).length > 0) {
    console.log('Available tools:', Object.keys(tools));
  }

  useEffect(() => {
    if (config.onError && error) {
      config.onError(error);
    }
  }, [error, config]);

  // Build CSS classes without external library
  const buildClasses = (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(' ');
  };

  const containerClasses = buildClasses(
    'chat-wrapper',
    `chat-wrapper--${config.mode}`,
    config.position && `chat-wrapper--${config.position}`,
    config.theme && `chat-wrapper--${config.theme}`
  );

  // Render modal overlay if needed
  const renderModalOverlay = () => {
    if (config.mode === 'modal') {
      return <div className="chat-wrapper-overlay" />;
    }
    return null;
  };

  return (
    <>
      {renderModalOverlay()}
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
    </>
  );
}