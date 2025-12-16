import { useRef, useEffect, useCallback } from "react";
import { useChatContext } from "../contexts";

interface SuggestedPrompt {
  title: string;
  description: string;
}

/**
 * SuggestedPrompts - Displays suggested prompt buttons
 * 
 * Uses ChatContext to access prompts and selection handler.
 * Implements custom typing animation that works with React's controlled inputs.
 */
export const SuggestedPrompts: React.FC = () => {
  const { suggestedPrompts, chatInputRef } = useChatContext();
  const isTypingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  if (!suggestedPrompts || suggestedPrompts.length === 0) {
    return null;
  }

  const handlePromptSelect = useCallback((prompt: SuggestedPrompt) => {
    // Prevent multiple simultaneous typing animations
    if (isTypingRef.current) {
      return;
    }

    if (!chatInputRef.current) {
      console.warn('Chat input ref not available');
      return;
    }

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Clear the input and focus
    chatInputRef.current.setText("");
    chatInputRef.current.focus();
    
    isTypingRef.current = true;

    // Start typing animation after a brief delay
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      const typeSpeed = 10; // milliseconds per character
      
      const typeNextCharacter = () => {
        if (currentIndex < prompt.description.length) {
          const textSoFar = prompt.description.substring(0, currentIndex + 1);
          
          // Update React state with the text typed so far
          if (chatInputRef.current) {
            chatInputRef.current.setText(textSoFar);
          }
          
          currentIndex++;
          
          // Schedule next character
          timeoutRef.current = setTimeout(typeNextCharacter, typeSpeed);
        } else {
          // Animation complete
          isTypingRef.current = false;
          timeoutRef.current = null;
        }
      };
      
      // Start typing
      typeNextCharacter();
    }, 10);
  }, [chatInputRef]);

  return (
    <div className="chat-wrapper__suggested-prompts">
      <h3 className="chat-wrapper__suggested-prompts-title">Suggested Prompts</h3>
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