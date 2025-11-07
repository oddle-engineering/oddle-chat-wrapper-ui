import { StateCreator } from "zustand";

export interface LayoutSlice {
  // State
  isModalOpen: boolean;
  isCollapsed: boolean;
  currentMode: string;

  // Actions
  setIsModalOpen: (isOpen: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  setCurrentMode: (mode: string) => void;
  openModal: () => void;
  closeModal: () => void;
  toggleCollapse: () => void;
  toggleFullscreen: () => void;
}

export const createLayoutSlice: StateCreator<LayoutSlice> = (set) => ({
  // Initial state
  isModalOpen: false,
  isCollapsed: false,
  currentMode: "sidebar",

  // Actions
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  toggleFullscreen: () =>
    set((state) => ({
      currentMode: state.currentMode === "sidebar" ? "fullscreen" : "sidebar",
    })),
});
