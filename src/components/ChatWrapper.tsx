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
  EntityType,
} from "../types";
import { ChatInputRef } from "./ChatInput";
import { DevSettings } from "./DevSettings";
import { SystemEvent, SystemEventType } from "../client";
import {
  useWebSocketConnection,
  useMessageHandling,
  useConversationLoader,
} from "../hooks";
import { useUIStore } from "../store";
import { CHAT_STATUS, STREAMING_STATUS } from "../constants/chatStatus";
import { FileUploadService } from "../services/fileUploadService";
import { ChatSubmissionService } from "../services/chatSubmissionService";
import { chatUtils } from "../utils/chatUtils";
import {
  ChatErrorBoundary,
  WebSocketErrorBoundary,
  FileUploadErrorBoundary,
} from "./error";
import { ConnectionNotification } from "./ConnectionNotification";
import { ChatBubbleButton } from "./chat/ChatBubbleButton";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContent } from "./chat/ChatContent";
import { SettingsIcon } from "./icons";
import { ChatProvider } from "../contexts";
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
      addMessage,
      handleSetMessage,
      handleReasoningUpdate,
      handleChatFinished,
      handleChatError,
      stopGeneration,
    } = messageHandling;

    // Refs for managing UI
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<ChatInputRef>(null);

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
          case SystemEventType.CONNECTION_RESTORED:
          default:
            break;
        }
      },
      [handleChatFinished, handleChatError, setProviderResId]
    );

    // Initialize WebSocket connection
    const { chatClient, isConnected, isConnecting, connectChatClient, disconnectChatClient } =
      useWebSocketConnection({
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
      });

    // Expose imperative handle for parent components
    useImperativeHandle(
      ref,
      () => ({
        updateEntityId: (newEntityId: string, newEntityType?: EntityType) => {
          if (!chatClient) {
            console.warn(
              "ChatWrapper: Cannot update entityId - chat client not initialized"
            );
            return;
          }

          if (!currentProviderResId) {
            console.warn(
              "ChatWrapper: Cannot update entityId - no active conversation (providerResId not set)"
            );
            return;
          }

          if (!newEntityType) {
            console.warn(
              "ChatWrapper: Cannot update entityId - entityType is required"
            );
            return;
          }

          chatClient
            .updateEntityId(
              currentProviderResId,
              newEntityId,
              newEntityType.toString()
            )
            .catch((error) => {
              console.error(
                "ChatWrapper: Failed to update entity attachment:",
                error
              );
            });
        },
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
    const { resetConversationLoader, reloadConversation } = useConversationLoader({
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
    const handleRetryConnection = useCallback(async () => {
      console.log("ChatWrapper: Retrying connection and reloading conversation...");
      
      // Reset conversation loader to allow reloading
      resetConversationLoader();
      
      // Reconnect WebSocket
      await connectChatClient();
      
      // Reload conversation messages
      await reloadConversation();
    }, [resetConversationLoader, connectChatClient, reloadConversation]);

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
        // Early validation using service
        if (
          !chatSubmissionService?.canSubmit(message, isStreaming, isConnected)
        ) {
          return;
        }

        // State updates: Start submission
        setIsStreaming(true);
        setIsThinking(true);
        setChatStatus(CHAT_STATUS.SUBMITTED);
        setStreamingStatus(STREAMING_STATUS.STARTING);

        try {
          // Business logic: Submit message via service
          // Use currentProviderResId (from loaded thread) for conversation continuity
          const userMessage = await chatSubmissionService.submitMessage({
            message,
            media,
            providerResId: currentProviderResId || undefined,
          });

          // State updates: Add user message and transition to streaming
          setMessages((prev) => [...prev, userMessage]);
          setChatStatus(CHAT_STATUS.STREAMING);
        } catch (error) {
          // State updates: Handle error state
          setIsThinking(false);
          setChatStatus(CHAT_STATUS.ERROR);

          // Business logic: Create and add error message
          const errorMessage = chatSubmissionService.createErrorMessage(error);
          addMessage("system", errorMessage);

          // State updates: Reset to idle
          setIsStreaming(false);
          setChatStatus(CHAT_STATUS.IDLE);
          setStreamingStatus(STREAMING_STATUS.IDLE);
        }
      },
      [
        chatSubmissionService,
        isStreaming,
        isConnected,
        setMessages,
        setIsStreaming,
        setIsThinking,
        setChatStatus,
        setStreamingStatus,
        addMessage,
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
      }),
      [isLoadingConversation, chatStatus, conversationError]
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

    const handlers = useMemo(
      () => ({
        onSubmit: handleSubmit,
        onFileUpload: handleFileUpload,
        onStopGeneration: stopGeneration,
        onPromptSelect: handlePromptSelect,
      }),
      [handleSubmit, handleFileUpload, stopGeneration, handlePromptSelect]
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
            {/* Connection Status Notification */}
            <ConnectionNotification
              isConnected={isConnected}
              isConnecting={isConnecting}
              onRetry={handleRetryConnection}
            />

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
              onDisconnect={disconnectChatClient}
              isConnected={isConnected}
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
