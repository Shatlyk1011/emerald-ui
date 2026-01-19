import { InspirationWebsite } from '@/payload-types'
import { create } from 'zustand'

interface AppState {
  generatedFiles: Record<string, string> | null
  setGeneratedFiles: (files: Record<string, string>) => void

  // Site preview dialog state
  selectedSite: InspirationWebsite | null
  isDialogOpen: boolean
  openSiteDialog: (site: InspirationWebsite) => void
  closeSiteDialog: () => void
}

export const useAppStore = create<AppState>((set) => ({
  generatedFiles: null,
  setGeneratedFiles: (files) => set({ generatedFiles: files }),

  // Site preview dialog actions
  selectedSite: null,
  isDialogOpen: false,
  openSiteDialog: (site) => set({ selectedSite: site, isDialogOpen: true }),
  closeSiteDialog: () => set({ selectedSite: null, isDialogOpen: false }),
}))
