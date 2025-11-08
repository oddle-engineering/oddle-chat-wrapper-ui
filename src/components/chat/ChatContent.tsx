import React from 'react';
import { MessagesList } from '../MessagesList';
import { ChatInput } from '../ChatInput';
import { SuggestedPrompts } from '../SuggestedPrompts';
import { InlineLoader } from '../InlineLoader';
import { ChatMainHeader } from './ChatMainHeader';
import { chatUtils } from '../../utils/chatUtils';
import { useChatContext } from '../../contexts';

/**
 * ChatContent - Main content area of the chat interface
 * 
 * Now uses ChatContext instead of props to access all chat state and actions.
 * This eliminates the need to pass 28+ props through the component hierarchy.
 * 
 * All data is accessed via useChatContext() hook.
 */
export const ChatContent: React.FC = () => {
  // Get all required data from context instead of props
  const {
    messages,
    isLoadingConversation,
    isStreaming,
    headerName,
    headerDescription,
    suggestedPrompts,
    messagesEndRef,
    chatInputRef,
    conversationError,
  } = useChatContext();
  const shouldShowMainHeader = chatUtils.state.shouldShowMainHeader(
    messages.length,
    isStreaming,
    isLoadingConversation
  );

  const shouldShowSuggestedPrompts = chatUtils.state.shouldShowSuggestedPrompts(
    messages.length,
    isStreaming,
    isLoadingConversation,
    suggestedPrompts
  );

  const contentAreaClass = chatUtils.state.getContentAreaClass(
    messages.length,
    isStreaming,
    isLoadingConversation
  );

  return (
    <>
      {/* Conversation error message */}
      {conversationError && (
        <div className="chat-wrapper__conversation-error">
          <p>⚠️ {conversationError}</p>
        </div>
      )}

      {/* Main Header Section - only show when no messages and not loading */}
      {shouldShowMainHeader && (
        <ChatMainHeader headerName={headerName} headerDescription={headerDescription} />
      )}

      {/* Chat Content Area - flexible layout based on message state */}
      <div className={contentAreaClass}>
        {/* Messages Area */}
        {isLoadingConversation && messages.length === 0 ? (
          <div className="chat-wrapper__messages">
            <InlineLoader fullHeight={true} />
          </div>
        ) : (
          <MessagesList ref={messagesEndRef} />
        )}

        {/* Chat Input - flexible sizing */}
        <div className="chat-wrapper__input-container">
          <ChatInput ref={chatInputRef} />
        </div>

        {/* Suggested Prompts - only show when no messages and not loading */}
        {shouldShowSuggestedPrompts && <SuggestedPrompts />}
      </div>
    </>
  );
};