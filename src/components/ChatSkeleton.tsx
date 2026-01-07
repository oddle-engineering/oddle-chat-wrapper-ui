import React from "react";

/**
 * ChatSkeleton - Loading skeleton for the entire chat interface
 *
 * Displays a skeleton UI when the chat is in an empty state and connecting
 * to get the ticket and establish WebSocket connection.
 */
export const ChatSkeleton: React.FC = () => {
  return (
    <div className="chat-wrapper__skeleton">
      {/* Header Skeleton */}
      <div className="chat-wrapper__skeleton-header">
        <div className="chat-wrapper__skeleton-title" />
        <div className="chat-wrapper__skeleton-description" />
      </div>

      {/* Content Area Skeleton */}
      <div className="chat-wrapper__skeleton-content">
        {/* Input Skeleton */}
        <div className="chat-wrapper__skeleton-input">
          <div className="chat-wrapper__skeleton-input-field" />
        </div>
        {/* Suggested Prompts Skeleton */}
        <div className="chat-wrapper__skeleton-prompts">
          <div className="chat-wrapper__skeleton-prompts-title" />
          <div className="chat-wrapper__skeleton-prompts-grid">
            <div className="chat-wrapper__skeleton-prompt-card" />
            <div className="chat-wrapper__skeleton-prompt-card" />
            <div className="chat-wrapper__skeleton-prompt-card" />
            <div className="chat-wrapper__skeleton-prompt-card" />
          </div>
        </div>
      </div>
    </div>
  );
};
