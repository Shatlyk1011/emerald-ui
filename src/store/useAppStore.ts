import { InspirationWebsite } from '@/payload-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface AppState {
  // Site preview dialog state
  selectedSite: InspirationWebsite | null
  isDialogOpen: boolean
  openSiteDialog: (site: InspirationWebsite) => void
  closeSiteDialog: () => void

  // Zoom toggle state (persisted to localStorage)
  isZoomEnabled: boolean
  toggleZoom: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Site preview dialog actions
      selectedSite: null,
      isDialogOpen: false,
      openSiteDialog: (site) => set({ selectedSite: site, isDialogOpen: true }),
      closeSiteDialog: () => set({ selectedSite: null, isDialogOpen: false }),

      // Zoom toggle actions
      isZoomEnabled: true,
      toggleZoom: () =>
        set((state) => ({ isZoomEnabled: !state.isZoomEnabled })),
    }),
    {
      name: 'app-storage', // localStorage key
      partialize: (state) => ({ isZoomEnabled: state.isZoomEnabled }), // Only persist zoom state
    }
  )
)
