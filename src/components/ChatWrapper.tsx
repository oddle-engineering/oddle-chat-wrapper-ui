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
import { DevSettings } from "./DevSettings";
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
import { SettingsIcon } from "./icons";
import { ChatProvider } from "../contexts";
import { NetworkStatusBanner } from "./NetworkStatusBanner";
import "../styles/chat-wrapper.css";

const ChatWrapperContainer = forwardRef<ChatWrapperRef, ChatWrapperProps>(
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
      tools,
      devMode = false,
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
        }),
      [httpApiUrl, userMpAuthToken, chatServerKey]
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

    // Dev state
    const isDevSettingsOpen = useUIStore((state) => state.isDevSettingsOpen);
    const setIsDevSettingsOpen = useUIStore(
      (state) => state.setIsDevSettingsOpen
    );

    // Streaming state (now using Zustand instead of messageHandling hook)
    const isStreaming = useUIStore((state) => state.isStreaming);
    const setIsStreaming = useUIStore((state) => state.setIsStreaming);
    const isThinking = useUIStore((state) => state.isThinking);
    const setIsThinking = useUIStore((state) => state.setIsThinking);
    const streamingContent = useUIStore((state) => state.streamingContent);
    const isHandlingTool = useUIStore((state) => state.isHandlingTool);

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
      // stopGeneration: originalStopGeneration, // DISABLED: Stop functionality
    } = messageHandling;

    // Refs for managing UI
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<ChatInputRef>(null);

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

        // Update metadata if server allows it and we have metadata
        if (
          data.canUpdateMetadata &&
          metadata &&
          Object.keys(metadata).length > 0 &&
          chatClientRef.current
        ) {
          chatClientRef.current
            .updateMetadata(data.providerResId, { metadata })
            .then(() => {
              console.log("[ChatWrapper] ✅ Metadata update successful");
            })
            .catch((error: any) => {
              console.error(
                "[ChatWrapper] ❌ Failed to update metadata:",
                error
              );
            });
        }
      },
      [setProviderResId, setCurrentThreadId, metadata]
    );

    // Handle system events
    const handleSystemEvent = useCallback(
      (event: SystemEvent) => {
        console.log("[ChatWrapper] System event received:", event);
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
        console.log(
          "[ChatWrapper] Network restored, attempting reconnection..."
        );
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

    // DISABLED: Stop generation functionality is not yet implemented on the server
    // Custom stop generation that sends WebSocket stop_run message
    const stopGeneration = useCallback(() => {
      console.log("[ChatWrapper] Stop generation disabled - server implementation pending");
      // Stop functionality disabled until server implementation is ready
      // TODO: Re-enable when server supports stop functionality
      // 
      // Original implementation:
      // originalStopGeneration();
      // setChatStatus(CHAT_STATUS.IDLE);
      // setStreamingStatus(STREAMING_STATUS.IDLE);
      // if (chatClient && currentProviderResId) {
      //   chatClient.stopRun(currentProviderResId);
      // }
    }, []);

    // Expose imperative handle for parent components
    useImperativeHandle(
      ref,
      () => ({
        updateMetadata: (updates: { tag?: string | null; metadata?: any }) => {
          if (!chatClient) {
            console.warn(
              "ChatWrapper: Cannot update metadata - chat client not initialized"
            );
            return;
          }

          if (!currentProviderResId) {
            console.warn(
              "ChatWrapper: Cannot update metadata - no active conversation (providerResId not set)"
            );
            return;
          }

          chatClient
            .updateMetadata(currentProviderResId, updates)
            .catch((error) => {
              console.error(
                "ChatWrapper: Failed to update thread metadata:",
                error
              );
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
      });

    // Handle retry: reconnect WebSocket and reload conversation
    // const handleRetryConnection = useCallback(async () => {
    //   console.log("ChatWrapper: Retrying connection and reloading conversation...");
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

        try {
          // Business logic: Submit message via service
          // Use currentProviderResId (from loaded thread) for conversation continuity
          await chatClient.onTriggerMessage({
            message: userMessage.content,
            media,
            providerResId: currentProviderResId || undefined,
          });

          // State updates: Transition to streaming
          setChatStatus(CHAT_STATUS.STREAMING);
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
                    errorMessage:
                      connectionState !== ConnectionState.CONNECTED
                        ? "Failed to send message."
                        : error instanceof Error
                        ? error.message
                        : "Failed to send message",
                  }
                : msg
            )
          );

          // State updates: Reset to idle
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

    // Handle settings button click
    const handleOpenSettings = useCallback(() => {
      setIsDevSettingsOpen(true);
    }, [setIsDevSettingsOpen]);

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
      }),
      [
        isLoadingConversation,
        chatStatus,
        conversationError,
        isOnline,
        connectionState,
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
        clientTools: uiClientTools,
        fileUploadEnabled: config.features?.fileUpload,
      }),
      [
        config.headerName,
        config.headerDescription,
        config.placeholderTexts,
        config.chipName,
        config.chipLogo,
        config.suggestedPrompts,
        config.features?.fileUpload,
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

        // Mark message as retrying

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

        try {
          // Reset conversation loader and reconnect
          resetConversationLoader();
          await connectChatClient();

          // Submit the message directly without creating a new user message
          await chatClient?.onTriggerMessage({
            message: messageToRetry.content,
            media: messageToRetry.media,
            providerResId: currentProviderResId || undefined,
          });

          // Clear the retrying state on the original message (it will show as a normal sent message)
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId ? { ...msg, isRetrying: false } : msg
            )
          );
        } catch (error) {
          // Retry failed - show error state again

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    isRetrying: false,
                    hasError: true,
                    errorMessage:
                      error instanceof Error ? error.message : "Retry failed",
                  }
                : msg
            )
          );
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

    const handlers = useMemo(
      () => ({
        onSubmit: handleSubmit,
        onFileUpload: handleFileUpload,
        onStopGeneration: stopGeneration,
        onPromptSelect: handlePromptSelect,
        onRetryMessage: handleRetryMessage,
      }),
      [
        handleSubmit,
        handleFileUpload,
        stopGeneration,
        handlePromptSelect,
        handleRetryMessage,
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
            console.error("WebSocket error in ChatWrapper:", error);
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

            {/* Floating settings button for when header is not visible */}
            {devMode && config.headerVisible === false && (
              <button
                className="chat-wrapper__settings-button chat-wrapper__settings-button--floating"
                onClick={handleOpenSettings}
                title="Developer Settings"
              >
                <SettingsIcon size={16} />
              </button>
            )}

            {/* Header */}
            {chatUtils.state.shouldShowHeader(config.headerVisible) && (
              <ChatHeader
                headerName={config.headerName}
                mode={currentMode as ChatMode}
                isCollapsed={isCollapsed}
                isModalOpen={isModalOpen}
                devMode={devMode}
                onClose={closeModal}
                onToggleFullscreen={toggleFullscreen}
                onToggleCollapse={toggleCollapse}
                onOpenSettings={handleOpenSettings}
              />
            )}

            {/* Main Content - only when not collapsed */}
            {!isCollapsed && (
              <FileUploadErrorBoundary
                onError={(error) => {
                  console.error("File upload error:", error);
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

            {/* Dev Settings Popup */}
            <DevSettings
              isOpen={isDevSettingsOpen}
              onClose={() => setIsDevSettingsOpen(false)}
              apiUrl={httpApiUrl}
              userMpAuthToken={userMpAuthToken}
              chatServerKey={chatServerKey}
            />
          </div>
        </WebSocketErrorBoundary>
      </ChatErrorBoundary>
    );
  }
);

ChatWrapperContainer.displayName = "ChatWrapperContainer";

const ChatWrapper = memo(ChatWrapperContainer);

export { ChatWrapper };
