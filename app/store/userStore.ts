import { create } from 'zustand'
import { UserDataTypes } from '../types/userTypes'

interface UserStore {
  user: UserDataTypes | null
  setUser: (user: UserDataTypes) => void
  clearUser: () => void
  hydrateUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },

  clearUser: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },

  hydrateUser: () => {
    if (typeof window === 'undefined') return

    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    try {
      const user = JSON.parse(storedUser) as UserDataTypes
      set({ user })
    } catch {
      localStorage.removeItem('user')
    }
  },
}))
