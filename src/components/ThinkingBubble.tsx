import React from "react";

interface ThinkingBubbleProps {
  isVisible: boolean;
}

export const ThinkingBubble: React.FC<ThinkingBubbleProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="chat-wrapper__message chat-wrapper__message--assistant">
      <div className="chat-wrapper__thinking-bubble">
        <div className="chat-wrapper__thinking-content">
          <div className="chat-wrapper__thinking-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};