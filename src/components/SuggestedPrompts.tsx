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
  const { suggestedPrompts, chatInputRef, enableSuggestedPromptsAnimation = false } = useChatContext();
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

    // If animation is disabled, set text instantly
    if (!enableSuggestedPromptsAnimation) {
      chatInputRef.current.setText(prompt.description);
      chatInputRef.current.focus();
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

    // Get textarea ref for direct manipulation during animation
    const textareaElement = chatInputRef.current.textareaRef?.current;
    if (!textareaElement) {
      console.warn('Textarea ref not available, using fallback');
      chatInputRef.current.setText(prompt.description);
      return;
    }

    // Clear the input and focus once
    chatInputRef.current.setText("");
    textareaElement.focus();
    
    isTypingRef.current = true;
    let isCancelled = false;

    // Immediately set first character in React state to hide placeholder
    if (prompt.description.length > 0) {
      chatInputRef.current.setText(prompt.description[0]);
    }

    // Start typing animation after a brief delay
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 1; // Start from second character since first is already set
      const typeSpeed = 10; // milliseconds per character (increased for stability)
      
      const typeNextCharacter = () => {
        // Safety check: stop if cancelled or component might be unmounted
        if (isCancelled || !chatInputRef.current) {
          isTypingRef.current = false;
          timeoutRef.current = null;
          return;
        }

        if (currentIndex < prompt.description.length) {
          const textSoFar = prompt.description.substring(0, currentIndex + 1);
          
          // Directly update textarea value to avoid excessive setText calls
          // This prevents creating 100+ setTimeout calls for focus/cursor
          textareaElement.value = textSoFar;
          
          // Manually trigger input event so React knows about the change
          const event = new Event('input', { bubbles: true });
          textareaElement.dispatchEvent(event);
          
          currentIndex++;
          
          // Schedule next character
          timeoutRef.current = setTimeout(typeNextCharacter, typeSpeed);
        } else {
          // Animation complete - now sync with React state properly
          isTypingRef.current = false;
          timeoutRef.current = null;
          
          // Final state sync and focus
          if (chatInputRef.current) {
            chatInputRef.current.setText(prompt.description);
          }
        }
      };
      
      // Start typing
      typeNextCharacter();
    }, 10);

    // Cleanup function that can be called if needed
    return () => {
      isCancelled = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      isTypingRef.current = false;
    };
  }, [chatInputRef, enableSuggestedPromptsAnimation]);

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