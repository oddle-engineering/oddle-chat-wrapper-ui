import { useCallback, useRef } from "react";
import { Message, ToolCallRequest } from "../../types";
import { sanitizeMessage } from "../../utils/security";
import {
  ReasoningDetector,
  REASONING_CONSTANTS,
} from "../../client/constants/reasoning";
import { PROCESSING_STATUS } from "../../constants/chatStatus";

interface MessageHandlersProps {
  // From useMessages
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (role: Message["role"], content: string) => void;
  updateMessageContent: (id: string, content: string, isStreaming?: boolean) => void;
  generateId: () => string;

  // From useStreamingState (now Zustand - simple setters, not React setState)
  setIsThinking: (value: boolean) => void;
  setIsStreaming: (value: boolean) => void;
  setStreamingContent: (value: string) => void;
  setIsHandlingTool: (value: boolean) => void;
  currentAssistantMessageIdRef: React.MutableRefObject<string | null>;
  streamingContentRef: React.MutableRefObject<string>;
  clearStreamingBuffers: () => void;
  resetToolHandling: () => void;
}

/**
 * Hook for coordinating message event handlers
 * 
 * Responsibilities:
 * - Handle streaming message updates
 * - Handle reasoning updates
 * - Finalize streaming messages
 * - Handle chat lifecycle events (finished, error)
 * - Stop generation
 */
export function useMessageHandlers({
  setMessages,
  addMessage,
  updateMessageContent,
  generateId,
  setIsThinking,
  setIsStreaming,
  setStreamingContent,
  setIsHandlingTool,
  currentAssistantMessageIdRef,
  streamingContentRef,
  clearStreamingBuffers,
  resetToolHandling,
}: MessageHandlersProps) {
  // Tracking maps for message IDs (using refs for mutable tracking structures)
  const reasoningMessagesByCallId = useRef<Map<string, string>>(new Map());
  const toolingMessagesByCallId = useRef<Map<string, string>>(new Map());

  // Finalize the current streaming message
  const finalizeCurrentStreamingMessage = useCallback(() => {
    if (currentAssistantMessageIdRef.current && streamingContentRef.current) {
      const sanitizedContent = sanitizeMessage(
        streamingContentRef.current,
        true
      );

      updateMessageContent(
        currentAssistantMessageIdRef.current,
        sanitizedContent,
        false
      );

      clearStreamingBuffers();
      return true;
    }
    return false;
  }, [
    currentAssistantMessageIdRef,
    streamingContentRef,
    updateMessageContent,
    clearStreamingBuffers,
  ]);

  // Handle streaming message character by character
  const handleSetMessage = useCallback(
    (char: string) => {
      // Clear response timeout since we got a response
      if ((window as any).responseTimeoutId) {
        console.log("ChatWrapper: Response received, clearing timeout");
        clearTimeout((window as any).responseTimeoutId);
        (window as any).responseTimeoutId = null;
      }
      
      const sanitizedChar = sanitizeMessage(char, true);

      if (currentAssistantMessageIdRef.current) {
        // Update existing streaming message
        streamingContentRef.current += sanitizedChar;
        setStreamingContent(streamingContentRef.current);

        updateMessageContent(
          currentAssistantMessageIdRef.current,
          streamingContentRef.current,
          true
        );
      } else {
        // Create new streaming message
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
    },
    [
      currentAssistantMessageIdRef,
      streamingContentRef,
      setStreamingContent,
      updateMessageContent,
      setIsThinking,
      generateId,
      setMessages,
    ]
  );

  // Handle reasoning and tooling updates
  const handleReasoningUpdate = useCallback(
    (
      isThinking: boolean,
      content: string,
      toolCallRequest?: ToolCallRequest
    ) => {
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
        const existingMessageId = reasoningMessagesByCallId.current.get(callId);

        if (isReasoningThinking && !existingMessageId) {
          finalizeCurrentStreamingMessage();

          const reasoningMessageId = generateId();
          reasoningMessagesByCallId.current.set(callId, reasoningMessageId);

          const reasoningMessage: Message = {
            id: reasoningMessageId,
            role: "reasoning" as any,
            content: content,
            timestamp: new Date(),
            isStreaming: true,
          };

          setMessages((prev) => [...prev, reasoningMessage]);
        } else if (isReasoningCompleted && existingMessageId) {
          updateMessageContent(existingMessageId, content, false);
          reasoningMessagesByCallId.current.delete(callId);
        } else if (existingMessageId && isReasoningThinking) {
          updateMessageContent(existingMessageId, content, true);
        }
      }

      // Handle tooling events
      const existingToolMessageId = toolingMessagesByCallId.current.get(callId);

      if (isToolStarted && !existingToolMessageId) {
        finalizeCurrentStreamingMessage();

        const toolNameMatch = content.match(
          REASONING_CONSTANTS.PATTERNS.HANDLING_TOOL
        );
        const toolName = toolNameMatch ? toolNameMatch[1] : "Unknown Tool";

        const toolingMessageId = generateId();
        toolingMessagesByCallId.current.set(callId, toolingMessageId);

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
      } else if ((isToolCompleted || isToolError) && existingToolMessageId) {
        const toolNameMatch = content.match(
          REASONING_CONSTANTS.PATTERNS.COMPLETED_OR_ERROR_TOOL
        );
        const toolName = toolNameMatch ? toolNameMatch[1] : "Unknown Tool";

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === existingToolMessageId
              ? {
                  ...msg,
                  content: content,
                  isStreaming: false,
                  toolData: {
                    ...msg.toolData,
                    toolName,
                    status: isToolError
                      ? PROCESSING_STATUS.ERROR
                      : PROCESSING_STATUS.COMPLETED,
                    callId: callId ?? "",
                  },
                }
              : msg
          )
        );

        toolingMessagesByCallId.current.delete(callId);
      } else if (
        existingToolMessageId &&
        isThinking &&
        !isToolCompleted &&
        !isToolError
      ) {
        updateMessageContent(existingToolMessageId, content, true);
      }
    },
    [
      setIsHandlingTool,
      finalizeCurrentStreamingMessage,
      generateId,
      setMessages,
      updateMessageContent,
    ]
  );

  // Handle chat finished event
  const handleChatFinished = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false);
    finalizeCurrentStreamingMessage();
  }, [setIsStreaming, setIsThinking, finalizeCurrentStreamingMessage]);

  // Handle chat error event
  const handleChatError = useCallback(
    (error: string) => {
      console.error("Chat error:", error);
      setIsStreaming(false);
      setIsThinking(false);
      finalizeCurrentStreamingMessage();
      addMessage("system", `❌ Chat error: ${error}`);
    },
    [
      setIsStreaming,
      setIsThinking,
      finalizeCurrentStreamingMessage,
      addMessage,
    ]
  );

  // Stop generation immediately
  const stopGeneration = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false);
    clearStreamingBuffers();
    resetToolHandling();
  }, [
    setIsStreaming,
    setIsThinking,
    clearStreamingBuffers,
    resetToolHandling,
  ]);

  return {
    handleSetMessage,
    handleReasoningUpdate,
    handleChatFinished,
    handleChatError,
    stopGeneration,
    finalizeCurrentStreamingMessage,
  };
}
