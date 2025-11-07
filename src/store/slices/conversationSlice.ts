import { StateCreator } from "zustand";

export interface ConversationSlice {
  // State
  isLoadingConversation: boolean;
  conversationError: string | null;

  // Actions
  setIsLoadingConversation: (isLoading: boolean) => void;
  setConversationError: (error: string | null) => void;
  clearConversationError: () => void;
}

export const createConversationSlice: StateCreator<ConversationSlice> = (set) => ({
  // Initial state
  isLoadingConversation: false,
  conversationError: null,

  // Actions
  setIsLoadingConversation: (isLoading) => set({ isLoadingConversation: isLoading }),
  setConversationError: (error) => set({ conversationError: error }),
  clearConversationError: () => set({ conversationError: null }),
});
