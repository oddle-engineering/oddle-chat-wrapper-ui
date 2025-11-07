import { StateCreator } from "zustand";

export interface ThreadSlice {
  // State
  currentThreadId: string | null;
  providerResId: string | null;

  // Actions
  setCurrentThreadId: (threadId: string | null) => void;
  setProviderResId: (providerResId: string | null) => void;
  clearThreadData: () => void;
}

export const createThreadSlice: StateCreator<ThreadSlice> = (set) => ({
  // Initial state
  currentThreadId: null,
  providerResId: null,

  // Actions
  setCurrentThreadId: (threadId) => set({ currentThreadId: threadId }),
  setProviderResId: (providerResId) => set({ providerResId }),
  clearThreadData: () =>
    set({
      currentThreadId: null,
      providerResId: null,
    }),
});
