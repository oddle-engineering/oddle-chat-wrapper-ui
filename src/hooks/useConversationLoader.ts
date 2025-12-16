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
      return;
    }

    // Skip if entityId is not provided - no history to load
    if (!entityId) {
      return;
    }

    // Skip if metadata is empty/undefined - start fresh conversation
    if (!metadata || (typeof metadata === 'object' && Object.keys(metadata).length === 0)) {
      return;
    }

    // Validate required props
    if (!httpApiUrl) {
      return;
    }
    if (!userMpAuthToken) {
      return;
    }
    if (!chatServerKey) {
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
      
      setMessages(response.messages);

      // Set threadId from the API response if server returned it
      if (response.threadId) {
        setCurrentThreadId(response.threadId);
      }

      // Set providerResId from the API response
      if (response.providerResId) {
        setProviderResId(response.providerResId);
      }

      // Trigger conversation initialized callback if messages were loaded
      if (response.messages.length > 0 && onConversationInitialized) {
        onConversationInitialized();
      }

      hasLoadedConversationRef.current = true;
    } catch (error) {
      logClassifiedError(error, "ConversationLoader");
      
      setConversationError(
        error instanceof Error ? error.message : "Failed to load conversation"
      );
      
      // Always mark as loaded to prevent infinite retries
      hasLoadedConversationRef.current = true;
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
    hasLoadedConversationRef.current = false;
  };

  return {
    hasLoadedConversationRef,
    resetConversationLoader,
    reloadConversation: loadConversation,
  };
}