import { useEffect, useRef } from "react";
import { Message } from "../types";
import { fetchThreadMessages } from "../utils/threadApi";

interface UseConversationLoaderProps {
  userId?: string;
  httpApiUrl: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setIsLoadingConversation: (loading: boolean) => void;
  setConversationError: (error: string | null) => void;
  setCurrentThreadId: (threadId: string | null) => void;
  setCurrentConvUuid: (convUuid: string | null) => void;
}

export function useConversationLoader({
  userId,
  httpApiUrl,
  messages,
  setMessages,
  setIsLoadingConversation,
  setConversationError,
  setCurrentThreadId,
  setCurrentConvUuid,
}: UseConversationLoaderProps) {
  const hasLoadedConversationRef = useRef<boolean>(false);

  useEffect(() => {
    const loadConversation = async () => {
      // Skip if no userId provided
      if (!userId) {
        return;
      }

      // Skip if already loaded once
      if (hasLoadedConversationRef.current) {
        return;
      }

      // Skip if messages already exist
      if (messages.length > 0) {
        return;
      }

      try {
        setIsLoadingConversation(true);
        setConversationError(null);

        // For now, we're not fetching threads as the API is commented out
        // This can be uncommented when the thread API is ready
        const threads: string | any[] = [];

        if (threads.length === 0) {
          setIsLoadingConversation(false);
          hasLoadedConversationRef.current = true;
          return;
        }

        // Use the first thread
        const firstThread = threads[0];
        setCurrentThreadId(firstThread.id);
        setCurrentConvUuid(firstThread.convUuid);

        // Fetch messages for this thread
        const loadedMessages = await fetchThreadMessages(httpApiUrl, firstThread.id);
        setMessages(loadedMessages);

        hasLoadedConversationRef.current = true;
      } catch (error) {
        console.error("❌ Error loading conversation:", error);
        setConversationError(
          error instanceof Error ? error.message : "Failed to load conversation"
        );
        hasLoadedConversationRef.current = true;
      } finally {
        setIsLoadingConversation(false);
      }
    };

    loadConversation();
  }, [
    userId,
    httpApiUrl,
    messages.length,
    setMessages,
    setIsLoadingConversation,
    setConversationError,
    setCurrentThreadId,
    setCurrentConvUuid,
  ]);

  return {
    hasLoadedConversationRef,
  };
}