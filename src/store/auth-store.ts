import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Role = 'admin' | 'doctor' | 'staff'

interface AuthState {
  token: string | null
  userId: string | null
  role: Role | null
  setAuth: (token: string, userId: string, role: Role) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      role: null,
      setAuth: (token, userId, role) => set({ token, userId, role }),
      clearAuth: () => set({ token: null, userId: null, role: null }),
    }),
    { name: 'auth-storage' }
  )
)
