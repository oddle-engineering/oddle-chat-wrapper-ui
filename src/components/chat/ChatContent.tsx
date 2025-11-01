import React, { RefObject } from 'react';
import { MessagesList } from '../MessagesList';
import { ChatInput, ChatInputRef } from '../ChatInput';
import { SuggestedPrompts } from '../SuggestedPrompts';
import { InlineLoader } from '../InlineLoader';
import { ChatMainHeader } from './ChatMainHeader';
import { Message, ClientTools } from '../../types';
import { chatUtils } from '../../utils/chatUtils';
import { ChatStatus } from '../../constants/chatStatus';

interface ChatContentProps {
  // Message data
  messages: Message[];
  isLoadingConversation: boolean;
  isStreaming: boolean;
  isThinking: boolean;
  isHandlingTool: boolean;
  
  // App configuration
  appName: string;
  description?: string;
  placeholder?: string;
  placeholderTexts?: string[];
  restaurantName?: string;
  restaurantLogo?: string;
  suggestedPrompts?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
  
  // Chat state
  chatStatus: ChatStatus;
  
  // Tools and reasoning
  clientTools?: ClientTools;
  getReasoningTitle: (content: string, isStreaming?: boolean) => string;
  getReasoningStatus: (content: string, isStreaming?: boolean) => "processing" | "completed" | "error";
  getReasoningDuration: (content: string) => string | undefined;
  getReasoningContentOnly: (content: string) => string;
  getToolingTitle: (content: string, isStreaming?: boolean) => string;
  getToolingStatus: (content: string, isStreaming?: boolean) => "processing" | "completed" | "error";
  currentAssistantMessageIdRef: RefObject<string | null>;
  
  // Features
  fileUploadEnabled?: boolean;
  
  // Event handlers
  onSubmit: (message: string, media?: string[]) => void;
  onFileUpload: (files: File[]) => Promise<string[]>;
  onStopGeneration: () => void;
  onPromptSelect?: (prompt: { description: string }) => void;
  
  // Refs
  messagesEndRef: RefObject<HTMLDivElement>;
  chatInputRef: RefObject<ChatInputRef>;
  
  // Error handling
  conversationError?: string | null;
}

export const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isLoadingConversation,
  isStreaming,
  isThinking,
  isHandlingTool,
  appName,
  description,
  placeholder,
  placeholderTexts,
  restaurantName,
  restaurantLogo,
  suggestedPrompts,
  chatStatus,
  clientTools,
  getReasoningTitle,
  getReasoningStatus,
  getReasoningDuration,
  getReasoningContentOnly,
  getToolingTitle,
  getToolingStatus,
  currentAssistantMessageIdRef,
  fileUploadEnabled,
  onSubmit,
  onFileUpload,
  onStopGeneration,
  onPromptSelect,
  messagesEndRef,
  chatInputRef,
  conversationError,
}) => {
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

  const handlePromptSelection = (prompt: { description: string }) => {
    if (onPromptSelect) {
      onPromptSelect(prompt);
    } else {
      // Default behavior: copy prompt description to input field
      if (chatInputRef.current) {
        chatInputRef.current.setText(prompt.description);
      }
    }
  };

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
        <ChatMainHeader appName={appName} description={description} />
      )}

      {/* Chat Content Area - flexible layout based on message state */}
      <div className={contentAreaClass}>
        {/* Messages Area */}
        {isLoadingConversation && messages.length === 0 ? (
          <div className="chat-wrapper__messages">
            <InlineLoader fullHeight={true} />
          </div>
        ) : (
          <MessagesList
            ref={messagesEndRef}
            messages={messages}
            isThinking={isThinking}
            isHandlingTool={isHandlingTool}
            getReasoningTitle={getReasoningTitle}
            getReasoningStatus={getReasoningStatus}
            getReasoningDuration={getReasoningDuration}
            getReasoningContentOnly={getReasoningContentOnly}
            getToolingTitle={getToolingTitle}
            getToolingStatus={getToolingStatus}
            clientTools={clientTools || []}
            currentAssistantMessageIdRef={currentAssistantMessageIdRef}
          />
        )}

        {/* Chat Input - flexible sizing */}
        <div className="chat-wrapper__input-container">
          <ChatInput
            ref={chatInputRef}
            placeholder={placeholder}
            placeholderTexts={placeholderTexts}
            disabled={isStreaming}
            chatStatus={chatStatus}
            fileUploadEnabled={fileUploadEnabled}
            restaurantName={restaurantName}
            restaurantLogo={restaurantLogo}
            hasMessages={messages.length > 0}
            onSubmit={(message, media) => onSubmit(message, media)}
            onFileUpload={onFileUpload}
            onStopGeneration={onStopGeneration}
          />
        </div>

        {/* Suggested Prompts - only show when no messages and not loading */}
        {shouldShowSuggestedPrompts && (
          <SuggestedPrompts
            prompts={suggestedPrompts!}
            onPromptSelect={handlePromptSelection}
          />
        )}
      </div>
    </>
  );
};