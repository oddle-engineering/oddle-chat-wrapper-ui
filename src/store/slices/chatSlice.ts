import { StateCreator } from "zustand";
import { ChatStatus, CHAT_STATUS, StreamingStatus, STREAMING_STATUS } from "../../constants/chatStatus";

export interface ChatSlice {
  // State
  chatStatus: ChatStatus;
  streamingStatus: StreamingStatus;

  // Actions
  setChatStatus: (status: ChatStatus) => void;
  setStreamingStatus: (status: StreamingStatus) => void;
  resetChatStatus: () => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  // Initial state
  chatStatus: CHAT_STATUS.IDLE,
  streamingStatus: STREAMING_STATUS.IDLE,

  // Actions
  setChatStatus: (status) => set({ chatStatus: status }),
  setStreamingStatus: (status) => set({ streamingStatus: status }),
  resetChatStatus: () =>
    set({
      chatStatus: CHAT_STATUS.IDLE,
      streamingStatus: STREAMING_STATUS.IDLE,
    }),
});
