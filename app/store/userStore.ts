import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserDataTypes } from '../types/userTypes'

interface UserStore {
  user: UserDataTypes | null
  setUser: (user: UserDataTypes) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user', 
    }
  )
)
