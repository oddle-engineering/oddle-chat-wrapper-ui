import { useRef, useCallback, useMemo } from "react";
import { useUIStore } from "../../store";

/**
 * Hook for managing streaming state
 * 
 * Responsibilities:
 * - Streaming flags (isStreaming, isThinking, isHandlingTool)
 * - Streaming content buffer
 * - Current assistant message tracking
 * - Streaming lifecycle methods
 * 
 * Now uses Zustand store for state management instead of local useState.
 * This allows:
 * - Selective subscriptions (components only re-render for values they use)
 * - Shared state across components
 * - DevTools debugging
 */
export function useStreamingState() {
  // Get state and actions from Zustand store
  const isStreaming = useUIStore((state) => state.isStreaming);
  const setIsStreaming = useUIStore((state) => state.setIsStreaming);
  const isThinking = useUIStore((state) => state.isThinking);
  const setIsThinking = useUIStore((state) => state.setIsThinking);
  const streamingContent = useUIStore((state) => state.streamingContent);
  const setStreamingContent = useUIStore((state) => state.setStreamingContent);
  const isHandlingTool = useUIStore((state) => state.isHandlingTool);
  const setIsHandlingTool = useUIStore((state) => state.setIsHandlingTool);
  
  // Get lifecycle actions from store
  const startStreamingAction = useUIStore((state) => state.startStreaming);
  const stopStreamingAction = useUIStore((state) => state.stopStreaming);
  const clearStreamingBuffersAction = useUIStore((state) => state.clearStreamingBuffers);
  const resetToolHandlingAction = useUIStore((state) => state.resetToolHandling);

  // Ref for streaming content buffer (used to avoid re-renders during rapid updates)
  const streamingContentRef = useRef<string>("");
  
  // Create stable ref-like object for currentAssistantMessageId for backward compatibility
  // Components expect a ref, so we provide one that reads from/writes to Zustand
  // Using useMemo to keep the same object reference across renders
  const currentAssistantMessageIdRef = useMemo(() => ({
    get current() {
      return useUIStore.getState().currentAssistantMessageId;
    },
    set current(value: string | null) {
      useUIStore.getState().setCurrentAssistantMessageId(value);
    }
  }), []); // Empty deps - create once and reuse

  // Start streaming with initial setup
  const startStreaming = useCallback((assistantMessageId?: string) => {
    if (assistantMessageId) {
      // Use store's combined action
      startStreamingAction(assistantMessageId);
    } else {
      // Manual setup if no ID provided
      setIsStreaming(true);
      setIsThinking(true);
      setStreamingContent("");
    }
    streamingContentRef.current = "";
  }, [startStreamingAction, setIsStreaming, setIsThinking, setStreamingContent]);

  // Stop streaming and clear state
  const stopStreaming = useCallback(() => {
    stopStreamingAction();
    streamingContentRef.current = "";
  }, [stopStreamingAction]);

  // Reset tool handling state
  const resetToolHandling = useCallback(() => {
    resetToolHandlingAction();
  }, [resetToolHandlingAction]);

  // Clear streaming buffers
  const clearStreamingBuffers = useCallback(() => {
    clearStreamingBuffersAction();
    streamingContentRef.current = "";
  }, [clearStreamingBuffersAction]);

  return {
    // State
    isStreaming,
    setIsStreaming,
    isThinking,
    setIsThinking,
    streamingContent,
    setStreamingContent,
    isHandlingTool,
    setIsHandlingTool,

    // Refs (backward compatible interface)
    currentAssistantMessageIdRef,
    streamingContentRef,

    // Actions
    startStreaming,
    stopStreaming,
    resetToolHandling,
    clearStreamingBuffers,
  };
}
