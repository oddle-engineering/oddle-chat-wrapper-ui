import { useState, useRef, useCallback } from "react";

/**
 * Hook for managing streaming state
 * 
 * Responsibilities:
 * - Streaming flags (isStreaming, isThinking, isHandlingTool)
 * - Streaming content buffer
 * - Current assistant message tracking
 * - Streaming lifecycle methods
 */
export function useStreamingState() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isHandlingTool, setIsHandlingTool] = useState(false);

  // Refs for managing streaming without causing re-renders
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const streamingContentRef = useRef<string>("");

  // Start streaming with initial setup
  const startStreaming = useCallback(() => {
    setIsStreaming(true);
    setIsThinking(true);
    streamingContentRef.current = "";
    setStreamingContent("");
  }, []);

  // Stop streaming and clear state
  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false);
    setStreamingContent("");
    currentAssistantMessageIdRef.current = null;
    streamingContentRef.current = "";
  }, []);

  // Reset tool handling state
  const resetToolHandling = useCallback(() => {
    setIsHandlingTool(false);
  }, []);

  // Clear streaming buffers
  const clearStreamingBuffers = useCallback(() => {
    currentAssistantMessageIdRef.current = null;
    streamingContentRef.current = "";
    setStreamingContent("");
  }, []);

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

    // Refs
    currentAssistantMessageIdRef,
    streamingContentRef,

    // Actions
    startStreaming,
    stopStreaming,
    resetToolHandling,
    clearStreamingBuffers,
  };
}
