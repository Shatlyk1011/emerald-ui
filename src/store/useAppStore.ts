import { create } from 'zustand'

interface AppState {
  generatedFiles: Record<string, string> | null
  setGeneratedFiles: (files: Record<string, string>) => void
}

export const useAppStore = create<AppState>((set) => ({
  generatedFiles: null,
  setGeneratedFiles: (files) => set({ generatedFiles: files }),
}))
