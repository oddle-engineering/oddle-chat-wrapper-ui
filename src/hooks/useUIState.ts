import { useEffect } from "react";
import { useUIStore } from "../store";

interface UseUIStateProps {
  initialMode?: string;
}

/**
 * Legacy hook for backward compatibility - now uses Zustand store
 * @deprecated Use direct Zustand store hooks instead (useLayoutState, useChatState, etc.)
 */
export function useUIState({ initialMode = "sidebar" }: UseUIStateProps) {
  // Get all state and actions from Zustand store
  const store = useUIStore();

  // Set initial mode if provided
  useEffect(() => {
    if (initialMode && store.currentMode !== initialMode) {
      store.setCurrentMode(initialMode);
    }
  }, [initialMode]); // Only run on mount

  // Handle escape key for modal
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && store.currentMode === "modal" && store.isModalOpen) {
        store.closeModal();
      }
    };

    if (store.currentMode === "modal" && store.isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [store.currentMode, store.isModalOpen, store.closeModal]);

  // Return the entire store for backward compatibility
  return {
    // Modal and layout state
    isModalOpen: store.isModalOpen,
    setIsModalOpen: store.setIsModalOpen,
    isCollapsed: store.isCollapsed,
    setIsCollapsed: store.setIsCollapsed,
    currentMode: store.currentMode,
    setCurrentMode: store.setCurrentMode,

    // Chat state
    chatStatus: store.chatStatus,
    setChatStatus: store.setChatStatus,
    streamingStatus: store.streamingStatus,
    setStreamingStatus: store.setStreamingStatus,

    // Conversation state
    isLoadingConversation: store.isLoadingConversation,
    setIsLoadingConversation: store.setIsLoadingConversation,
    conversationError: store.conversationError,
    setConversationError: store.setConversationError,

    // Thread state
    currentThreadId: store.currentThreadId,
    setCurrentThreadId: store.setCurrentThreadId,
    providerResId: store.providerResId,
    setProviderResId: store.setProviderResId,


    // Actions
    openModal: store.openModal,
    closeModal: store.closeModal,
    toggleCollapse: store.toggleCollapse,
    toggleFullscreen: store.toggleFullscreen,
  };
}