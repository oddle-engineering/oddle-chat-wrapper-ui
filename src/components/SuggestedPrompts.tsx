import React from "react";

interface SuggestedPrompt {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onPromptSelect: (prompt: SuggestedPrompt) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  prompts,
  onPromptSelect,
}) => {
  return (
    <div className="chat-wrapper__suggested-prompts">
      <h3 className="chat-wrapper__suggested-prompts-title">Suggested Prompts</h3>
      <div className="chat-wrapper__suggested-prompts-grid">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            className="chat-wrapper__suggested-prompt-card"
            onClick={() => onPromptSelect(prompt)}
          >
            {prompt.icon && (
              <div className="chat-wrapper__suggested-prompt-icon">
                {prompt.icon}
              </div>
            )}
            <div className="chat-wrapper__suggested-prompt-content">
              <h4 className="chat-wrapper__suggested-prompt-title">
                {prompt.title}
              </h4>
              <p className="chat-wrapper__suggested-prompt-description">
                {prompt.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};