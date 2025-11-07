import { StateCreator } from 'zustand';

/**
 * Messages Slice State
 * Manages streaming state and current assistant message tracking
 */
export interface MessagesSlice {
  // Streaming state
  isStreaming: boolean;
  isThinking: boolean;
  streamingContent: string;
  isHandlingTool: boolean;
  
  // Current assistant message ID (replaces ref)
  currentAssistantMessageId: string | null;
  
  // Actions
  setIsStreaming: (isStreaming: boolean) => void;
  setIsThinking: (isThinking: boolean) => void;
  setStreamingContent: (content: string) => void;
  setIsHandlingTool: (isHandling: boolean) => void;
  setCurrentAssistantMessageId: (id: string | null) => void;
  
  // Lifecycle actions (combine multiple state updates)
  startStreaming: (assistantMessageId: string) => void;
  stopStreaming: () => void;
  clearStreamingBuffers: () => void;
  resetToolHandling: () => void;
}

/**
 * Create Messages Slice
 * Handles streaming state and assistant message tracking
 */
export const createMessagesSlice: StateCreator<MessagesSlice> = (set) => ({
  // Initial state
  isStreaming: false,
  isThinking: false,
  streamingContent: '',
  isHandlingTool: false,
  currentAssistantMessageId: null,
  
  // Individual setters
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setIsThinking: (isThinking) => set({ isThinking }),
  setStreamingContent: (content) => set({ streamingContent: content }),
  setIsHandlingTool: (isHandling) => set({ isHandlingTool: isHandling }),
  setCurrentAssistantMessageId: (id) => set({ currentAssistantMessageId: id }),
  
  // Lifecycle actions
  startStreaming: (assistantMessageId) => set({
    isStreaming: true,
    isThinking: true,
    currentAssistantMessageId: assistantMessageId,
    streamingContent: '',
    isHandlingTool: false,
  }),
  
  stopStreaming: () => set({
    isStreaming: false,
    isThinking: false,
  }),
  
  clearStreamingBuffers: () => set({
    streamingContent: '',
    currentAssistantMessageId: null,
  }),
  
  resetToolHandling: () => set({
    isHandlingTool: false,
  }),
});
