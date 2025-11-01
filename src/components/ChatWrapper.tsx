import { useEffect, useRef, useCallback, memo, useMemo } from "react";
import {
  ChatWrapperProps,
  Message,
} from "../types";
import { ChatInput, ChatInputRef } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { InlineLoader } from "./InlineLoader";
import { DevSettings } from "./DevSettings";
import { MessagesList } from "./MessagesList";
import { SystemEvent, SystemEventType } from "../client";
import { buildClasses } from "../utils/classNames";
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
import {
  ChatIcon,
  CloseIcon,
  FullscreenIcon,
  CollapseIcon,
  SettingsIcon,
} from "./icons";
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
  // Validate required props early
  if (!userMpAuthToken) {
    throw new Error("ChatWrapper: userMpAuthToken is required");
  }
  if (!chatServerUrl) {
    throw new Error("ChatWrapper: chatServerUrl is required");
  }
  if (!chatServerKey) {
    throw new Error("ChatWrapper: chatServerKey is required");
  }
  if (!userId) {
    throw new Error("ChatWrapper: userId is required");
  }

  // Convert WebSocket URL to HTTP URL for REST API calls
  const getHttpUrl = useCallback((wsUrl: string): string => {
    return wsUrl.replace(/^wss?:\/\//, (match) =>
      match === "wss://" ? "https://" : "http://"
    );
  }, []);

  // Convert chatServerUrl to HTTP URL for REST API calls
  const httpApiUrl = useMemo(() => {
    return getHttpUrl(chatServerUrl);
  }, [chatServerUrl, getHttpUrl]);

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

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: File[]): Promise<string[]> => {
      const newMedia: string[] = [];
      const uploadServerUrl = httpApiUrl;
      const folder = "chat-uploads";

      for (const file of files) {
        try {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          // Upload the file to the server with authentication headers
          const headers: HeadersInit = {};
          if (userMpAuthToken) {
            headers['Authorization'] = `Bearer ${userMpAuthToken}`;
          }
          if (chatServerKey) {
            headers['X-Chat-Server-Key'] = chatServerKey;
          }

          const response = await fetch(`${uploadServerUrl}/upload`, {
            method: "POST",
            headers,
            body: formData,
          });

          const result = await response.json();

          if (response.ok) {
            // Store the URL from the server response
            // For images, we can still use the URL directly
            // For other files, store metadata with the URL
            if (file.type.startsWith("image/")) {
              newMedia.push(result.url);
            } else {
              // For non-image files, create a data URL format with metadata
              newMedia.push(
                `data:${file.type};name=${encodeURIComponent(
                  result.fileName || file.name
                )};url=${encodeURIComponent(result.url)}`
              );
            }
          } else {
            console.error("❌ Upload failed:", result.error);
            // Fallback to base64 encoding for images if upload fails
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              const base64Result = await new Promise<string>(
                (resolve, reject) => {
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                }
              );
              newMedia.push(base64Result);
            } else {
              // For other files, store metadata with filename
              newMedia.push(
                `data:${file.type};name=${encodeURIComponent(
                  file.name
                )};base64,placeholder`
              );
            }
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          // Fallback to base64 encoding for images on error
          try {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              const base64Result = await new Promise<string>(
                (resolve, reject) => {
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                }
              );
              newMedia.push(base64Result);
            } else {
              // For other files, store metadata with filename
              newMedia.push(
                `data:${file.type};name=${encodeURIComponent(
                  file.name
                )};base64,placeholder`
              );
            }
          } catch (fallbackError) {
            console.error("Error in fallback encoding:", fallbackError);
          }
        }
      }

      return newMedia;
    },
    [httpApiUrl, userMpAuthToken, chatServerKey]
  );


  const containerClasses = buildClasses(
    "chat-wrapper",
    `chat-wrapper--${currentMode}`,
    config.position && `chat-wrapper--${config.position}`,
    config.theme && `chat-wrapper--${config.theme}`,
    isCollapsed && "chat-wrapper--collapsed",
    currentMode === "embedded" &&
      config.constrainedHeight &&
      "chat-wrapper--constrained"
  );

  // Render bubble button for modal, sidebar (collapsed), and fullscreen (collapsed) modes
  const renderBubbleButton = () => {
    const shouldShowBubble =
      (currentMode === "modal" && !isModalOpen) ||
      (currentMode === "sidebar" && isCollapsed) ||
      (currentMode === "fullscreen" && isCollapsed);

    if (shouldShowBubble) {
      const handleClick = currentMode === "modal" ? openModal : toggleCollapse;
      const title =
        currentMode === "modal"
          ? `Open ${config.appName}`
          : `Expand ${config.appName}`;

      return (
        <button
          className="chat-wrapper__bubble-button"
          onClick={handleClick}
          title={title}
        >
          <ChatIcon className="chat-wrapper__bubble-icon" size={24} />
          {config.features?.showBubbleText !== false && (
            <span className="chat-wrapper__bubble-text">
              {config.bubbleText || "Chat"}
            </span>
          )}
        </button>
      );
    }
    return null;
  };

  // Render close button for modal mode
  const renderCloseButton = () => {
    if (currentMode === "modal" && isModalOpen) {
      return (
        <button
          className="chat-wrapper__close-button"
          onClick={closeModal}
          title="Close chat"
        >
          <CloseIcon size={20} />
        </button>
      );
    }
    return null;
  };

  // Render fullscreen toggle button for sidebar mode and minimize button for fullscreen mode
  const renderModeToggleButton = () => {
    if (
      (currentMode === "sidebar" || currentMode === "fullscreen") &&
      !isCollapsed
    ) {
      const isFullscreen = currentMode === "fullscreen";

      return (
        <button
          className={
            isFullscreen
              ? "chat-wrapper__minimize-button"
              : "chat-wrapper__fullscreen-button"
          }
          onClick={toggleFullscreen}
          title={isFullscreen ? "Switch to sidebar" : "Switch to fullscreen"}
        >
          <FullscreenIcon size={20} isFullscreen={isFullscreen} />
        </button>
      );
    }
    return null;
  };

  // Render collapse button for sidebar and fullscreen modes (only when expanded)
  const renderCollapseButton = () => {
    const shouldShow =
      (currentMode === "sidebar" || currentMode === "fullscreen") &&
      !isCollapsed;

    if (shouldShow) {
      return (
        <button
          className="chat-wrapper__collapse-button"
          onClick={toggleCollapse}
          title="Collapse chat"
        >
          <CollapseIcon size={20} />
        </button>
      );
    }
    return null;
  };

  // Render settings button (only in dev mode)
  const renderSettingsButton = () => {
    if (!devMode) return null;

    // If header is visible, render in header controls
    if (config.headerVisible !== false) {
      return (
        <button
          className="chat-wrapper__settings-button"
          onClick={() => setIsDevSettingsOpen(true)}
          title="Developer Settings"
        >
          <SettingsIcon size={16} />
        </button>
      );
    }

    // If header is not visible, render as floating button
    return null; // We'll render this separately outside the header
  };

  // Render floating settings button when header is not visible
  const renderFloatingSettingsButton = () => {
    if (!devMode || config.headerVisible !== false) return null;

    return (
      <button
        className="chat-wrapper__settings-button chat-wrapper__settings-button--floating"
        onClick={() => setIsDevSettingsOpen(true)}
        title="Developer Settings"
      >
        <SettingsIcon size={16} />
      </button>
    );
  };

  // For modal mode, only render when open
  // For sidebar and fullscreen modes, render bubble when collapsed
  if (currentMode === "modal" && !isModalOpen) {
    return renderBubbleButton();
  }

  if (
    (currentMode === "sidebar" || currentMode === "fullscreen") &&
    isCollapsed
  ) {
    return renderBubbleButton();
  }

  return (
    <>
      <div className={containerClasses} style={config.customStyles}>
        {/* Floating settings button for when header is not visible */}
        {renderFloatingSettingsButton()}

        {config.headerVisible !== false && (
          <div className="chat-wrapper__header">
            <div className="chat-wrapper__title-area">
              <h2 className="chat-wrapper__title">{config.appName}</h2>
            </div>
            <div className="chat-wrapper__header-controls">
              {renderSettingsButton()}
              {renderModeToggleButton()}
              {renderCollapseButton()}
              {renderCloseButton()}
            </div>
          </div>
        )}

        {!isCollapsed && (
          <>
            {/* Conversation error message */}
            {conversationError && (
              <div className="chat-wrapper__conversation-error">
                <p>⚠️ {conversationError}</p>
              </div>
            )}

            {/* Main Header Section - only show when no messages and not loading */}
            {messages.length === 0 &&
              !isStreaming &&
              !isLoadingConversation && (
                <div className="chat-wrapper__main-header">
                  <h1 className="chat-wrapper__main-title">{config.appName}</h1>
                  {config.description && (
                    <p className="chat-wrapper__description">
                      {config.description}
                    </p>
                  )}
                </div>
              )}

            {/* Chat Content Area - flexible layout based on message state */}
            <div
              className={`chat-wrapper__content ${
                messages.length === 0 && !isStreaming && !isLoadingConversation
                  ? "chat-wrapper__content--empty"
                  : "chat-wrapper__content--with-messages"
              }`}
            >
              {/* Messages Area */}
              {isLoadingConversation && messages.length === 0 ? (
                <div className="chat-wrapper__messages">
                  <InlineLoader fullHeight={true} />
                </div>
              ) : (
                <MessagesList
                  ref={messagesEndRef}
                  messages={messages}
                  isThinking={isThinking}
                  isHandlingTool={isHandlingTool}
                  getReasoningTitle={getReasoningTitle}
                  getReasoningStatus={getReasoningStatus}
                  getReasoningDuration={getReasoningDuration}
                  getReasoningContentOnly={getReasoningContentOnly}
                  getToolingTitle={getToolingTitle}
                  getToolingStatus={getToolingStatus}
                  clientTools={clientTools || []}
                  currentAssistantMessageIdRef={currentAssistantMessageIdRef}
                />
              )}

              {/* Chat Input - flexible sizing */}
              <div className="chat-wrapper__input-container">
                <ChatInput
                  ref={chatInputRef}
                  placeholder={config.placeholder}
                  placeholderTexts={config.placeholderTexts}
                  disabled={isStreaming}
                  chatStatus={chatStatus}
                  fileUploadEnabled={config.features?.fileUpload}
                  restaurantName={config.restaurantName}
                  restaurantLogo={config.restaurantLogo}
                  hasMessages={messages.length > 0}
                  onSubmit={(message, media) => handleSubmit(message, media)}
                  onFileUpload={handleFileUpload}
                  onStopGeneration={stopGeneration}
                />
              </div>

              {/* Suggested Prompts - only show when no messages and not loading */}
              {messages.length === 0 &&
                !isStreaming &&
                !isLoadingConversation &&
                config.suggestedPrompts && (
                  <SuggestedPrompts
                    prompts={config.suggestedPrompts}
                    onPromptSelect={(prompt) => {
                      // Copy prompt description to the input field
                      if (chatInputRef.current) {
                        chatInputRef.current.setText(prompt.description);
                      }
                    }}
                  />
                )}
            </div>
          </>
        )}

        {config.onError && <div className="chat-wrapper__error-boundary" />}

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
    </>
  );
}

const ChatWrapperMemo = memo(ChatWrapper);

export { ChatWrapperMemo as ChatWrapper };
