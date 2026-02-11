import {
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  ChatWrapperProps,
  ChatMode,
  ChatWrapperRef,
  ConnectionState,
} from "../types";
import { ChatInputRef } from "./ChatInput";
import { SystemEvent, SystemEventType } from "../client";
import {
  useWebSocketConnection,
  useMessageHandling,
  useConversationLoader,
  useMetadataSync,
  useNetworkStatus,
} from "../hooks";
import { useUIStore } from "../store";
import { CHAT_STATUS, STREAMING_STATUS } from "../constants/chatStatus";
import { FileUploadService } from "../services/fileUploadService";
import { ChatSubmissionService } from "../services/chatSubmissionService";
import { logClassifiedError } from "../utils/errorClassification";
import { chatUtils } from "../utils/chatUtils";
import {
  ChatErrorBoundary,
  WebSocketErrorBoundary,
  FileUploadErrorBoundary,
} from "./error";
// import { ConnectionNotification } from "./ConnectionNotification";
import { ChatBubbleButton } from "./chat/ChatBubbleButton";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContent } from "./chat/ChatContent";
import { ChatProvider } from "../contexts";
import { NetworkStatusBanner } from "./NetworkStatusBanner";
import { TranslationProvider } from "../i18n";
import "../styles/chat-wrapper.css";

const ChatWrapperInner = forwardRef<ChatWrapperRef, ChatWrapperProps>(
  (
    {
      // Authentication and entity context
      auth,

      // Server configuration
      chatServerUrl,
      chatServerKey,

      // Conversation configuration
      metadata,

      // Existing props
      config,
      tools, // Note: Tools are stabilized internally to prevent reconnections on re-renders
      contextHelpers,
    },
    ref
  ) => {
    // Extract auth properties for easier access
    const { token: userMpAuthToken, entityId, entityType } = auth;

    // Validate required props early using utility
    chatUtils.validation.validateAuthProps({
      userMpAuthToken,
      chatServerUrl,
      chatServerKey,
    });

    // Convert chatServerUrl to HTTP URL for REST API calls
    const httpApiUrl = useMemo(() => {
      return chatUtils.url.convertWebSocketToHttp(chatServerUrl);
    }, [chatServerUrl]);

    // Initialize file upload service
    const fileUploadService = useMemo(
      () =>
        new FileUploadService({
          apiUrl: httpApiUrl,
          userMpAuthToken: userMpAuthToken,
          chatServerKey: chatServerKey,
          maxFileSize: config.fileUploadConfig?.maxFileSize,
          allowedTypes: config.fileUploadConfig?.allowedTypes,
        }),
      [httpApiUrl, userMpAuthToken, chatServerKey, config.fileUploadConfig]
    );

    // Extract client tools for UI display
    const uiClientTools = useMemo(() => {
      if (tools && tools.length > 0) {
        // Extract schemas from unified tools for UI display
        return tools.map(({ execute, ...schema }) => schema);
      }
      return [];
    }, [tools]);

    // Initialize custom hooks for state management
    const messageHandling = useMessageHandling();
    const { isOnline, wasOffline } = useNetworkStatus();

    // Track whether last connection error was retryable
    const lastConnectionRetryableRef = useRef(true);

    // Zustand state - use individual selectors to avoid infinite re-renders
    // Layout state
    const isModalOpen = useUIStore((state) => state.isModalOpen);
    const isCollapsed = useUIStore((state) => state.isCollapsed);
    const currentMode = useUIStore((state) => state.currentMode);
    const openModal = useUIStore((state) => state.openModal);
    const closeModal = useUIStore((state) => state.closeModal);
    const toggleCollapse = useUIStore((state) => state.toggleCollapse);
    const toggleFullscreen = useUIStore((state) => state.toggleFullscreen);
    const setCurrentMode = useUIStore((state) => state.setCurrentMode);

    // Chat state
    const chatStatus = useUIStore((state) => state.chatStatus);
    const setChatStatus = useUIStore((state) => state.setChatStatus);
    const streamingStatus = useUIStore((state) => state.streamingStatus);
    const setStreamingStatus = useUIStore((state) => state.setStreamingStatus);

    // Conversation state
    const isLoadingConversation = useUIStore(
      (state) => state.isLoadingConversation
    );
    const setIsLoadingConversation = useUIStore(
      (state) => state.setIsLoadingConversation
    );
    const conversationError = useUIStore((state) => state.conversationError);
    const setConversationError = useUIStore(
      (state) => state.setConversationError
    );

    // Thread state
    const setCurrentThreadId = useUIStore((state) => state.setCurrentThreadId);
    const currentProviderResId = useUIStore((state) => state.providerResId);
    const setProviderResId = useUIStore((state) => state.setProviderResId);

    // Streaming state (now using Zustand instead of messageHandling hook)
    const isStreaming = useUIStore((state) => state.isStreaming);
    const setIsStreaming = useUIStore((state) => state.setIsStreaming);
    const isThinking = useUIStore((state) => state.isThinking);
    const setIsThinking = useUIStore((state) => state.setIsThinking);
    const streamingContent = useUIStore((state) => state.streamingContent);
    const setStreamingContent = useUIStore(
      (state) => state.setStreamingContent
    );
    const isHandlingTool = useUIStore((state) => state.isHandlingTool);
    const setIsHandlingTool = useUIStore((state) => state.setIsHandlingTool);

    // Set initial mode from config
    useEffect(() => {
      if (config.mode) {
        setCurrentMode(config.mode);
      }
    }, [config.mode, setCurrentMode]);

    // Handle escape key for modal
    useEffect(() => {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && currentMode === "modal" && isModalOpen) {
          closeModal();
        }
      };

      if (currentMode === "modal" && isModalOpen) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [currentMode, isModalOpen, closeModal]);

    // Extract frequently used values from hooks
    const {
      messages,
      setMessages,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef,
      getReasoningStatus,
      getReasoningDuration,
      getReasoningContentOnly,
      getReasoningTitle,
      getToolingTitle,
      getToolingStatus,
      handleSetMessage,
      handleReasoningUpdate,
      handleChatFinished,
      handleChatError,
      stopGeneration: originalStopGeneration,
    } = messageHandling;

    // Refs for managing UI
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<ChatInputRef>(null);

    // Track if conversation initialized callback has been triggered
    const hasTriggeredConversationInitRef = useRef<boolean>(false);

    // Create a ref to store chatClient so we can access it in handleSystemEvent
    const chatClientRef = useRef<any>(null);

    // Handle thread creation
    const handleThreadCreated = useCallback(
      (data: {
        providerResId: string;
        threadId: string;
        canUpdateMetadata: boolean;
        updateEndpoint: string;
      }) => {
        // Update provider resource ID and thread ID
        setProviderResId(data.providerResId);
        setCurrentThreadId(data.threadId);

        // Note: Metadata updates are now handled exclusively by useMetadataSync hook
        // to prevent race conditions when metadata changes rapidly
      },
      [setProviderResId, setCurrentThreadId]
    );

    // Handle system events
    const handleSystemEvent = useCallback(
      (event: SystemEvent) => {
        switch (event.type) {
          case SystemEventType.CHAT_COMPLETED:
            // Capture provider resource ID from conversation completion
            if (event.data?.conversationId) {
              setProviderResId(event.data.conversationId);
            }
            handleChatFinished();
            // Reset chat status to IDLE so button switches back to send
            setChatStatus(CHAT_STATUS.IDLE);
            setStreamingStatus(STREAMING_STATUS.IDLE);
            // Focus the input after assistant response completes
            setTimeout(() => {
              chatInputRef.current?.focus();
            }, 0);
            break;
          case SystemEventType.CHAT_ERROR:
            if (event.data?.error) {
              handleChatError(event.data.error);
            }
            break;
          case SystemEventType.CONNECTION_LOST:
            // Reconnection state is now tracked directly from connection status
            break;
          case SystemEventType.CONNECTION_RESTORED:
            // Reconnection state is now tracked directly from connection status
            break;
          case SystemEventType.RECONNECTING:
            // Reconnection state is now tracked directly from connection status
            break;
          default:
            break;
        }
      },
      [
        handleChatFinished,
        handleChatError,
        setProviderResId,
        setCurrentThreadId,
      ]
    );

    // Initialize WebSocket connection
    const {
      chatClient,
      connectionState,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection,
      connectChatClient,
    } = useWebSocketConnection({
      // Authentication and server properties
      userMpAuthToken,
      chatServerUrl,
      chatServerKey,

      // Entity configuration
      entityId,
      entityType,

      // Tools configuration
      tools,

      // Other properties
      contextHelpers,
      onSetMessage: handleSetMessage,
      onSystemEvent: handleSystemEvent,
      onReasoningUpdate: handleReasoningUpdate,
      onThreadCreated: handleThreadCreated,
      onError: config.onError,
    });

    // Update the chatClient ref when it changes
    useEffect(() => {
      chatClientRef.current = chatClient;
    }, [chatClient]);

    // Handle all metadata synchronization scenarios (Cases 1, 2, 3)
    useMetadataSync({
      metadata,
      chatClient,
      currentProviderResId,
      isLoadingConversation,
      messages,
      entityId,
      entityType,
    });

    // Handle network reconnection
    useEffect(() => {
      if (wasOffline && isOnline && lastConnectionRetryableRef.current) {
        connectChatClient().catch((error) => {
          const classification = logClassifiedError(
            error,
            "NetworkReconnection"
          );
          lastConnectionRetryableRef.current = classification.isRetryable;

          if (!classification.isRetryable) {
            console.warn(
              `[ChatWrapper] Network reconnection failed with non-retryable error: ${classification.reason}`
            );
          }
        });
      } else if (
        wasOffline &&
        isOnline &&
        !lastConnectionRetryableRef.current
      ) {
        console.warn(
          "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
        );
      }
    }, [isOnline, wasOffline, connectChatClient]);

    // Custom stop generation that sends WebSocket stop_run message
    const stopGeneration = useCallback(() => {

      // Stop the streaming state
      originalStopGeneration();
      setChatStatus(CHAT_STATUS.IDLE);
      setStreamingStatus(STREAMING_STATUS.IDLE);

      // Send stop_run message to server
      if (chatClient && currentProviderResId) {
        chatClient.stopRun(currentProviderResId);
      }
    }, [
      originalStopGeneration,
      setChatStatus,
      setStreamingStatus,
      chatClient,
      currentProviderResId,
    ]);

    // Expose imperative handle for parent components
    useImperativeHandle(
      ref,
      () => ({
        updateMetadata: (updates: { tag?: string | null; metadata?: any }) => {
          if (!chatClient) {
            // Cannot update metadata without chat client
            return;
          }

          if (!currentProviderResId) {
            // Cannot update metadata without active conversation
            return;
          }

          chatClient
            .updateMetadata(currentProviderResId, updates)
            .catch((_error) => {
              // Silent failure for metadata update
            });
        },
      }),
      [chatClient, currentProviderResId]
    );

    // Initialize chat submission service (depends on chatClient)
    const chatSubmissionService = useMemo(
      () =>
        chatClient
          ? new ChatSubmissionService(chatClient, {
              onError: config.onError,
            })
          : null,
      [chatClient, config.onError]
    );

    // Initialize conversation loader
    const { resetConversationLoader /*, reloadConversation*/ } =
      useConversationLoader({
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
        isConnected: connectionState === ConnectionState.CONNECTED, // Only load after connection established
        onConversationInitialized: config.onConversationInitialized
          ? () => {
              hasTriggeredConversationInitRef.current = true;
              config.onConversationInitialized?.();
            }
          : undefined,
      });

    // Handle retry: reconnect WebSocket and reload conversation
    // const handleRetryConnection = useCallback(async () => {
    //
    //   // Reset conversation loader to allow reloading
    //   resetConversationLoader();
    //
    //   // Reconnect WebSocket
    //   await connectChatClient();
    //
    //   // Reload conversation messages
    //   await reloadConversation();
    // }, [resetConversationLoader, connectChatClient, reloadConversation]);

    // Scroll animation frame ref
    const scrollAnimationFrame = useRef<number | null>(null);

    const scrollToBottom = useCallback(() => {
      // Cancel any pending scroll animation
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }

      // Schedule smooth scroll on next frame
      scrollAnimationFrame.current = requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        scrollAnimationFrame.current = null;
      });
    }, []);

    // Auto-scroll when messages change
    useEffect(() => {
      scrollToBottom();
    }, [messages, scrollToBottom]);

    // Auto-scroll when streaming content changes
    useEffect(() => {
      if (streamingContent) {
        scrollToBottom();
      }
    }, [streamingContent, scrollToBottom]);

    // Handle config callbacks
    useEffect(() => {
      if (config.onStreamingStatusChange) {
        config.onStreamingStatusChange(streamingStatus);
      }
    }, [streamingStatus, config]);

    // Cleanup scroll animation on unmount
    useEffect(() => {
      return () => {
        if (scrollAnimationFrame.current) {
          cancelAnimationFrame(scrollAnimationFrame.current);
        }
      };
    }, []);

    // Cleanup on unmount: Close WebSocket and clear all state
    useEffect(() => {
      return () => {

        // Clear all messages
        setMessages([]);

        // Reset streaming state
        setIsStreaming(false);
        setIsThinking(false);
        setStreamingContent("");
        setIsHandlingTool(false);

        // Reset chat status
        setChatStatus(CHAT_STATUS.IDLE);
        setStreamingStatus(STREAMING_STATUS.IDLE);

        // Clear conversation state
        setIsLoadingConversation(false);
        setConversationError(null);

        // Clear thread data
        setCurrentThreadId(null);
        setProviderResId(null);

        // WebSocket cleanup is already handled by useWebSocketConnection hook
      };
    }, [
      setMessages,
      setIsStreaming,
      setIsThinking,
      setStreamingContent,
      setIsHandlingTool,
      setChatStatus,
      setStreamingStatus,
      setIsLoadingConversation,
      setConversationError,
      setCurrentThreadId,
      setProviderResId,
    ]);

    // Handle message submission via WebSocketChatClient
    const handleSubmit = useCallback(
      async (message: string, media?: string[]) => {
        // Basic validation - allow submission even when disconnected to show error state
        if (
          !message.trim() ||
          isStreaming ||
          !chatSubmissionService ||
          !chatClient
        ) {
          return;
        }

        // State updates: Start submission
        setIsStreaming(true);
        setIsThinking(true);
        setChatStatus(CHAT_STATUS.SUBMITTED);
        setStreamingStatus(STREAMING_STATUS.STARTING);

        // Create user message first
        const userMessage = chatSubmissionService.createUserMessage(
          message,
          media
        );

        // Add user message to state
        setMessages((prev) => [...prev, userMessage]);

        // Trigger conversation initialized callback when user sends first message
        if (
          config.onConversationInitialized &&
          !hasTriggeredConversationInitRef.current
        ) {
        
          hasTriggeredConversationInitRef.current = true;
          config.onConversationInitialized();
        }

        // Check network connectivity immediately
        const isOnline = navigator.onLine;

        // If offline, immediately mark as failed - no timeout needed
        if (!isOnline) {
          setIsThinking(false);
          setChatStatus(CHAT_STATUS.ERROR);

          // Mark the user message with error state
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === userMessage.id
                ? {
                    ...msg,
                    hasError: true,
                    isRetrying: false,
                    errorMessage: "No internet connection. Please check your network and try again.",
                  }
                : msg
            )
          );

          // State updates: Reset to idle
          setIsStreaming(false);
          setChatStatus(CHAT_STATUS.IDLE);
          setStreamingStatus(STREAMING_STATUS.IDLE);
          return; // Exit early - don't try to send
        }

        try {
          // Business logic: Submit message via service with timeout
          // Use currentProviderResId (from loaded thread) for conversation continuity
          
          // Create a timeout promise that rejects after 5 seconds
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Message send timeout - connection may be lost")), 5000);
          });
          
          // Race the message send against the timeout
          await Promise.race([
            chatClient.onTriggerMessage({
              message: userMessage.content,
              media,
              providerResId: currentProviderResId || undefined,
            }),
            timeoutPromise
          ]);

          // State updates: Transition to streaming
          setChatStatus(CHAT_STATUS.STREAMING);
          
          // Set up a timeout to check if we get a response within 8 seconds
          // This handles cases where connection appears online but is actually broken
          const responseTimeoutId = setTimeout(() => {
            setIsThinking(false);
            setChatStatus(CHAT_STATUS.ERROR);
            
            // Mark the user message with error state due to no response
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === userMessage.id
                  ? {
                      ...msg,
                      hasError: true,
                      isRetrying: false,
                      errorMessage: "No response received. Connection may be lost.",
                    }
                  : msg
              )
            );
            
            // Reset streaming state
            setIsStreaming(false);
            setChatStatus(CHAT_STATUS.IDLE);
            setStreamingStatus(STREAMING_STATUS.IDLE);
          }, 120000); // 120 seconds - more reasonable for LLM processing and tool execution
          
          // Store the timeout ID so we can clear it if we get a response
          // (You'd need to clear this when the first message comes in)
          (window as any).responseTimeoutId = responseTimeoutId;
        } catch (error) {
          // State updates: Handle error state
          setIsThinking(false);
          setChatStatus(CHAT_STATUS.ERROR);

          // Mark the user message with error state
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === userMessage.id
                ? {
                    ...msg,
                    hasError: true,
                    isRetrying: false, // Explicitly ensure not in retrying state
                    errorMessage:
                      connectionState !== ConnectionState.CONNECTED
                        ? "Connection lost. Message not sent."
                        : error instanceof Error
                        ? error.message
                        : "Failed to send message. Please try again.",
                  }
                : msg
            )
          );

          // State updates: Reset to idle immediately
          setIsStreaming(false);
          setChatStatus(CHAT_STATUS.IDLE);
          setStreamingStatus(STREAMING_STATUS.IDLE);
        }
      },
      [
        chatSubmissionService,
        chatClient,
        isStreaming,
        connectionState,
        setMessages,
        setIsStreaming,
        setIsThinking,
        setChatStatus,
        setStreamingStatus,
        currentProviderResId,
      ]
    );

    // Handle file upload using the new service
    const handleFileUpload = useCallback(
      async (files: File[]): Promise<string[]> => {
        return await fileUploadService.uploadFiles(files);
      },
      [fileUploadService]
    );

    // Memoize container classes to prevent recalculation on every render
    // Only recompute when dependencies change
    const containerClasses = useMemo(
      () =>
        chatUtils.css.getContainerClasses(
          currentMode as ChatMode,
          config.position,
          config.theme,
          isCollapsed,
          config.constrainedHeight
        ),
      [
        currentMode,
        config.position,
        config.theme,
        isCollapsed,
        config.constrainedHeight,
      ]
    );

    // Handle bubble button click
    const handleBubbleClick = useCallback(() => {
      if (currentMode === "modal") {
        openModal();
      } else {
        toggleCollapse();
      }
    }, [currentMode, openModal, toggleCollapse]);

    // Handle suggested prompt selection
    const handlePromptSelect = useCallback(
      (prompt: { description: string }) => {
        if (chatInputRef.current) {
          chatInputRef.current.setText(prompt.description);
        }
      },
      []
    );

    // Split context value into smaller memos for better performance
    // Only recompute when their specific dependencies change

    const messageState = useMemo(
      () => ({
        messages,
        isStreaming,
        isThinking,
        isHandlingTool,
      }),
      [messages, isStreaming, isThinking, isHandlingTool]
    );

    const uiState = useMemo(
      () => ({
        isLoadingConversation,
        chatStatus,
        conversationError,
        isOffline: !isOnline,
        connectionState,
        isInitialConnection,
      }),
      [
        isLoadingConversation,
        chatStatus,
        conversationError,
        isOnline,
        connectionState,
        isInitialConnection,
      ]
    );

    const configState = useMemo(
      () => ({
        headerName: config.headerName,
        headerDescription: config.headerDescription,
        placeholderTexts: config.placeholderTexts,
        chipName: config.chipName,
        chipLogo: config.chipLogo,
        suggestedPrompts: config.suggestedPrompts,
        enableSuggestedPromptsAnimation: config.enableSuggestedPromptsAnimation,
        footer: config.footer,
        clientTools: uiClientTools,
        fileUploadEnabled: config.features?.fileUpload,
        fileUploadConfig: {
          maxFiles: config.fileUploadConfig?.maxFiles ?? 5,
          maxFileSize: config.fileUploadConfig?.maxFileSize ?? 15 * 1024 * 1024, // 15MB default
          allowedTypes: config.fileUploadConfig?.allowedTypes ?? [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ],
        },
      }),
      [
        config.headerName,
        config.headerDescription,
        config.placeholderTexts,
        config.chipName,
        config.chipLogo,
        config.suggestedPrompts,
        config.enableSuggestedPromptsAnimation,
        config.features?.fileUpload,
        config.fileUploadConfig,
        uiClientTools,
      ]
    );

    const helpers = useMemo(
      () => ({
        getReasoningTitle,
        getReasoningStatus,
        getReasoningDuration,
        getReasoningContentOnly,
        getToolingTitle,
        getToolingStatus,
      }),
      [
        getReasoningTitle,
        getReasoningStatus,
        getReasoningDuration,
        getReasoningContentOnly,
        getToolingTitle,
        getToolingStatus,
      ]
    );

    // Handle retry message: mark message for retry and reconnect
    const handleRetryMessage = useCallback(
      async (messageId: string) => {
        // Find the message to retry
        const messageToRetry = messages.find((msg) => msg.id === messageId);
        if (!messageToRetry) {
          return;
        }

        // Mark message as retrying and set global loading state
        setIsStreaming(true);
        setIsThinking(true);
        setChatStatus(CHAT_STATUS.SUBMITTED);
        setStreamingStatus(STREAMING_STATUS.STARTING);

        setMessages((prevMessages) => {
          return prevMessages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  hasError: false,
                  isRetrying: true,
                  errorMessage: undefined,
                }
              : msg
          );
        });

        // Check network connectivity for retry
        const isOnline = navigator.onLine;
        if (!isOnline) {
          setIsThinking(false);
          setIsStreaming(false);
          setChatStatus(CHAT_STATUS.ERROR);

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    isRetrying: false,
                    hasError: true,
                    errorMessage: "Still no internet connection. Please check your network and try again.",
                  }
                : msg
            )
          );
          
          setChatStatus(CHAT_STATUS.IDLE);
          setStreamingStatus(STREAMING_STATUS.IDLE);
          return; // Exit early if still offline
        }

        try {
          // Only reconnect if actually disconnected or connection is unstable
          if (connectionState !== ConnectionState.CONNECTED) {
            await connectChatClient();
          }

          // Submit the message directly without creating a new user message
          // No need to reset conversation loader - ticket should still be valid
          await chatClient?.onTriggerMessage({
            message: messageToRetry.content,
            media: messageToRetry.media,
            providerResId: currentProviderResId || undefined,
          });
          
          // Transition to streaming state (keep loading indicators)
          setChatStatus(CHAT_STATUS.STREAMING);
          
          // Keep isRetrying: true until response actually starts
          // The retry state will be cleared when handleSetMessage is called (response starts)
          
          // Set up the same response timeout for retry as for new messages
          const responseTimeoutId = setTimeout(() => {
            setIsThinking(false);
            setChatStatus(CHAT_STATUS.ERROR);
            
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      hasError: true,
                      isRetrying: false,
                      errorMessage: "No response received. Connection may be lost.",
                    }
                  : msg
              )
            );
            
            setIsStreaming(false);
            setChatStatus(CHAT_STATUS.IDLE);
            setStreamingStatus(STREAMING_STATUS.IDLE);
          }, 120000); // 120 seconds - more reasonable for LLM processing and tool execution
          
          (window as any).responseTimeoutId = responseTimeoutId;
        } catch (error) {
          // Retry failed - show error state again and reset loading states
          setIsThinking(false);
          setIsStreaming(false);
          setChatStatus(CHAT_STATUS.ERROR);
          setStreamingStatus(STREAMING_STATUS.IDLE);

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    isRetrying: false,
                    hasError: true,
                    errorMessage:
                      error instanceof Error ? error.message : "Retry failed. Please try again.",
                  }
                : msg
            )
          );
          
          // Reset to idle
          setChatStatus(CHAT_STATUS.IDLE);
        }
      },
      [
        messages,
        setMessages,
        resetConversationLoader,
        connectChatClient,
        handleSubmit,
      ]
    );

    // Handle retry connection: attempt to reconnect when connection fails
    const handleRetryConnection = useCallback(async () => {
      try {
        await connectChatClient();
      } catch (error) {
        console.error("Failed to reconnect:", error);
      }
    }, [connectChatClient]);

    const handlers = useMemo(
      () => ({
        onSubmit: handleSubmit,
        onFileUpload: handleFileUpload,
        onStopGeneration: stopGeneration,
        onPromptSelect: handlePromptSelect,
        onRetryMessage: handleRetryMessage,
        onRetryConnection: handleRetryConnection,
      }),
      [
        handleSubmit,
        handleFileUpload,
        stopGeneration,
        handlePromptSelect,
        handleRetryMessage,
        handleRetryConnection,
      ]
    );

    // Combine all memos into final context value
    const chatContextValue = useMemo(
      () => ({
        ...messageState,
        ...uiState,
        ...configState,
        ...helpers,
        ...handlers,
        currentAssistantMessageIdRef,
        messagesEndRef,
        chatInputRef,
      }),
      [
        messageState,
        uiState,
        configState,
        helpers,
        handlers,
        currentAssistantMessageIdRef,
        messagesEndRef,
        chatInputRef,
      ]
    );

    // Memoize bubble visibility check to prevent recalculation on every render
    // Only recompute when dependencies change
    const shouldShowBubble = useMemo(
      () =>
        chatUtils.state.shouldShowBubble(
          currentMode as ChatMode,
          isModalOpen,
          isCollapsed
        ),
      [currentMode, isModalOpen, isCollapsed]
    );

    // Render bubble button if needed
    if (shouldShowBubble) {
      return (
        <ChatErrorBoundary>
          <ChatBubbleButton
            mode={currentMode as ChatMode}
            headerName={config.headerName}
            bubbleText={config.bubbleText}
            showBubbleText={config.features?.showBubbleText !== false}
            onClick={handleBubbleClick}
          />
        </ChatErrorBoundary>
      );
    }

    return (
      <ChatErrorBoundary>
        <WebSocketErrorBoundary
          onError={(error) => {
            if (config.onError) {
              config.onError(error);
            }
          }}
        >
          <div className={containerClasses} style={config.customStyles}>
            <NetworkStatusBanner
              isVisible={!isOnline}
              isReconnecting={connectionState === ConnectionState.RECONNECTING}
            />
            {/* Connection Status Notification */}
            {/* <ConnectionNotification
              isConnected={isConnected}
              isConnecting={isConnecting}
              isReconnecting={isReconnecting}
              reconnectAttempt={reconnectAttempt}
              maxReconnectAttempts={Infinity}
              onRetry={handleRetryConnection}
            /> */}

            {/* Header */}
            {chatUtils.state.shouldShowHeader(config.headerVisible) && (
              <ChatHeader
                headerName={config.headerName}
                mode={currentMode as ChatMode}
                isCollapsed={isCollapsed}
                isModalOpen={isModalOpen}
                onClose={closeModal}
                onToggleFullscreen={toggleFullscreen}
                onToggleCollapse={toggleCollapse}
              />
            )}

            {/* Main Content - only when not collapsed */}
            {!isCollapsed && (
              <FileUploadErrorBoundary
                onError={(error) => {
                  if (config.onError) {
                    config.onError(error);
                  }
                }}
              >
                <ChatProvider value={chatContextValue}>
                  <ChatContent />
                </ChatProvider>
              </FileUploadErrorBoundary>
            )}
          </div>
        </WebSocketErrorBoundary>
      </ChatErrorBoundary>
    );
  }
);

ChatWrapperInner.displayName = "ChatWrapperInner";

const ChatWrapperContainer = forwardRef<ChatWrapperRef, ChatWrapperProps>(
  (props, ref) => {
    const { auth, chatServerUrl, chatServerKey, contextHelpers } = props;
    const locale = contextHelpers?.locale || "en";

    return (
      <TranslationProvider
        locale={locale}
        chatServerUrl={chatServerUrl}
        chatServerKey={chatServerKey}
        mpAuthToken={auth.token}
      >
        <ChatWrapperInner ref={ref} {...props} />
      </TranslationProvider>
    );
  }
);

ChatWrapperContainer.displayName = "ChatWrapperContainer";

const ChatWrapper = memo(ChatWrapperContainer);

export { ChatWrapper };
