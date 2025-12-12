import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createLayoutSlice, LayoutSlice } from "./slices/layoutSlice";
import { createChatSlice, ChatSlice } from "./slices/chatSlice";
import { createConversationSlice, ConversationSlice } from "./slices/conversationSlice";
import { createThreadSlice, ThreadSlice } from "./slices/threadSlice";
import { createMessagesSlice, MessagesSlice } from "./slices/messagesSlice";

// Combined store type
export type UIStore = LayoutSlice & ChatSlice & ConversationSlice & ThreadSlice & MessagesSlice;

// Create the store with all slices combined
export const useUIStore = create<UIStore>()(
  devtools(
    (...a) => ({
      ...createLayoutSlice(...a),
      ...createChatSlice(...a),
      ...createConversationSlice(...a),
      ...createThreadSlice(...a),
      ...createMessagesSlice(...a),
    }),
    {
      name: "ChatUI-Store",
    }
  )
);

// Selector hooks for better performance and easier usage
export const useLayoutState = () =>
  useUIStore((state) => ({
    isModalOpen: state.isModalOpen,
    isCollapsed: state.isCollapsed,
    currentMode: state.currentMode,
    openModal: state.openModal,
    closeModal: state.closeModal,
    toggleCollapse: state.toggleCollapse,
    toggleFullscreen: state.toggleFullscreen,
  }));

export const useChatState = () =>
  useUIStore((state) => ({
    chatStatus: state.chatStatus,
    streamingStatus: state.streamingStatus,
    setChatStatus: state.setChatStatus,
    setStreamingStatus: state.setStreamingStatus,
    resetChatStatus: state.resetChatStatus,
  }));

export const useConversationState = () =>
  useUIStore((state) => ({
    isLoadingConversation: state.isLoadingConversation,
    conversationError: state.conversationError,
    setIsLoadingConversation: state.setIsLoadingConversation,
    setConversationError: state.setConversationError,
    clearConversationError: state.clearConversationError,
  }));

export const useThreadState = () =>
  useUIStore((state) => ({
    currentThreadId: state.currentThreadId,
    providerResId: state.providerResId,
    setCurrentThreadId: state.setCurrentThreadId,
    setProviderResId: state.setProviderResId,
    clearThreadData: state.clearThreadData,
  }));


export const useMessagesState = () =>
  useUIStore((state) => ({
    isStreaming: state.isStreaming,
    isThinking: state.isThinking,
    streamingContent: state.streamingContent,
    isHandlingTool: state.isHandlingTool,
    currentAssistantMessageId: state.currentAssistantMessageId,
    setIsStreaming: state.setIsStreaming,
    setIsThinking: state.setIsThinking,
    setStreamingContent: state.setStreamingContent,
    setIsHandlingTool: state.setIsHandlingTool,
    setCurrentAssistantMessageId: state.setCurrentAssistantMessageId,
    startStreaming: state.startStreaming,
    stopStreaming: state.stopStreaming,
    clearStreamingBuffers: state.clearStreamingBuffers,
    resetToolHandling: state.resetToolHandling,
  }));
