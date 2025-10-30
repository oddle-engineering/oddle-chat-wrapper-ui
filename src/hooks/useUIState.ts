import { useState, useCallback, useEffect } from "react";
import { ChatStatus, CHAT_STATUS, StreamingStatus, STREAMING_STATUS } from "../constants/chatStatus";

interface UseUIStateProps {
  initialMode?: string;
}

export function useUIState({ initialMode = "sidebar" }: UseUIStateProps) {
  // Modal and layout state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState(initialMode);

  // Chat state
  const [chatStatus, setChatStatus] = useState<ChatStatus>(CHAT_STATUS.IDLE);
  const [streamingStatus, setStreamingStatus] = useState<StreamingStatus>(STREAMING_STATUS.IDLE);

  // Conversation loading state
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [conversationError, setConversationError] = useState<string | null>(null);

  // Thread state
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [currentConvUuid, setCurrentConvUuid] = useState<string | null>(null);

  // Dev mode state
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState(false);

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

  return {
    // Modal and layout state
    isModalOpen,
    setIsModalOpen,
    isCollapsed,
    setIsCollapsed,
    currentMode,
    setCurrentMode,

    // Chat state
    chatStatus,
    setChatStatus,
    streamingStatus,
    setStreamingStatus,

    // Conversation state
    isLoadingConversation,
    setIsLoadingConversation,
    conversationError,
    setConversationError,

    // Thread state
    currentThreadId,
    setCurrentThreadId,
    currentConvUuid,
    setCurrentConvUuid,

    // Dev mode state
    isDevSettingsOpen,
    setIsDevSettingsOpen,

    // Actions
    openModal,
    closeModal,
    toggleCollapse,
    toggleFullscreen,
  };
}