'use client'

import { useAppStore } from '@/store/useAppStore'
import { ExternalLink, Sparkles } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function SitePreviewDialog() {
  const { selectedSite, isDialogOpen, closeSiteDialog } = useAppStore()

  if (!selectedSite) return null

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => !open && closeSiteDialog()}
    >
      <DialogContent className='max-h-[90vh] max-w-5xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {selectedSite.title}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Website Screenshot */}
          <div className='bg-muted relative aspect-video w-full overflow-hidden rounded-lg'>
            {selectedSite.imgUrl ? (
              <img
                src={selectedSite.imgUrl}
                alt={selectedSite.title}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='text-muted-foreground flex h-full items-center justify-center'>
                No preview available
              </div>
            )}
          </div>

          {/* Site Details */}
          <div className='space-y-4'>
            <div>
              <h3 className='text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase'>
                Description
              </h3>
              <p className='text-base leading-relaxed'>
                {selectedSite.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className='grid grid-cols-2 gap-4'>
              {selectedSite.category && (
                <div>
                  <h3 className='text-muted-foreground mb-1 text-sm font-semibold tracking-wide uppercase'>
                    Category
                  </h3>
                  <p className='text-base'>{selectedSite.category}</p>
                </div>
              )}

              {selectedSite.mode && (
                <div>
                  <h3 className='text-muted-foreground mb-1 text-sm font-semibold tracking-wide uppercase'>
                    Mode
                  </h3>
                  <p className='text-base capitalize'>{selectedSite.mode}</p>
                </div>
              )}
            </div>

            {/* Styles */}
            {selectedSite.style && selectedSite.style.length > 0 && (
              <div>
                <h3 className='text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase'>
                  Styles
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {selectedSite.style.map((style, index) => (
                    <span
                      key={index}
                      className='bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium'
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3 border-t pt-4'>
            {/* Regenerate Website Button */}
            <button
              className='group relative flex-1 transform overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
              onClick={() => {
                // TODO: Implement regenerate functionality
                console.log('Regenerate website:', selectedSite.title)
              }}
            >
              <span className='relative z-10 flex items-center justify-center gap-2'>
                <Sparkles className='h-5 w-5' />
                Regenerate This Website
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </button>

            {/* Visit Website Button */}
            {selectedSite.pageUrl && (
              <a
                href={selectedSite.pageUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200'
              >
                <ExternalLink className='h-5 w-5' />
                Visit Site
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
