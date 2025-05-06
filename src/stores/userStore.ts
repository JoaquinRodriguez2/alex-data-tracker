import { create } from 'zustand'
import { pocketbaseConection } from '../services/core/pocketbase'

interface User {
  id: string
  // Add other user properties you need
}

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  connectRealTime: () => void
  disconnectRealTime: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  connectRealTime: () => {
    pocketbaseConection.collection('users').subscribe('z0qukjwt101u62l', (e) => {
      set({ user: e.record })
    })
  },
  disconnectRealTime: () => {
    pocketbaseConection.collection('users').unsubscribe('z0qukjwt101u62l')
  }
}))