import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { ChatWrapperProps, Message, StreamEvent, ToolResult } from "../types";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  ChatStatus,
} from "./PromptInput";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "./Reasoning";
import { Loader } from "./Loader";
import "../styles/chat-wrapper.css";

export function ChatWrapper({
  apiUrl,
  config,
  tools,
  initialMessages = [],
}: ChatWrapperProps) {
  // Core chat state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationUuid, setConversationUuid] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState(config.mode);

  // Advanced state for tool results and streaming
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [briefs, setBriefs] = useState<any[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
  const [streamingStatus, setStreamingStatus] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [reasoningContent, setReasoningContent] = useState("");

  // Refs for managing streaming
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Utility functions
  const generateId = useCallback(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Log available tools for debugging
  useEffect(() => {
    if (tools && Object.keys(tools).length > 0) {
      console.log("Available tools:", Object.keys(tools));
    }
  }, [tools]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle config callbacks
  useEffect(() => {
    if (config.onStreamingStatusChange) {
      config.onStreamingStatusChange(streamingStatus);
    }
  }, [streamingStatus, config]);

  // Helper to update the current assistant message
  const updateAssistantMessage = useCallback(
    (updateFn: (msg: Message) => Message) => {
      const currentId = currentAssistantMessageIdRef.current;
      if (currentId) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === currentId ? updateFn(msg) : msg))
        );
      }
    },
    []
  );

  // Process streaming events from the API
  const processStreamEvent = useCallback(
    (event: StreamEvent) => {
      console.log("Processing stream event:", event.type, event);

      switch (event.type) {
        case "event":
          if (event.event === "latitude-event") {
            if (event.data?.type === "chain-started") {
              setStreamingStatus("Planning chain started");
              setIsThinking(true);
              setReasoningContent(
                "🔗 Starting comprehensive planning chain..."
              );
            } else if (event.data?.type === "step-started") {
              setStreamingStatus("Planning step started");
              setIsThinking(true);
              setReasoningContent("📊 Executing planning step...");
            } else if (event.data?.type === "provider-completed") {
              setStreamingStatus("AI planning completed");
              setIsThinking(false);
              setReasoningContent("");

              if (event.data.response?.text) {
                updateAssistantMessage((msg) => ({
                  ...msg,
                  content: event.data.response.text,
                  isStreaming: false,
                }));
              }
            } else if (event.data?.type === "chain-completed") {
              setStreamingStatus("Planning completed");
              setIsThinking(false);
              setReasoningContent("");

              if (event.data.uuid) {
                setConversationUuid(event.data.uuid);
              }

              updateAssistantMessage((msg) => ({
                ...msg,
                isStreaming: false,
              }));
            }
          } else if (event.event === "provider-event") {
            if (event.data?.type === "text-delta") {
              setIsThinking(false);
              setReasoningContent("");
              updateAssistantMessage((msg) => ({
                ...msg,
                content: msg.content + event.data.textDelta,
              }));
            }
          }
          break;

        case "text-delta":
          if (event.content) {
            updateAssistantMessage((msg) => ({
              ...msg,
              content: msg.content + event.content,
            }));
          }
          break;

        case "tool-result":
          console.log("Tool result received:", event);

          // Handle different tool results
          if (event.tool && event.data) {
            // Add to tool results if it has the right structure
            if (event.data.id || event.data.success) {
              const toolResult: ToolResult = {
                id: event.data.id || generateId(),
                title: event.data.title || `${event.tool} result`,
                description: event.data.description,
                status: event.data.status || "completed",
                created_at: event.data.created_at || new Date().toISOString(),
                ...event.data,
              };

              setToolResults((prev) => [...prev, toolResult]);
            }
          }

          // Handle todos and briefs if provided
          if (event.todos) {
            setTodos(event.todos);
            // Call onToolResult callback if provided
            if (config.onToolResult) {
              config.onToolResult("todos", event.todos);
            }
          }

          if (event.briefs) {
            setBriefs(event.briefs);
            // Call onToolResult callback if provided
            if (config.onToolResult) {
              config.onToolResult("briefs", event.briefs);
            }
          }
          break;

        case "finished":
          setStreamingStatus("Stream finished");
          if (event.uuid) {
            setConversationUuid(event.uuid);
          }
          if (event.result?.response?.text) {
            updateAssistantMessage((msg) => ({
              ...msg,
              content: event.result.response.text,
              isStreaming: false,
            }));
          } else {
            updateAssistantMessage((msg) => ({
              ...msg,
              isStreaming: false,
            }));
          }
          break;

        case "stream-error":
          console.error("Stream error:", event.error);
          updateAssistantMessage((msg) => ({
            ...msg,
            content: `Stream Error: ${event.error}`,
            isStreaming: false,
          }));
          break;

        case "error":
          console.error("API error:", event.error);
          updateAssistantMessage((msg) => ({
            ...msg,
            content: `Error: ${event.error}`,
            isStreaming: false,
          }));
          break;
      }
    },
    [updateAssistantMessage, generateId, config]
  );

  // Handle message submission
  const handleSubmit = useCallback(
    async (message: string, media?: string[]) => {
      if (!message.trim() || isStreaming) return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
        media,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);
      setChatStatus("submitted");
      setStreamingStatus("Starting...");

      // Create assistant message placeholder
      const assistantMessageId = generateId();
      currentAssistantMessageIdRef.current = assistantMessageId;
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      try {
        // Create abort controller for this request
        abortControllerRef.current = new AbortController();

        const endpoint =
          config.endpoint === "brief-planner"
            ? `${apiUrl}/api/brief-planner`
            : conversationUuid
            ? `${apiUrl}/api/conversation/${conversationUuid}`
            : `${apiUrl}/api/conversation/init`;

        const requestBody =
          config.endpoint === "brief-planner"
            ? {
                messages: [...messages, userMessage],
                promptPath: config.promptPath || "briefPlanner",
                conversationUuid,
                todos, // Send current todos to the API
                briefs, // Send current briefs to the API
                media: media || [], // Use media from function parameter, not uploadedMedia
              }
            : {
                message: message.trim(),
                tools: tools ? Object.keys(tools) : [],
              };

        console.log("Sending request to:", endpoint);
        console.log("Request payload:", JSON.stringify(requestBody, null, 2));

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          },
          body: JSON.stringify(requestBody),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Always process as streaming response since your API returns SSE
        setChatStatus("streaming");
        await processStreamingResponse(response);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error("Request error:", error);
          setChatStatus("error");
          updateAssistantMessage((msg) => ({
            ...msg,
            content: `Sorry, there was an error: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
            isStreaming: false,
          }));

          if (config.onError) {
            config.onError(
              error instanceof Error ? error : new Error("Unknown error")
            );
          }
        }
      } finally {
        setIsStreaming(false);
        setChatStatus("idle");
        setStreamingStatus("");
        setIsThinking(false);
        setReasoningContent("");
        abortControllerRef.current = null;
        currentAssistantMessageIdRef.current = null;
      }
    },
    [
      isStreaming,
      generateId,
      messages,
      conversationUuid,
      todos,
      briefs,
      uploadedMedia,
      tools,
      config,
      apiUrl,
      updateAssistantMessage,
      processStreamEvent,
    ]
  );

  // Process streaming response from the API
  const processStreamingResponse = useCallback(
    async (response: Response) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body reader available");
      }

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("Stream completed");
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonData = line.slice(6).trim();

            if (jsonData === "[DONE]" || jsonData === "") {
              continue;
            }

            try {
              const event: StreamEvent = JSON.parse(jsonData);
              processStreamEvent(event);
            } catch (parseError) {
              console.error("Failed to parse event:", parseError);
            }
          }
        }
      }
    },
    [processStreamEvent]
  );

  // Stop generation
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setChatStatus("idle");
      setStreamingStatus("");
      setIsThinking(false);
      setReasoningContent("");
    }
  }, []);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages(initialMessages);
    setConversationUuid(null);
    setToolResults([]);
    setTodos([]);
    setBriefs([]);
    setUploadedMedia([]);
    setChatStatus("idle");
    setStreamingStatus("");
    setIsThinking(false);
    setReasoningContent("");
    console.log("Chat cleared");
  }, [initialMessages]);

  // Modal controls
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Collapse controls
  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  // Mode switching controls
  const toggleFullscreen = useCallback(() => {
    setCurrentMode(prev => prev === "sidebar" ? "fullscreen" : "sidebar");
  }, []);

  // Handle escape key for modal
  useEffect(() => {
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
    isCollapsed && "chat-wrapper--collapsed"
  );

  // Render modal overlay if needed
  const renderModalOverlay = () => {
    if (currentMode === "modal" && isModalOpen) {
      return <div className="chat-wrapper-overlay" onClick={closeModal} />;
    }
    return null;
  };

  // Render bubble button for modal, sidebar (collapsed), and fullscreen (collapsed) modes
  const renderBubbleButton = () => {
    const shouldShowBubble = 
      (currentMode === "modal" && !isModalOpen) ||
      (currentMode === "sidebar" && isCollapsed) ||
      (currentMode === "fullscreen" && isCollapsed);

    if (shouldShowBubble) {
      const handleClick = currentMode === "modal" ? openModal : toggleCollapse;
      const title = currentMode === "modal" 
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

  // Render fullscreen toggle button for sidebar mode
  const renderFullscreenButton = () => {
    if (currentMode === "sidebar" && !isCollapsed) {
      return (
        <button
          className="chat-wrapper__fullscreen-button"
          onClick={toggleFullscreen}
          title={currentMode === "sidebar" ? "Switch to fullscreen" : "Switch to sidebar"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2"
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

  // Render collapse button for sidebar and fullscreen modes (only when expanded)
  const renderCollapseButton = () => {
    const shouldShow = (currentMode === "sidebar" || currentMode === "fullscreen") && !isCollapsed;
    
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

  if ((currentMode === "sidebar" || currentMode === "fullscreen") && isCollapsed) {
    return renderBubbleButton();
  }

  return (
    <>
      {renderModalOverlay()}
      <div className={containerClasses} style={config.customStyles}>
        <div className="chat-wrapper__header">
          <h2 className="chat-wrapper__title">{config.appName}</h2>
          <div className="chat-wrapper__header-controls">
            {renderFullscreenButton()}
            {renderCollapseButton()}
            {renderCloseButton()}
          </div>
        </div>

        {/* {renderThinkingIndicator()} */}

        {!isCollapsed && (
          <>
          <div className="chat-wrapper__messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-wrapper__message chat-wrapper__message--${message.role}`}
            >
              <div className="chat-wrapper__message-content">
                {/* Assistant message with reasoning */}
                {message.role === "assistant" &&
                message.isStreaming &&
                isThinking ? (
                  <div className="chat-wrapper__message-with-reasoning">
                    <Reasoning isStreaming={isThinking}>
                      <ReasoningTrigger title="Thinking..." />
                      <ReasoningContent>{reasoningContent}</ReasoningContent>
                    </Reasoning>
                    {message.content && (
                      <div className="chat-wrapper__markdown-content">
                        <ReactMarkdown
                          components={{
                            pre: ({ children }) => (
                              <pre className="chat-wrapper__code-block">
                                {children}
                              </pre>
                            ),
                            code: ({ children, className }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="chat-wrapper__inline-code">
                                  {children}
                                </code>
                              ) : (
                                <code className="chat-wrapper__code">
                                  {children}
                                </code>
                              );
                            },
                            p: ({ children }) => (
                              <p className="chat-wrapper__paragraph">
                                {children}
                              </p>
                            ),
                            h1: ({ children }) => (
                              <h1 className="chat-wrapper__heading-1">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="chat-wrapper__heading-2">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="chat-wrapper__heading-3">
                                {children}
                              </h3>
                            ),
                            ul: ({ children }) => (
                              <ul className="chat-wrapper__list">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="chat-wrapper__ordered-list">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="chat-wrapper__list-item">
                                {children}
                              </li>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="chat-wrapper__blockquote">
                                {children}
                              </blockquote>
                            ),
                            strong: ({ children }) => (
                              <strong className="chat-wrapper__bold">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="chat-wrapper__italic">
                                {children}
                              </em>
                            ),
                          }}
                        >
                          {message.content.trim()}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                ) : message.isStreaming &&
                  message.content === "" &&
                  !isThinking ? (
                  /* Show streaming indicator when no reasoning */
                  <div className="chat-wrapper__streaming-placeholder">
                    <Loader size={16} variant="dots" />
                    <span>{`Thinking`}</span>
                    {/* {streamingStatus && (
                      <span className="chat-wrapper__streaming-status">
                        ({streamingStatus})
                      </span>
                    )} */}
                  </div>
                ) : (
                  /* Regular message display with markdown */
                  <div className="chat-wrapper__regular-message">
                    {/* Display attached images for user messages */}
                    {message.role === "user" &&
                      message.media &&
                      message.media.length > 0 && (
                        <div className="chat-wrapper__media-grid">
                          {message.media.map((imageData, index) => (
                            <div
                              key={index}
                              className="chat-wrapper__media-item"
                            >
                              <img
                                src={imageData}
                                alt={`Attached image ${index + 1}`}
                                className="chat-wrapper__media-image"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                    <div className="chat-wrapper__markdown-content">
                      <ReactMarkdown
                        components={{
                          pre: ({ children }) => (
                            <pre className="chat-wrapper__code-block">
                              {children}
                            </pre>
                          ),
                          code: ({ children, className }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="chat-wrapper__inline-code">
                                {children}
                              </code>
                            ) : (
                              <code className="chat-wrapper__code">
                                {children}
                              </code>
                            );
                          },
                          p: ({ children }) => (
                            <p className="chat-wrapper__paragraph">
                              {children}
                            </p>
                          ),
                          h1: ({ children }) => (
                            <h1 className="chat-wrapper__heading-1">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="chat-wrapper__heading-2">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="chat-wrapper__heading-3">
                              {children}
                            </h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="chat-wrapper__list">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="chat-wrapper__ordered-list">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="chat-wrapper__list-item">
                              {children}
                            </li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="chat-wrapper__blockquote">
                              {children}
                            </blockquote>
                          ),
                          strong: ({ children }) => (
                            <strong className="chat-wrapper__bold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="chat-wrapper__italic">{children}</em>
                          ),
                        }}
                      >
                        {message.content.trim()}
                      </ReactMarkdown>
                      {message.isStreaming && (
                        <span className="chat-wrapper__streaming-indicator">
                          ...
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          </div>

          {renderToolResults()}

          <PromptInput
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const message = formData.get("message") as string;
            if (message?.trim()) {
              handleSubmit(message.trim());
              setInput("");
            }
          }}
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder || "What would you like to know?"}
            disabled={isStreaming}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              {messages.length > 0 && (
                <PromptInputButton
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  title="Clear chat"
                  disabled={isStreaming}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </PromptInputButton>
              )}
              {tools && Object.keys(tools).length > 0 && (
                <PromptInputButton
                  variant="ghost"
                  size="sm"
                  disabled={isStreaming}
                  title={`${Object.keys(tools).length} tools available`}
                >
                  🛠️ Tools ({Object.keys(tools).length})
                </PromptInputButton>
              )}
            </PromptInputTools>
            <PromptInputSubmit
              status={chatStatus}
              disabled={!input.trim() && chatStatus !== "streaming"}
              onClick={chatStatus === "streaming" ? stopGeneration : undefined}
              title={
                chatStatus === "streaming"
                  ? "Stop generation"
                  : chatStatus === "submitted"
                  ? "Submitting..."
                  : "Send message"
              }
            />
          </PromptInputToolbar>
        </PromptInput>
          </>
        )}

        {config.onError && <div className="chat-wrapper__error-boundary" />}
      </div>
    </>
  );
}
