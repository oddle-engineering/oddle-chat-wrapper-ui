import {
  useMessages,
  useStreamingState,
  useReasoningHelpers,
  useToolingHelpers,
  useMessageHandlers,
} from "./messages";

/**
 * Orchestrator hook that combines all message-related sub-hooks
 * 
 * This hook maintains backward compatibility with the original API
 * while internally using a modular architecture:
 * 
 * - useMessages: Core message CRUD operations
 * - useStreamingState: Streaming state management (now in Zustand store)
 * - useReasoningHelpers: Reasoning detection utilities
 * - useToolingHelpers: Tooling detection utilities
 * - useMessageHandlers: Event coordination
 */
export function useMessageHandling() {
  // Initialize sub-hooks
  const messageState = useMessages();
  const streamingState = useStreamingState();
  const reasoningHelpers = useReasoningHelpers();
  const toolingHelpers = useToolingHelpers();

  // Coordinate event handlers using outputs from other hooks
  const handlers = useMessageHandlers({
    // From useMessages
    setMessages: messageState.setMessages,
    addMessage: messageState.addMessage,
    updateMessageContent: messageState.updateMessageContent,
    generateId: messageState.generateId,

    // From useStreamingState
    setIsThinking: streamingState.setIsThinking,
    setIsStreaming: streamingState.setIsStreaming,
    setStreamingContent: streamingState.setStreamingContent,
    setIsHandlingTool: streamingState.setIsHandlingTool,
    currentAssistantMessageIdRef: streamingState.currentAssistantMessageIdRef,
    streamingContentRef: streamingState.streamingContentRef,
    clearStreamingBuffers: streamingState.clearStreamingBuffers,
    resetToolHandling: streamingState.resetToolHandling,
  });

  // Return combined API (maintains backward compatibility)
  return {
    // State from useMessages
    messages: messageState.messages,
    setMessages: messageState.setMessages,

    // State from useStreamingState
    isStreaming: streamingState.isStreaming,
    setIsStreaming: streamingState.setIsStreaming,
    isThinking: streamingState.isThinking,
    setIsThinking: streamingState.setIsThinking,
    streamingContent: streamingState.streamingContent,
    isHandlingTool: streamingState.isHandlingTool,
    currentAssistantMessageIdRef: streamingState.currentAssistantMessageIdRef,

    // Helper functions from useReasoningHelpers
    getReasoningStatus: reasoningHelpers.getReasoningStatus,
    getReasoningDuration: reasoningHelpers.getReasoningDuration,
    getReasoningContentOnly: reasoningHelpers.getReasoningContentOnly,
    getReasoningTitle: reasoningHelpers.getReasoningTitle,

    // Helper functions from useToolingHelpers
    getToolingTitle: toolingHelpers.getToolingTitle,
    getToolingStatus: toolingHelpers.getToolingStatus,

    // Actions from useMessages
    addMessage: messageState.addMessage,

    // Actions from useMessageHandlers
    handleSetMessage: handlers.handleSetMessage,
    handleReasoningUpdate: handlers.handleReasoningUpdate,
    handleChatFinished: handlers.handleChatFinished,
    handleChatError: handlers.handleChatError,
    stopGeneration: handlers.stopGeneration,
    finalizeCurrentStreamingMessage: handlers.finalizeCurrentStreamingMessage,
  };
}