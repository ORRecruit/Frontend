import create from "zustand";

interface ToggleState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useToggleStore;
