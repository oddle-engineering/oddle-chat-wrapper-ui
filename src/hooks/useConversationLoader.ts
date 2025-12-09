import { useEffect, useRef } from "react";
import { Message } from "../types";
import { fetchThreadMessages } from "../utils/threadApi";
import { logClassifiedError } from "../utils/errorClassification";

interface UseConversationLoaderProps {
  entityId?: string;
  entityType?: string;
  httpApiUrl: string;
  userMpAuthToken: string;
  chatServerKey: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setIsLoadingConversation: (loading: boolean) => void;
  setConversationError: (error: string | null) => void;
  setCurrentThreadId: (threadId: string | null) => void;
  setProviderResId: (providerResId: string | null) => void;
  metadata?: any;
  isConnected?: boolean; // Wait for connection before loading
  onConversationInitialized?: () => void;
}

export function useConversationLoader({
  entityId,
  entityType,
  httpApiUrl,
  userMpAuthToken,
  chatServerKey,
  messages,
  setMessages,
  setIsLoadingConversation,
  setConversationError,
  setCurrentThreadId,
  setProviderResId,
  metadata,
  isConnected = true, // Default to true for backward compatibility
  onConversationInitialized,
}: UseConversationLoaderProps) {
  const hasLoadedConversationRef = useRef<boolean>(false);

  const loadConversation = async () => {
    // Wait for connection to be established (ticket fetched successfully)
    if (!isConnected) {
      console.log("useConversationLoader: Waiting for connection to be established before loading messages");
      return;
    }

    // Skip if entityId is not provided - no history to load
    if (!entityId) {
      console.log("useConversationLoader: No entityId provided, skipping history fetch");
      return;
    }

    // Skip if metadata is empty/undefined - start fresh conversation
    if (!metadata || (typeof metadata === 'object' && Object.keys(metadata).length === 0)) {
      console.log("useConversationLoader: No metadata provided (empty/undefined), skipping history fetch - starting fresh conversation");
      return;
    }

    // Validate required props
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

      console.log("useConversationLoader: Fetching messages for entityId:", entityId, "entityType:", entityType);

      // Fetch messages using entityId
      const response = await fetchThreadMessages(
        httpApiUrl,
        {
          entityId,
          entityType,
          metadata
        },
        {
          userMpAuthToken,
          chatServerKey,
        }
      );
      
      console.log(`useConversationLoader: Loaded ${response.messages.length} messages`);
      setMessages(response.messages);

      // Set threadId from the API response if server returned it
      if (response.threadId) {
        console.log("useConversationLoader: Setting threadId from response:", response.threadId);
        setCurrentThreadId(response.threadId);
      }

      // Set providerResId from the API response
      if (response.providerResId) {
        console.log("useConversationLoader: Setting providerResId:", response.providerResId);
        setProviderResId(response.providerResId);
      }

      // Trigger conversation initialized callback if messages were loaded
      if (response.messages.length > 0 && onConversationInitialized) {
        console.log("useConversationLoader: Triggering onConversationInitialized (previous messages loaded)");
        onConversationInitialized();
      }

      hasLoadedConversationRef.current = true;
    } catch (error) {
      const classification = logClassifiedError(error, "ConversationLoader");
      
      setConversationError(
        error instanceof Error ? error.message : "Failed to load conversation"
      );
      
      // Always mark as loaded to prevent infinite retries
      // The error classification is just for logging/debugging
      hasLoadedConversationRef.current = true;
      
      if (!classification.isRetryable) {
        console.warn(`[ConversationLoader] Will not retry conversation loading: ${classification.reason}`);
      }
    } finally {
      setIsLoadingConversation(false);
    }
  };

  useEffect(() => {
    loadConversation();
  }, [
    isConnected, // Load when connection is established
    entityId,
    entityType,
    httpApiUrl,
    userMpAuthToken,
    chatServerKey,
    messages.length,
    setMessages,
    setIsLoadingConversation,
    setConversationError,
    setCurrentThreadId,
    setProviderResId,
    metadata,
  ]);

  // Reset function to allow reloading conversation
  const resetConversationLoader = () => {
    console.log("useConversationLoader: Resetting loader state");
    hasLoadedConversationRef.current = false;
  };

  return {
    hasLoadedConversationRef,
    resetConversationLoader,
    reloadConversation: loadConversation,
  };
}