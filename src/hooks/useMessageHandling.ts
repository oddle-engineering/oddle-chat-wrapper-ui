import { useState, useRef, useCallback, useMemo } from "react";
import { Message, ToolCallRequest } from "../types";
import { sanitizeMessage } from "../utils/security";
import {
  ReasoningDetector,
  REASONING_CONSTANTS,
} from "../client/constants/reasoning";
import { ProcessingStatus, PROCESSING_STATUS } from "../constants/chatStatus";

interface UseMessageHandlingProps {
  initialMessages?: Message[];
}

export function useMessageHandling({ initialMessages = [] }: UseMessageHandlingProps) {
  // Core message state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isHandlingTool, setIsHandlingTool] = useState(false);

  // Tracking maps for different message types
  const [, setToolingMessagesByCallId] = useState<Map<string, string>>(
    new Map()
  );
  const [, setReasoningMessagesByCallId] = useState<Map<string, string>>(
    new Map()
  );

  // Refs for managing streaming
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const streamingContentRef = useRef<string>("");

  // Utility functions
  const generateId = useCallback(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  );

  // Memoized helper functions for reasoning detection
  const getReasoningStatus = useMemo(
    () =>
      (content: string, isStreaming?: boolean): ProcessingStatus => {
        if (isStreaming === false) {
          if (ReasoningDetector.isErrorMessage(content)) return PROCESSING_STATUS.ERROR;
          return PROCESSING_STATUS.COMPLETED;
        }
        if (ReasoningDetector.isCompletedMessage(content)) return PROCESSING_STATUS.COMPLETED;
        if (ReasoningDetector.isErrorMessage(content)) return PROCESSING_STATUS.ERROR;
        return PROCESSING_STATUS.PROCESSING;
      },
    []
  );

  const getReasoningDuration = useMemo(
    () => (content: string): string | undefined => {
      return ReasoningDetector.extractDuration(content);
    },
    []
  );

  const getReasoningContentOnly = useMemo(
    () => (content: string): string => {
      return ReasoningDetector.cleanReasoningContent(content);
    },
    []
  );

  const getReasoningTitle = useMemo(
    () => (content: string, isStreaming?: boolean): string => {
      const messageType = ReasoningDetector.getMessageType(content, isStreaming);

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
    () => (content: string, isStreaming?: boolean): string => {
      if (isStreaming === false) {
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER)) return "Tool Error";
        return "Tool Completed";
      }
      if (
        content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
        content.includes("✅")
      )
        return "Tool Completed";
      if (content.includes(REASONING_CONSTANTS.ERROR_MARKER)) return "Tool Error";
      if (content.includes(REASONING_CONSTANTS.HANDLING_MARKER))
        return "Tool Processing...";
      return "Tool Processing...";
    },
    []
  );

  const getToolingStatus = useMemo(
    () =>
      (content: string, isStreaming?: boolean): ProcessingStatus => {
        if (isStreaming === false) {
          if (content.includes(REASONING_CONSTANTS.ERROR_MARKER)) return PROCESSING_STATUS.ERROR;
          return PROCESSING_STATUS.COMPLETED;
        }
        if (
          content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
          content.includes("✅")
        )
          return PROCESSING_STATUS.COMPLETED;
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER)) return PROCESSING_STATUS.ERROR;
        return PROCESSING_STATUS.PROCESSING;
      },
    []
  );

  // Helper function to add messages
  const addMessage = useCallback(
    (role: Message["role"], content: string) => {
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

  // Helper function to finalize streaming messages
  const finalizeCurrentStreamingMessage = useCallback(() => {
    if (currentAssistantMessageIdRef.current && streamingContentRef.current) {
      const sanitizedContent = sanitizeMessage(streamingContentRef.current, true);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === currentAssistantMessageIdRef.current
            ? {
                ...msg,
                content: sanitizedContent,
                isStreaming: false,
              }
            : msg
        )
      );

      currentAssistantMessageIdRef.current = null;
      streamingContentRef.current = "";
      setStreamingContent("");

      return true;
    }
    return false;
  }, []);

  // Handle streaming message updates
  const handleSetMessage = useCallback((char: string) => {
    const sanitizedChar = sanitizeMessage(char, true);

    if (currentAssistantMessageIdRef.current) {
      streamingContentRef.current += sanitizedChar;
      setStreamingContent(streamingContentRef.current);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === currentAssistantMessageIdRef.current
            ? {
                ...msg,
                content: streamingContentRef.current,
                isStreaming: true,
              }
            : msg
        )
      );
    } else {
      setIsThinking(false);
      const newAssistantMessageId = generateId();
      currentAssistantMessageIdRef.current = newAssistantMessageId;
      streamingContentRef.current = sanitizedChar;
      setStreamingContent(sanitizedChar);

      const streamingMessage: Message = {
        id: newAssistantMessageId,
        role: "assistant",
        content: sanitizedChar,
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, streamingMessage]);
    }
  }, [generateId]);

  // Handle reasoning updates
  const handleReasoningUpdate = useCallback(
    (isThinking: boolean, content: string, toolCallRequest?: ToolCallRequest) => {
      const { callId } = toolCallRequest || {};
      setIsHandlingTool(isThinking);

      if (!callId) return;

      const isReasoningThinking =
        ReasoningDetector.isThinkingMessage(content) &&
        !content.includes("for") &&
        !content.includes("seconds");
      const isReasoningCompleted =
        ReasoningDetector.isThinkingMessage(content) &&
        content.includes("for") &&
        content.includes("seconds");

      const isToolStarted = ReasoningDetector.isHandlingMessage(content);
      const isToolCompleted = ReasoningDetector.isCompletedMessage(content);
      const isToolError = ReasoningDetector.isErrorMessage(content);

      // Handle reasoning events
      if (isReasoningThinking || isReasoningCompleted) {
        setReasoningMessagesByCallId((prevMap) => {
          const newMap = new Map(prevMap);
          const existingMessageId = newMap.get(callId);

          if (isReasoningThinking && !existingMessageId) {
            finalizeCurrentStreamingMessage();

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
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === existingMessageId
                  ? {
                      ...msg,
                      content: content,
                      isStreaming: false,
                    }
                  : msg
              )
            );

            newMap.delete(callId);
          } else if (existingMessageId && isReasoningThinking) {
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

      // Handle tooling events
      setToolingMessagesByCallId((prevMap) => {
        const newMap = new Map(prevMap);
        const existingMessageId = newMap.get(callId);

        if (isToolStarted && !existingMessageId) {
          finalizeCurrentStreamingMessage();

          const toolNameMatch = content.match(
            REASONING_CONSTANTS.PATTERNS.HANDLING_TOOL
          );
          const toolName = toolNameMatch ? toolNameMatch[1] : "Unknown Tool";

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
              status: PROCESSING_STATUS.PROCESSING,
            },
          };

          setMessages((prev) => [...prev, toolingMessage]);
        } else if ((isToolCompleted || isToolError) && existingMessageId) {
          const toolNameMatch = content.match(
            REASONING_CONSTANTS.PATTERNS.COMPLETED_OR_ERROR_TOOL
          );
          const toolName = toolNameMatch ? toolNameMatch[1] : "Unknown Tool";

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === existingMessageId
                ? {
                    ...msg,
                    content: content,
                    isStreaming: false,
                    toolData: {
                      ...msg.toolData,
                      toolName,
                      status: isToolError ? PROCESSING_STATUS.ERROR : PROCESSING_STATUS.COMPLETED,
                      callId: callId ?? "",
                    },
                  }
                : msg
            )
          );

          newMap.delete(callId);
        } else if (
          existingMessageId &&
          isHandlingTool &&
          !isToolCompleted &&
          !isToolError
        ) {
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
    [finalizeCurrentStreamingMessage, generateId]
  );

  // Chat state management
  const handleChatFinished = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false);
    finalizeCurrentStreamingMessage();
  }, [finalizeCurrentStreamingMessage]);

  const handleChatError = useCallback(
    (error: string) => {
      console.error("Chat error:", error);
      setIsStreaming(false);
      setIsThinking(false);
      finalizeCurrentStreamingMessage();
      addMessage("system", `❌ Chat error: ${error}`);
    },
    [addMessage, finalizeCurrentStreamingMessage]
  );

  const resetToolHandling = useCallback(() => {
    setIsHandlingTool(false);
  }, []);

  const stopGeneration = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false);
    currentAssistantMessageIdRef.current = null;
    streamingContentRef.current = "";
    setStreamingContent("");
    resetToolHandling();
  }, [resetToolHandling]);

  return {
    // State
    messages,
    setMessages,
    isStreaming,
    setIsStreaming,
    isThinking,
    setIsThinking,
    streamingContent,
    isHandlingTool,
    currentAssistantMessageIdRef,

    // Helper functions
    getReasoningStatus,
    getReasoningDuration,
    getReasoningContentOnly,
    getReasoningTitle,
    getToolingTitle,
    getToolingStatus,

    // Actions
    addMessage,
    handleSetMessage,
    handleReasoningUpdate,
    handleChatFinished,
    handleChatError,
    stopGeneration,
    finalizeCurrentStreamingMessage,
  };
}