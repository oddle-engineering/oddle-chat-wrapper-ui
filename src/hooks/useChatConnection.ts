import { useState, useCallback, useRef } from 'react';
import { ChatAPI } from '../utils/api';
import { Message } from '../types';

export function useChatConnection(apiEndpoint: string, apiKey?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const apiRef = useRef<ChatAPI>(new ChatAPI(apiEndpoint, apiKey));

  const initConversation = useCallback(async () => {
    try {
      const id = await apiRef.current.initConversation();
      conversationIdRef.current = id;
      return id;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!conversationIdRef.current) {
        await initConversation();
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        const stream = apiRef.current.streamMessage(
          conversationIdRef.current!,
          content
        );

        for await (const chunk of stream) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
      } catch (err) {
        setError(err as Error);
        setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [initConversation]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    conversationIdRef.current = null;
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}