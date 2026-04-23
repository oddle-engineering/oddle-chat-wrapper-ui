import React from "react";
import { MessagesList } from "../MessagesList";
import { ChatInput } from "../ChatInput";
import { SuggestedPrompts } from "../SuggestedPrompts";
import { InlineLoader } from "../InlineLoader";
import { ChatMainHeader } from "./ChatMainHeader";
import { ChatSkeleton } from "../ChatSkeleton";
import { ConnectionError } from "../ConnectionError";
import { chatUtils } from "../../utils/chatUtils";
import { useChatContext } from "../../contexts";
import { ConnectionState } from "../../types";

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
    showSuggestedPromptsOnInit,
    footer,
    messagesEndRef,
    chatInputRef,
    isOffline,
    connectionState,
    isInitialConnection,
    conversationError,
    onRetryConnection,
  } = useChatContext();

  // Show skeleton until all loading phases complete: initial mount, connecting, and history fetch.
  // isLoadingConversation is not gated on messages.length — Zustand and React state can render
  // out of sync, so we hold the skeleton for the entire fetch regardless of whether messages
  // have arrived yet.
  const shouldShowSkeleton =
    isLoadingConversation ||
    (messages.length === 0 && (isInitialConnection || connectionState === ConnectionState.CONNECTING));

  // Check if connection failed in empty state
  // Only show error if we're past the initial connection attempts (not on first try with slow network)
  const shouldShowConnectionError =
    messages.length === 0 &&
    !isLoadingConversation &&
    connectionState === ConnectionState.DISCONNECTED &&
    !isInitialConnection; // Don't show error during initial connection retries

  // If showing skeleton, render it with error overlay if connection failed
  if (shouldShowSkeleton || shouldShowConnectionError) {
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <ChatSkeleton />
        {shouldShowConnectionError && (
          <ConnectionError
            errorType={isOffline ? "network" : "server"}
            errorMessage={conversationError || undefined}
            onRetry={onRetryConnection}
            footer={footer}
          />
        )}
      </div>
    );
  }

  const shouldShowMainHeader = chatUtils.state.shouldShowMainHeader(
    messages.length,
    isStreaming,
    isLoadingConversation
  );

  const shouldShowSuggestedPrompts = chatUtils.state.shouldShowSuggestedPrompts(
    messages.length,
    isStreaming,
    isLoadingConversation,
    suggestedPrompts,
    showSuggestedPromptsOnInit
  );

  const contentAreaClass = chatUtils.state.getContentAreaClass(
    messages.length,
    isStreaming,
    isLoadingConversation,
    shouldShowSuggestedPrompts
  );

  // Determine if we're in compact mode (header should be inside content area)
  const isCompactMode = contentAreaClass.includes('compact');

  return (
    <>
      {/* Main Header Section - only show when no messages and not loading */}
      {shouldShowMainHeader && !isCompactMode && (
        <div style={isOffline ? { paddingTop: "48px" } : undefined}>
          <ChatMainHeader
            headerName={headerName}
            headerDescription={headerDescription}
            showIcon={false}
          />
        </div>
      )}

      {/* Chat Content Area - flexible layout based on message state */}
      <div
        className={contentAreaClass}
        style={isOffline && messages.length > 0 ? { paddingTop: "72px" } : undefined}
      >
        {/* Header in compact mode - centered in available space */}
        {shouldShowMainHeader && isCompactMode && (
          <div style={{ 
            flex: '1 1 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingTop: isOffline ? "48px" : undefined
          }}>
            <ChatMainHeader
              headerName={headerName}
              headerDescription={headerDescription}
              showIcon={true}
            />
          </div>
        )}
        {/* Messages Area - hide in compact mode */}
        {!isCompactMode && (
          isLoadingConversation && messages.length === 0 ? (
            <div className="chat-wrapper__messages">
              <InlineLoader fullHeight={true} />
            </div>
          ) : (
            <MessagesList ref={messagesEndRef} />
          )
        )}

        {/* Chat Input - flexible sizing */}
        <div className="chat-wrapper__input-container">
          <ChatInput ref={chatInputRef} />
        </div>

        {/* Suggested Prompts - only show when no messages and not loading */}
        {shouldShowSuggestedPrompts && <SuggestedPrompts />}

        {/* Custom Footer - only show when no messages and not loading */}
        {shouldShowSuggestedPrompts && footer && <div>{footer}</div>}
      </div>
    </>
  );
};
