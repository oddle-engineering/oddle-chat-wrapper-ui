import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import {
  ChatWrapperProps,
  Message,
  ToolResult,
  ContextHelpers,
  ToolCallRequest,
} from "../types";
import { ChatStatus } from "./PromptInput";
import { ChatInput, ChatInputRef } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { InlineLoader } from "./InlineLoader";
import { DevSettings } from "./DevSettings";
import { MessagesList } from "./MessagesList";
import { WebSocketChatClient, SystemEvent, SystemEventType } from "../client";
import { sanitizeMessage } from "../utils/security";
import { fetchThreadMessages } from "../utils/threadApi";
import {
  ReasoningDetector,
  REASONING_CONSTANTS,
} from "../client/constants/reasoning";
import "../styles/chat-wrapper.css";

function ChatWrapper({
  apiUrl,
  config,
  tools,
  clientTools,
  initialMessages = [],
  userId,
  devMode = false,
  app,
  contextHelpers,
}: ChatWrapperProps) {
  // Convert WebSocket URL to HTTP URL for REST API calls
  const getHttpUrl = useCallback((wsUrl: string): string => {
    return wsUrl.replace(/^wss?:\/\//, (match) =>
      match === "wss://" ? "https://" : "http://"
    );
  }, []);

  const httpApiUrl = useMemo(() => getHttpUrl(apiUrl), [apiUrl, getHttpUrl]);
  // WebSocketChatClient state
  const [agentClient, setAgentClient] = useState<WebSocketChatClient | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const agentClientRef = useRef<WebSocketChatClient | null>(null);

  // Core chat state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState(config.mode);

  // Thread and conversation state
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [conversationError, setConversationError] = useState<string | null>(
    null
  );
  const [_currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [currentConvUuid, setCurrentConvUuid] = useState<string | null>(null);

  // Advanced state for tool results and streaming
  const [toolResults] = useState<ToolResult[]>([]);
  const [streamingStatus, setStreamingStatus] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [, setReasoningContent] = useState("");
  const [streamingContent, setStreamingContent] = useState("");

  // Tool JSON handling state
  const [isHandlingTool, setIsHandlingTool] = useState(false);

  // Tooling handling state
  const [, setToolingMessagesByCallId] = useState<Map<string, string>>(
    new Map()
  ); // Map callId -> messageId

  // Reasoning handling state
  const [, setReasoningMessagesByCallId] = useState<Map<string, string>>(
    new Map()
  ); // Map callId -> messageId

  // Dev mode state
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState(false);

  // Refs for managing streaming
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputRef>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const shouldUpdateMessageRef = useRef<boolean>(true);
  const streamingContentRef = useRef<string>("");
  const hasLoadedConversationRef = useRef<boolean>(false);

  // Utility functions
  const generateId = useCallback(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  );

  // Memoized helper functions to prevent unnecessary re-renders
  const getReasoningStatus = useMemo(
    () =>
      (
        content: string,
        isStreaming?: boolean
      ): "processing" | "completed" | "error" => {
        if (isStreaming === false) {
          if (ReasoningDetector.isErrorMessage(content)) return "error";
          return "completed";
        }
        if (ReasoningDetector.isCompletedMessage(content)) return "completed";
        if (ReasoningDetector.isErrorMessage(content)) return "error";
        return "processing";
      },
    []
  );

  const getReasoningDuration = useMemo(
    () =>
      (content: string): string | undefined => {
        return ReasoningDetector.extractDuration(content);
      },
    []
  );

  const getReasoningContentOnly = useMemo(
    () =>
      (content: string): string => {
        return ReasoningDetector.cleanReasoningContent(content);
      },
    []
  );

  const getReasoningTitle = useMemo(
    () =>
      (content: string, isStreaming?: boolean): string => {
        const messageType = ReasoningDetector.getMessageType(
          content,
          isStreaming
        );

        switch (messageType) {
          case REASONING_CONSTANTS.MESSAGE_TYPES.ERROR:
            return "Error";
          case REASONING_CONSTANTS.MESSAGE_TYPES.COMPLETED:
            return "Completed";
          case REASONING_CONSTANTS.MESSAGE_TYPES.THOUGHT:
            return REASONING_CONSTANTS.UI_TEXT.THOUGHT;
          case REASONING_CONSTANTS.MESSAGE_TYPES.THINKING:
          default:
            return REASONING_CONSTANTS.UI_TEXT.THINKING_ELLIPSIS;
        }
      },
    []
  );

  const getToolingTitle = useMemo(
    () =>
      (content: string, isStreaming?: boolean): string => {
        if (isStreaming === false) {
          if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
            return "Tool Error";
          return "Tool Completed";
        }
        if (
          content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
          content.includes("✅")
        )
          return "Tool Completed";
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
          return "Tool Error";
        if (content.includes(REASONING_CONSTANTS.HANDLING_MARKER))
          return "Tool Processing...";
        return "Tool Processing...";
      },
    []
  );

  const getToolingStatus = useMemo(
    () =>
      (
        content: string,
        isStreaming?: boolean
      ): "processing" | "completed" | "error" => {
        if (isStreaming === false) {
          if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
            return "error";
          return "completed";
        }
        if (
          content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
          content.includes("✅")
        )
          return "completed";
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER)) return "error";
        return "processing";
      },
    []
  );

  // Helper function to add messages
  const addMessage = useCallback(
    (role: Message["role"], content: string) => {
      // Sanitize content based on role
      const isAssistant = role === "assistant";
      const sanitizedContent = sanitizeMessage(content, isAssistant);

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role,
          content: sanitizedContent,
          timestamp: new Date(),
        },
      ]);
    },
    [generateId]
  );

  // Handle chat finished event
  // Helper function to finalize any current streaming message
  const finalizeCurrentStreamingMessage = useCallback(() => {
    if (currentAssistantMessageIdRef.current && streamingContentRef.current) {
      // Final sanitization check before storing the complete message
      const sanitizedContent = sanitizeMessage(
        streamingContentRef.current,
        true
      );

      const finalMessage: Message = {
        id: currentAssistantMessageIdRef.current,
        role: "assistant",
        content: sanitizedContent,
        timestamp: new Date(),
        isStreaming: false,
      };

      setMessages((prev) => [...prev, finalMessage]);

      // Reset streaming state
      currentAssistantMessageIdRef.current = null;
      streamingContentRef.current = "";
      setStreamingContent("");

      return true; // Indicates a message was finalized
    }
    return false; // No streaming message to finalize
  }, []);

  const handleChatFinished = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false); // Hide thinking bubble when chat completes
    setChatStatus("idle");

    // Finalize any current streaming message
    finalizeCurrentStreamingMessage();
    // Focus the input after assistant response completes
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 0);
  }, [finalizeCurrentStreamingMessage]);

  // Handle chat error event
  const handleChatError = useCallback(
    (error: string) => {
      console.error("Chat error:", error);
      setIsStreaming(false);
      setIsThinking(false); // Hide thinking bubble on error
      setChatStatus("error");

      // Finalize any current streaming message before showing error
      finalizeCurrentStreamingMessage();

      addMessage("system", `❌ Chat error: ${error}`);
    },
    [addMessage, finalizeCurrentStreamingMessage]
  );

  // WebSocketChatClient connection management
  const connectAgentClient = useCallback(async () => {
    try {
      const client = new WebSocketChatClient();
      agentClientRef.current = client;
      setAgentClient(client);

      // Use contextHelpers from props or default to empty object
      const contextHelpersToUse: ContextHelpers = contextHelpers || {};

      await client.onInit({
        apiUrl: apiUrl,
        userId: userId,
        toolSchemas: clientTools,
        clientTools: tools,
        contextHelpers: contextHelpersToUse,
        onSetMessage: (char: string) => {
          // Sanitize incoming character data from assistantk
          const sanitizedChar = sanitizeMessage(char, true);

          // Check if we're already streaming
          if (currentAssistantMessageIdRef.current) {
            // Update streaming content without re-rendering messages array
            streamingContentRef.current += sanitizedChar;
            setStreamingContent(streamingContentRef.current);
          } else {
            // Assistant is starting to stream - hide thinking bubble
            setIsThinking(false);
            const newAssistantMessageId = generateId();
            currentAssistantMessageIdRef.current = newAssistantMessageId;
            streamingContentRef.current = sanitizedChar;
            setStreamingContent(sanitizedChar);
          }
        },
        onSystemEvent: (event: SystemEvent) => {
          // Handle different types of system events with proper typing
          switch (event.type) {
            case SystemEventType.CHAT_COMPLETED:
              handleChatFinished();
              break;
            case SystemEventType.CHAT_ERROR:
              if (event.data?.error) {
                handleChatError(event.data.error);
              }
              break;
            case SystemEventType.CONNECTION_LOST:
              // Handle connection lost if needed
              break;
            case SystemEventType.CONNECTION_RESTORED:
              // Handle connection restored if needed
              break;
            default:
              // Handle unknown events
              break;
          }
        },
        onReasoningUpdate: (
          isThinking: boolean,
          content: string,
          toolCallRequest?: ToolCallRequest
        ) => {
          const { callId } = toolCallRequest || {};
          setIsHandlingTool(isThinking);
          setReasoningContent(content);

          // If no callId provided, use legacy behavior
          if (!callId) {
            return;
          }

          // Check if this is a reasoning event using proper detection
          const isReasoningThinking =
            ReasoningDetector.isThinkingMessage(content) &&
            !content.includes("for") &&
            !content.includes("seconds");
          const isReasoningCompleted =
            ReasoningDetector.isThinkingMessage(content) &&
            content.includes("for") &&
            content.includes("seconds");

          // Check if this is a tools-started event (processing)
          const isToolStarted = ReasoningDetector.isHandlingMessage(content);
          // Check if this is a tool-completed event (completed)
          const isToolCompleted = ReasoningDetector.isCompletedMessage(content);
          // Check if this is an error event
          const isToolError = ReasoningDetector.isErrorMessage(content);

          // Handle reasoning events separately from tool events
          if (isReasoningThinking || isReasoningCompleted) {
            setReasoningMessagesByCallId((prevMap) => {
              const newMap = new Map(prevMap);
              const existingMessageId = newMap.get(callId);

              if (isReasoningThinking && !existingMessageId) {
                // Cut off any current streaming message before creating reasoning message
                finalizeCurrentStreamingMessage();

                // Create a new reasoning message on first thinking content
                const reasoningMessageId = generateId();
                newMap.set(callId, reasoningMessageId);

                const reasoningMessage: Message = {
                  id: reasoningMessageId,
                  role: "reasoning" as any,
                  content: content,
                  timestamp: new Date(),
                  isStreaming: true,
                };

                setMessages((prev) => [...prev, reasoningMessage]);
              } else if (isReasoningCompleted && existingMessageId) {
                // Update existing reasoning message to completed state
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === existingMessageId
                      ? {
                          ...msg,
                          content: content,
                          isStreaming: false, // Mark as completed
                        }
                      : msg
                  )
                );

                // Remove from tracking map since it's completed
                newMap.delete(callId);
              } else if (existingMessageId && isReasoningThinking) {
                // Update existing reasoning message content (during thinking)
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === existingMessageId
                      ? {
                          ...msg,
                          content: content,
                          isStreaming: true,
                        }
                      : msg
                  )
                );
              }

              return newMap;
            });
          }

          // Create tooling messages instead of reasoning messages for tool handling
          setToolingMessagesByCallId((prevMap) => {
            const newMap = new Map(prevMap);
            const existingMessageId = newMap.get(callId);

            if (isToolStarted && !existingMessageId) {
              // Cut off any current streaming message before creating tooling message
              finalizeCurrentStreamingMessage();

              // Extract tool name from content
              const toolNameMatch = content.match(
                REASONING_CONSTANTS.PATTERNS.HANDLING_TOOL
              );
              const toolName = toolNameMatch
                ? toolNameMatch[1]
                : "Unknown Tool";

              // Create a new tooling message when tools start
              const toolingMessageId = generateId();
              newMap.set(callId, toolingMessageId);

              const toolingMessage: Message = {
                id: toolingMessageId,
                role: "tooling" as any,
                content: content,
                timestamp: new Date(),
                isStreaming: true,
                toolData: {
                  ...toolCallRequest,
                  toolName,
                  callId,
                  status: "processing",
                },
              };

              setMessages((prev) => [...prev, toolingMessage]);
            } else if ((isToolCompleted || isToolError) && existingMessageId) {
              // Extract tool name from content
              const toolNameMatch = content.match(
                REASONING_CONSTANTS.PATTERNS.COMPLETED_OR_ERROR_TOOL
              );
              const toolName = toolNameMatch
                ? toolNameMatch[1]
                : "Unknown Tool";

              // Update existing tooling message to completed state
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === existingMessageId
                    ? {
                        ...msg,
                        content: content,
                        isStreaming: false, // Mark as completed
                        toolData: {
                          ...msg.toolData,
                          toolName,
                          status: isToolError ? "error" : "completed",
                          callId: callId ?? "",
                        },
                      }
                    : msg
                )
              );

              // Remove from tracking map since it's completed
              newMap.delete(callId);
            } else if (
              existingMessageId &&
              isHandlingTool &&
              !isToolCompleted &&
              !isToolError
            ) {
              // Update existing tooling message content (during processing only)
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === existingMessageId
                    ? {
                        ...msg,
                        content: content,
                        isStreaming: true,
                      }
                    : msg
                )
              );
            }

            return newMap;
          });
        },
      });

      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting WebSocketChatClient:", error);
      setIsConnected(false);
    }
  }, [
    apiUrl,
    clientTools,
    tools,
    config,
    generateId,
    addMessage,
    handleChatFinished,
    handleChatError,
    finalizeCurrentStreamingMessage,
  ]);

  const disconnectAgentClient = useCallback(() => {
    if (agentClientRef.current) {
      agentClientRef.current.disconnect();
      agentClientRef.current = null;
    }
    setAgentClient(null);
    setIsConnected(false);
  }, []);

  const resetToolHandling = useCallback(() => {
    setIsHandlingTool(false);
    shouldUpdateMessageRef.current = true; // Reset to allow message updates
  }, []);

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

  // WebSocketChatClient connection management
  useEffect(() => {
    // Auto-connect on component mount
    connectAgentClient();

    // Cleanup on unmount
    return () => {
      disconnectAgentClient();
      // Cancel any pending scroll animation
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }
    };
  }, [connectAgentClient, disconnectAgentClient]);

  // Monitor connection status
  useEffect(() => {
    const interval = setInterval(() => {
      if (agentClientRef.current) {
        const status = agentClientRef.current.getConnectionStatus();
        setIsConnected(status.connected);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load conversation history from API if userId is provided
  useEffect(() => {
    const loadConversation = async () => {
      // Skip if no userId provided
      if (!userId) {
        return;
      }

      // Skip if already loaded once
      if (hasLoadedConversationRef.current) {
        return;
      }

      // Skip if already loading
      if (isLoadingConversation) {
        return;
      }

      // Skip if messages already exist (either from props or already loaded)
      if (messages.length > 0) {
        return;
      }

      try {
        setIsLoadingConversation(true);
        setConversationError(null);

        // Step 1: Fetch user's threads
        // const threads = await fetchUserThreads(httpApiUrl, userId, {
        //   limit: 1, // Get only the first/most recent thread
        // });
        const threads: string | any[] = [];

        if (threads.length === 0) {
          setIsLoadingConversation(false);
          hasLoadedConversationRef.current = true;
          return;
        }

        // Step 2: Use the first thread
        const firstThread = threads[0];
        setCurrentThreadId(firstThread.id);
        setCurrentConvUuid(firstThread.convUuid); // Store convUuid for sending with messages

        // Step 3: Fetch messages for this thread
        const loadedMessages = await fetchThreadMessages(
          httpApiUrl,
          firstThread.id
        );

        // Step 4: Set messages to state
        setMessages(loadedMessages);

        // Mark as loaded
        hasLoadedConversationRef.current = true;
      } catch (error) {
        console.error("❌ Error loading conversation:", error);
        setConversationError(
          error instanceof Error ? error.message : "Failed to load conversation"
        );
        hasLoadedConversationRef.current = true; // Don't retry automatically
      } finally {
        setIsLoadingConversation(false);
      }
    };

    loadConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, httpApiUrl]);

  // Handle message submission via WebSocketChatClient
  const handleSubmit = useCallback(
    async (message: string, media?: string[]) => {
      if (!message.trim() || isStreaming || !agentClient || !isConnected)
        return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
        media,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);
      setIsThinking(true); // Show thinking bubble while waiting for assistant response
      setChatStatus("submitted");
      setStreamingStatus("Starting...");

      try {
        await agentClient.onTriggerMessage({
          message: userMessage.content,
          app,
          media,
          convUuid: currentConvUuid || undefined,
          agentPromptPath: undefined,
        });
        setChatStatus("streaming");
      } catch (error) {
        console.error("Agent client send error:", error);
        setIsThinking(false); // Hide thinking bubble on send error
        setChatStatus("error");

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
        setChatStatus("idle");
        setStreamingStatus("");
      }
    },
    [
      isStreaming,
      agentClient,
      isConnected,
      generateId,
      addMessage,
      config,
      currentConvUuid,
    ]
  );

  // Stop generation
  const stopGeneration = useCallback(() => {
    setIsStreaming(false);
    setChatStatus("idle");
    setStreamingStatus("");
    setIsThinking(false);
    setReasoningContent("");

    // Clean up streaming state
    currentAssistantMessageIdRef.current = null;
    streamingContentRef.current = "";
    setStreamingContent("");

    resetToolHandling(); // Clear any ongoing tool handling
  }, [resetToolHandling]);

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: File[]): Promise<string[]> => {
      const newMedia: string[] = [];
      const serverUrl = apiUrl;
      const folder = "chat-uploads";

      for (const file of files) {
        try {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          // Upload the file to the server
          const response = await fetch(`${serverUrl}/upload`, {
            method: "POST",
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
    [apiUrl]
  );

  // Modal controls
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Collapse controls
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Mode switching controls
  const toggleFullscreen = useCallback(() => {
    setCurrentMode((prev) => (prev === "sidebar" ? "fullscreen" : "sidebar"));
  }, []);

  // Handle escape key for modal
  useEffect(() => {
    // Only run in browser environment
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

  // Build CSS classes without external library
  const buildClasses = (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(" ");
  };

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="chat-wrapper__bubble-icon"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
              fill="currentColor"
            />
            <circle cx="7" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="17" cy="10" r="1" fill="currentColor" />
          </svg>
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="currentColor"
            />
          </svg>
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isFullscreen ? (
              // Minimize icon (arrows pointing inward)
              <path
                d="M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              // Fullscreen icon (arrows pointing outward)
              <path
                d="M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 12l-3 3-3-3m-6 3l-3 3-3-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
              fill="currentColor"
            />
          </svg>
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
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  };

  // Render tool results panel (if enabled)
  const renderToolResults = () => {
    if (!config.features?.showToolResults || toolResults.length === 0)
      return null;

    return (
      <div className="chat-wrapper__tool-results">
        <h4>Tool Results</h4>
        <div className="chat-wrapper__tool-results-list">
          {toolResults.map((result) => (
            <div key={result.id} className="chat-wrapper__tool-result">
              <div className="chat-wrapper__tool-result-title">
                {result.title}
              </div>
              {result.description && (
                <div className="chat-wrapper__tool-result-description">
                  {result.description}
                </div>
              )}
              <div className="chat-wrapper__tool-result-meta">
                Status: {result.status || "completed"}
              </div>
            </div>
          ))}
        </div>
      </div>
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

        {/* {renderThinkingIndicator()} */}

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

              {renderToolResults()}

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
          apiUrl={apiUrl}
        />
      </div>
    </>
  );
}

const ChatWrapperMemo = memo(ChatWrapper);

export { ChatWrapperMemo as ChatWrapper };
