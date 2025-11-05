import { useEffect, useRef, useCallback, memo, useMemo } from "react";
import {
  ChatWrapperProps,
  ChatMode,
} from "../types";
import { ChatInputRef } from "./ChatInput";
import { DevSettings } from "./DevSettings";
import { SystemEvent, SystemEventType } from "../client";
import {
  useWebSocketConnection,
  useMessageHandling,
  useUIState,
  useConversationLoader,
} from "../hooks";
import {
  CHAT_STATUS,
  STREAMING_STATUS,
} from "../constants/chatStatus";
import { FileUploadService, ChatSubmissionService } from "../services";
import { chatUtils } from "../utils/chatUtils";
import { ChatErrorBoundary, WebSocketErrorBoundary, FileUploadErrorBoundary } from "./error";
import { ConnectionNotification } from "./ConnectionNotification";
import { ChatBubbleButton } from "./chat/ChatBubbleButton";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContent } from "./chat/ChatContent";
import { SettingsIcon } from "./icons";
import { ChatProvider } from "../contexts";
import "../styles/chat-wrapper.css";

function ChatWrapper({
  // Authentication and server configuration
  userMpAuthToken,
  chatServerUrl,
  chatServerKey,
  
  // Entity and conversation configuration
  providerResId,
  userId,
  entityId,
  entityType,
  
  
  // Existing props
  config,
  tools,
  devMode = false,
  contextHelpers,
}: ChatWrapperProps) {
  // Validate required props early using utility
  chatUtils.validation.validateAuthProps({
    userMpAuthToken,
    chatServerUrl,
    chatServerKey,
    userId,
  });

  // Convert chatServerUrl to HTTP URL for REST API calls
  const httpApiUrl = useMemo(() => {
    return chatUtils.url.convertWebSocketToHttp(chatServerUrl);
  }, [chatServerUrl]);

  // Initialize file upload service
  const fileUploadService = useMemo(
    () => new FileUploadService({
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
  const uiState = useUIState({ initialMode: config.mode });

  // Extract frequently used values from hooks
  const {
    messages,
    setMessages,
    isStreaming,
    setIsStreaming,
    isThinking,
    setIsThinking,
    streamingContent,
    isHandlingTool,
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

  const {
    isModalOpen,
    isCollapsed,
    currentMode,
    chatStatus,
    setChatStatus,
    streamingStatus,
    setStreamingStatus,
    isLoadingConversation,
    setIsLoadingConversation,
    conversationError,
    setConversationError,
    setCurrentThreadId,
    currentConvUuid,
    setCurrentConvUuid,
    isDevSettingsOpen,
    setIsDevSettingsOpen,
    openModal,
    closeModal,
    toggleCollapse,
    toggleFullscreen,
  } = uiState;

  // Refs for managing UI
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputRef>(null);

  // Handle system events
  const handleSystemEvent = useCallback((event: SystemEvent) => {
    switch (event.type) {
      case SystemEventType.CHAT_COMPLETED:
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
  }, [handleChatFinished, handleChatError]);

  // Initialize WebSocket connection
  const { chatClient, isConnected, connectChatClient } = useWebSocketConnection({
    // Authentication and server properties
    userMpAuthToken,
    chatServerUrl,
    chatServerKey,
    
    // Entity configuration
    providerResId,
    userId,
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

  // Initialize chat submission service (depends on chatClient)
  const chatSubmissionService = useMemo(
    () => chatClient ? new ChatSubmissionService(chatClient, {
      onError: config.onError,
    }) : null,
    [chatClient, config.onError]
  );

  // Initialize conversation loader
  useConversationLoader({
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
  });

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
      if (!chatSubmissionService?.canSubmit(message, isStreaming, isConnected)) {
        return;
      }

      // State updates: Start submission
      setIsStreaming(true);
      setIsThinking(true);
      setChatStatus(CHAT_STATUS.SUBMITTED);
      setStreamingStatus(STREAMING_STATUS.STARTING);

      try {
        // Business logic: Submit message via service
        const userMessage = await chatSubmissionService.submitMessage({
          message,
          media,
          convUuid: currentConvUuid || undefined,
          agentPromptPath: undefined,
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
      currentConvUuid,
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
    () => chatUtils.css.getContainerClasses(
      currentMode as ChatMode,
      config.position,
      config.theme,
      isCollapsed,
      config.constrainedHeight
    ),
    [currentMode, config.position, config.theme, isCollapsed, config.constrainedHeight]
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
  const handlePromptSelect = useCallback((prompt: { description: string }) => {
    if (chatInputRef.current) {
      chatInputRef.current.setText(prompt.description);
    }
  }, []);

  // Prepare chat context value to eliminate prop drilling
  const chatContextValue = useMemo(() => ({
    // Message state
    messages,
    isStreaming,
    isThinking,
    isHandlingTool,
    
    // UI state
    isLoadingConversation,
    chatStatus,
    conversationError,
    
    // Configuration
    appName: config.appName,
    description: config.description,
    placeholder: config.placeholder,
    placeholderTexts: config.placeholderTexts,
    restaurantName: config.restaurantName,
    restaurantLogo: config.restaurantLogo,
    suggestedPrompts: config.suggestedPrompts,
    
    // Tools & features
    clientTools: uiClientTools,
    fileUploadEnabled: config.features?.fileUpload,
    
    // Reasoning helpers
    getReasoningTitle,
    getReasoningStatus,
    getReasoningDuration,
    getReasoningContentOnly,
    
    // Tooling helpers
    getToolingTitle,
    getToolingStatus,
    
    // Refs
    currentAssistantMessageIdRef,
    messagesEndRef,
    chatInputRef,
    
    // Event handlers
    onSubmit: handleSubmit,
    onFileUpload: handleFileUpload,
    onStopGeneration: stopGeneration,
    onPromptSelect: handlePromptSelect,
  }), [
    messages,
    isStreaming,
    isThinking,
    isHandlingTool,
    isLoadingConversation,
    chatStatus,
    conversationError,
    config.appName,
    config.description,
    config.placeholder,
    config.placeholderTexts,
    config.restaurantName,
    config.restaurantLogo,
    config.suggestedPrompts,
    config.features?.fileUpload,
    uiClientTools,
    getReasoningTitle,
    getReasoningStatus,
    getReasoningDuration,
    getReasoningContentOnly,
    getToolingTitle,
    getToolingStatus,
    currentAssistantMessageIdRef,
    messagesEndRef,
    chatInputRef,
    handleSubmit,
    handleFileUpload,
    stopGeneration,
    handlePromptSelect,
  ]);

  // Memoize bubble visibility check to prevent recalculation on every render
  // Only recompute when dependencies change
  const shouldShowBubble = useMemo(
    () => chatUtils.state.shouldShowBubble(
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
          appName={config.appName}
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
          console.error('WebSocket error in ChatWrapper:', error);
          if (config.onError) {
            config.onError(error);
          }
        }}
      >
        <div className={containerClasses} style={config.customStyles}>
          {/* Connection Status Notification */}
          <ConnectionNotification
            isConnected={isConnected}
            onRetry={connectChatClient}
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
              appName={config.appName}
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
                console.error('File upload error:', error);
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

const ChatWrapperMemo = memo(ChatWrapper);

export { ChatWrapperMemo as ChatWrapper };
