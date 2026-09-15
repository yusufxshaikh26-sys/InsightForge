import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  language: string
  toggleTheme: () => void
  setLanguage: (lang: string) => void
}

export const useThemeStore = create<ThemeState>()(persist(
  (set) => ({
    isDark: true,
    language: 'en',
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    setLanguage: (lang: string) => set({ language: lang }),
  }),
  {
    name: 'insightforge-theme',
  }
))
