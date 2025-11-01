import { useEffect, useRef, useCallback, memo, useMemo } from "react";
import {
  ChatWrapperProps,
  Message,
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
import { FileUploadService } from "../services/fileUploadService";
import { chatUtils } from "../utils/chatUtils";
import { ChatErrorBoundary, WebSocketErrorBoundary, FileUploadErrorBoundary } from "./error";
import { ChatBubbleButton } from "./chat/ChatBubbleButton";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContent } from "./chat/ChatContent";
import { SettingsIcon } from "./icons";
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
  
  // App identification
  app,
  
  // Existing props
  config,
  tools,
  clientTools,
  initialMessages = [],
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

  // Initialize custom hooks for state management
  const messageHandling = useMessageHandling({ initialMessages });
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
  const { agentClient, isConnected } = useWebSocketConnection({
    // Authentication and server properties
    userMpAuthToken,
    chatServerUrl,
    chatServerKey,
    
    // Entity configuration
    providerResId,
    userId,
    entityId,
    entityType,
    
    // Existing properties
    clientTools,
    tools,
    contextHelpers,
    onSetMessage: handleSetMessage,
    onSystemEvent: handleSystemEvent,
    onReasoningUpdate: handleReasoningUpdate,
  });

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
      if (!message.trim() || isStreaming || !agentClient || !isConnected)
        return;

      const userMessage: Message = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
        media,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);
      setIsThinking(true);
      setChatStatus(CHAT_STATUS.SUBMITTED);
      setStreamingStatus(STREAMING_STATUS.STARTING);

      try {
        await agentClient.onTriggerMessage({
          message: userMessage.content,
          app,
          media,
          convUuid: currentConvUuid || undefined,
          agentPromptPath: undefined,
        });
        setChatStatus(CHAT_STATUS.STREAMING);
      } catch (error) {
        console.error("Agent client send error:", error);
        setIsThinking(false);
        setChatStatus(CHAT_STATUS.ERROR);

        addMessage(
          "system",
          `Sorry, there was an error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );

        if (config.onError) {
          config.onError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        }

        setIsStreaming(false);
        setChatStatus(CHAT_STATUS.IDLE);
        setStreamingStatus(STREAMING_STATUS.IDLE);
      }
    },
    [
      isStreaming,
      agentClient,
      isConnected,
      setMessages,
      setIsStreaming,
      setIsThinking,
      setChatStatus,
      setStreamingStatus,
      addMessage,
      config,
      app,
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


  // Calculate container classes using utility
  const containerClasses = chatUtils.css.getContainerClasses(
    currentMode as ChatMode,
    config.position,
    config.theme,
    isCollapsed,
    config.constrainedHeight
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

  // Check if bubble should be shown using utility
  const shouldShowBubble = chatUtils.state.shouldShowBubble(
    currentMode as ChatMode,
    isModalOpen,
    isCollapsed
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
              <ChatContent
                messages={messages}
                isLoadingConversation={isLoadingConversation}
                isStreaming={isStreaming}
                isThinking={isThinking}
                isHandlingTool={isHandlingTool}
                appName={config.appName}
                description={config.description}
                placeholder={config.placeholder}
                placeholderTexts={config.placeholderTexts}
                restaurantName={config.restaurantName}
                restaurantLogo={config.restaurantLogo}
                suggestedPrompts={config.suggestedPrompts}
                chatStatus={chatStatus}
                clientTools={clientTools}
                getReasoningTitle={getReasoningTitle}
                getReasoningStatus={getReasoningStatus}
                getReasoningDuration={getReasoningDuration}
                getReasoningContentOnly={getReasoningContentOnly}
                getToolingTitle={getToolingTitle}
                getToolingStatus={getToolingStatus}
                currentAssistantMessageIdRef={currentAssistantMessageIdRef}
                fileUploadEnabled={config.features?.fileUpload}
                onSubmit={handleSubmit}
                onFileUpload={handleFileUpload}
                onStopGeneration={stopGeneration}
                onPromptSelect={handlePromptSelect}
                messagesEndRef={messagesEndRef}
                chatInputRef={chatInputRef}
                conversationError={conversationError}
              />
            </FileUploadErrorBoundary>
          )}

          {/* Dev Settings Popup */}
          <DevSettings
            isOpen={isDevSettingsOpen}
            onClose={() => setIsDevSettingsOpen(false)}
            app={app}
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
