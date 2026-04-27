import React from "react";
import { PulsatingDots } from "./PulsatingDots";

interface ThinkingBubbleProps {
  isVisible: boolean;
}

export const ThinkingBubble: React.FC<ThinkingBubbleProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="chat-wrapper__message chat-wrapper__message--assistant">
      <div className="chat-wrapper__thinking-bubble">
        <div className="chat-wrapper__thinking-content">
          <PulsatingDots />
        </div>
      </div>
    </div>
  );
};
