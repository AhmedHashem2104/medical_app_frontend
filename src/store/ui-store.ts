import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

function resolveIsDark(theme: Theme): boolean {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle('dark', resolveIsDark(theme))
}

interface UiState {
  sidebarOpen: boolean
  theme: Theme
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      theme: 'system' as Theme,

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      setTheme: (theme) => {
        applyThemeClass(theme)
        set({ theme })
      },

      toggleTheme: () => {
        const next: Theme = resolveIsDark(get().theme) ? 'light' : 'dark'
        applyThemeClass(next)
        set({ theme: next })
      },
    }),
    {
      name: 'ui-storage',
      // Re-apply theme class after state is rehydrated from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeClass(state.theme)
      },
    }
  )
)
