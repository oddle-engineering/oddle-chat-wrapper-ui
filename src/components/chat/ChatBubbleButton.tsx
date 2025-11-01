import React from 'react';
import { ChatIcon } from '../icons';
import { ChatMode } from '../../types';

interface ChatBubbleButtonProps {
  mode: ChatMode;
  appName: string;
  bubbleText?: string;
  showBubbleText?: boolean;
  onClick: () => void;
}

export const ChatBubbleButton: React.FC<ChatBubbleButtonProps> = ({
  mode,
  appName,
  bubbleText,
  showBubbleText = true,
  onClick,
}) => {
  const title = mode === "modal" ? `Open ${appName}` : `Expand ${appName}`;

  return (
    <button
      className="chat-wrapper__bubble-button"
      onClick={onClick}
      title={title}
    >
      <ChatIcon className="chat-wrapper__bubble-icon" size={24} />
      {showBubbleText && (
        <span className="chat-wrapper__bubble-text">
          {bubbleText || "Chat"}
        </span>
      )}
    </button>
  );
};