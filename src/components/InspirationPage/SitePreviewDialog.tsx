'use client'

import { useAppStore } from '@/store/useAppStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ExternalLink, Sparkles } from 'lucide-react'

export default function SitePreviewDialog() {
  const { selectedSite, isDialogOpen, closeSiteDialog } = useAppStore()

  if (!selectedSite) return null

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeSiteDialog()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{selectedSite.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Website Screenshot */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            {selectedSite.imgUrl ? (
              <img
                src={selectedSite.imgUrl}
                alt={selectedSite.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No preview available
              </div>
            )}
          </div>

          {/* Site Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-base leading-relaxed">{selectedSite.description}</p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
              {selectedSite.category && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Category
                  </h3>
                  <p className="text-base">{selectedSite.category}</p>
                </div>
              )}

              {selectedSite.mode && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Mode
                  </h3>
                  <p className="text-base capitalize">{selectedSite.mode}</p>
                </div>
              )}
            </div>

            {/* Styles */}
            {selectedSite.style && selectedSite.style.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Styles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSite.style.map((style, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {/* Regenerate Website Button */}
            <button
              className="flex-1 group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              onClick={() => {
                // TODO: Implement regenerate functionality
                console.log('Regenerate website:', selectedSite.title)
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Regenerate This Website
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Visit Website Button */}
            {selectedSite.pageUrl && (
              <a
                href={selectedSite.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Site
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
