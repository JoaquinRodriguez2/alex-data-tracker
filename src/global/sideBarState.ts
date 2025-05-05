import { create } from 'zustand'

// Define the type for the sidebar state
type SidebarState = {
  isOpen: boolean
  isVisible: boolean
  setIsOpen: (open: boolean) => void
  setIsVisible: (visible: boolean) => void
  toggleOpen: () => void
  toggleVisible: () => void
}

// Create the store with initial state and actions
export const useSidebarState = create<SidebarState>((set) => ({
  // Initial state
  isOpen: false,
  isVisible: true,
  
  // Actions
  setIsOpen: (open) => set({ isOpen: open }),
  setIsVisible: (visible) => set({ isVisible: visible }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleVisible: () => set((state) => ({ isVisible: !state.isVisible }))
}))
