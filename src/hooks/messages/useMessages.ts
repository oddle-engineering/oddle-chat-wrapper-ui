import { useState, useCallback } from "react";
import { Message } from "../../types";
import { sanitizeMessage } from "../../utils/security";

/**
 * Hook for managing core message state and operations
 * 
 * Responsibilities:
 * - Message array state
 * - Adding messages
 * - Updating messages
 * - Message ID generation
 */
export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Generate unique message ID
  const generateId = useCallback(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  );

  // Add a new message to the chat
  const addMessage = useCallback(
    (role: Message["role"], content: string) => {
      const isAssistant = role === "assistant";
      const sanitizedContent = sanitizeMessage(content, isAssistant);

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role,
          content: sanitizedContent,
          timestamp: new Date(),
        },
      ]);
    },
    [generateId]
  );

  // Update an existing message
  const updateMessage = useCallback(
    (id: string, updates: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? { ...msg, ...updates }
            : msg
        )
      );
    },
    []
  );

  // Update message content specifically
  const updateMessageContent = useCallback(
    (id: string, content: string, isStreaming?: boolean) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                content,
                isStreaming,
              }
            : msg
        )
      );
    },
    []
  );

  return {
    messages,
    setMessages,
    addMessage,
    updateMessage,
    updateMessageContent,
    generateId,
  };
}
