import { useEffect, useRef } from "react";
import { Message } from "../types";
import { fetchThreadMessages } from "../utils/threadApi";

interface UseConversationLoaderProps {
  userId: string;
  httpApiUrl: string;
  userMpAuthToken: string;
  chatServerKey: string;
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
  userMpAuthToken,
  chatServerKey,
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
      // Validate required props
      if (!userId) {
        console.error("userId is required for conversation loading");
        return;
      }
      if (!httpApiUrl) {
        console.error("httpApiUrl is required for conversation loading");
        return;
      }
      if (!userMpAuthToken) {
        console.error("userMpAuthToken is required for conversation loading");
        return;
      }
      if (!chatServerKey) {
        console.error("chatServerKey is required for conversation loading");
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
        const loadedMessages = await fetchThreadMessages(httpApiUrl, firstThread.id, {
          userMpAuthToken,
          chatServerKey,
        });
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
    userMpAuthToken,
    chatServerKey,
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