import { StateCreator } from "zustand";

export interface DevSlice {
  // State
  isDevSettingsOpen: boolean;

  // Actions
  setIsDevSettingsOpen: (isOpen: boolean) => void;
  toggleDevSettings: () => void;
}

export const createDevSlice: StateCreator<DevSlice> = (set) => ({
  // Initial state
  isDevSettingsOpen: false,

  // Actions
  setIsDevSettingsOpen: (isOpen) => set({ isDevSettingsOpen: isOpen }),
  toggleDevSettings: () => set((state) => ({ isDevSettingsOpen: !state.isDevSettingsOpen })),
});
