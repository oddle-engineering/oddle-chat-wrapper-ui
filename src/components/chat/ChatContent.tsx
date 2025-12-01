import React, { useMemo } from "react";
import { VirtualizedMessagesList } from "../VirtualizedMessagesList";
import { ChatInput } from "../ChatInput";
import { SuggestedPrompts } from "../SuggestedPrompts";
import { InlineLoader } from "../InlineLoader";
import { ChatMainHeader } from "./ChatMainHeader";
import { chatUtils } from "../../utils/chatUtils";
import { useChatContext } from "../../contexts";

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
    isOffline,
    // conversationError,
  } = useChatContext();

  // Calculate height for virtualized list (approximate height minus headers, inputs, etc)
  const virtualizedHeight = useMemo(() => {
    // Base container height minus estimated space for header, input, etc.
    return 400; // This could be made dynamic based on container size
  }, []);
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
      {/* Main Header Section - only show when no messages and not loading */}
      {shouldShowMainHeader && (
        <div style={isOffline ? { paddingTop: '32px' } : undefined}>
          <ChatMainHeader
            headerName={headerName}
            headerDescription={headerDescription}
          />
        </div>
      )}

      {/* Chat Content Area - flexible layout based on message state */}
      <div 
        className={contentAreaClass} 
        style={isOffline ? { paddingTop: '32px' } : undefined}
      >
        {/* Messages Area */}
        {isLoadingConversation && messages.length === 0 ? (
          <div className="chat-wrapper__messages">
            <InlineLoader fullHeight={true} />
          </div>
        ) : (
          <VirtualizedMessagesList
            height={virtualizedHeight}
            className="chat-wrapper__messages"
            ref={messagesEndRef}
          />
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
