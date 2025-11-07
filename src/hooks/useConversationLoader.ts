import { useEffect, useRef } from "react";
import { Message } from "../types";
import { fetchThreadMessages } from "../utils/threadApi";

interface UseConversationLoaderProps {
  threadId?: string;
  userId: string;
  httpApiUrl: string;
  userMpAuthToken: string;
  chatServerKey: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setIsLoadingConversation: (loading: boolean) => void;
  setConversationError: (error: string | null) => void;
  setCurrentThreadId: (threadId: string | null) => void;
  setProviderResId: (providerResId: string | null) => void;
}

export function useConversationLoader({
  threadId,
  userId,
  httpApiUrl,
  userMpAuthToken,
  chatServerKey,
  messages,
  setMessages,
  setIsLoadingConversation,
  setConversationError,
  setCurrentThreadId,
  setProviderResId,
}: UseConversationLoaderProps) {
  const hasLoadedConversationRef = useRef<boolean>(false);

  useEffect(() => {
    const loadConversation = async () => {
      // Skip if threadId is not provided - no history to load
      if (!threadId) {
        console.log("useConversationLoader: No threadId provided, skipping history fetch");
        return;
      }

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

        console.log("useConversationLoader: Fetching messages for threadId:", threadId);
        
        // Set the current thread ID
        setCurrentThreadId(threadId);

        // Fetch messages for this thread
        const response = await fetchThreadMessages(httpApiUrl, threadId, {
          userMpAuthToken,
          chatServerKey,
        });
        
        console.log(`useConversationLoader: Loaded ${response.messages.length} messages`);
        setMessages(response.messages);

        // Set providerResId from the API response
        if (response.providerResId) {
          console.log("useConversationLoader: Setting providerResId:", response.providerResId);
          setProviderResId(response.providerResId);
        }

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
    threadId,
    userId,
    httpApiUrl,
    userMpAuthToken,
    chatServerKey,
    messages.length,
    setMessages,
    setIsLoadingConversation,
    setConversationError,
    setCurrentThreadId,
    setProviderResId,
  ]);

  return {
    hasLoadedConversationRef,
  };
}