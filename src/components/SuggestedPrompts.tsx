import { T } from "@tolgee/react";
import { useChatContext } from "../contexts";

interface SuggestedPrompt {
  title: string;
  description: string;
}

/**
 * SuggestedPrompts - Displays suggested prompt buttons
 * 
 * Uses ChatContext to access prompts and selection handler.
 */
export const SuggestedPrompts: React.FC = () => {
  const { suggestedPrompts, chatInputRef } = useChatContext();
  
  if (!suggestedPrompts || suggestedPrompts.length === 0) {
    return null;
  }

  const handlePromptSelect = (prompt: SuggestedPrompt) => {
    // Default behavior: copy prompt description to input field
    if (chatInputRef.current) {
      chatInputRef.current.setText(prompt.description);
    }
  };

  return (
    <div className="chat-wrapper__suggested-prompts">
      <h3 className="chat-wrapper__suggested-prompts-title">
        <T keyName="chat.suggestedPrompts">Suggested Prompts</T>
      </h3>
      <div className="chat-wrapper__suggested-prompts-grid">
        {suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            className="chat-wrapper__suggested-prompt-card"
            onClick={() => handlePromptSelect(prompt)}
          >
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