'use client'

import { useAppStore } from '@/store/useAppStore'
import { ExternalLink, Sparkles } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function SitePreviewDialog() {
  const { selectedSite, isDialogOpen, closeSiteDialog } = useAppStore()

  if (!selectedSite) return null

  const hasScreenshot = !!selectedSite.imgUrl
  const hasAdditionalMedia =
    selectedSite.additionalMedia &&
    typeof selectedSite.additionalMedia === 'object' &&
    selectedSite.additionalMedia.mediaUrl

  const showTabs = hasScreenshot && hasAdditionalMedia

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeSiteDialog()
        }
      }}

    >
      <DialogContent className='max-h-[90vh] max-w-[90rem] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {selectedSite.title}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Media Gallery with Tabs */}
          <div className='space-y-4'>
            {showTabs ? (
              <Tabs defaultValue='screenshot' className='w-full' autoFocus={false}>
                <TabsList className='w-full justify-start bg-transparent'>
                  <TabsTrigger className='border-b border-transparent data-[state=active]:border-current data-[state=active]:rounded-none' value='screenshot'>Screenshot</TabsTrigger>
                  <TabsTrigger className='border-b border-transparent data-[state=active]:border-current data-[state=active]:rounded-none' value='media'>Media</TabsTrigger>
                </TabsList>
                <TabsContent value='screenshot'>
                  <div className='bg-muted relative aspect-4/3 w-full overflow-hidden rounded-lg'>
                    <img
                      src={selectedSite.imgUrl!}
                      alt={`${selectedSite.title} screenshot`}
                      className='h-full w-full object-cover'
                    />
                  </div>
                </TabsContent>
                <TabsContent value='media'>
                  {hasAdditionalMedia && typeof selectedSite.additionalMedia === 'object' && (
                    <div className='bg-muted relative aspect-4/3 w-full overflow-hidden rounded-lg'>
                      {selectedSite.additionalMedia?.type === 'video' ? (
                        <video
                          src={selectedSite.additionalMedia.mediaUrl!}
                          autoPlay
                          muted
                          playsInline
                          loop
                          className='h-full w-full object-cover'
                          aria-label={selectedSite.additionalMedia.altText || `${selectedSite.title} video`}
                        />
                      ) : (
                        <img
                          src={selectedSite.additionalMedia!.mediaUrl!}
                          alt={selectedSite.additionalMedia!.altText || `${selectedSite.title} additional media`}
                          className='h-full w-full object-cover'
                        />
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              // Single media view (no tabs)
              <>
                {hasScreenshot && (
                  <div className='bg-muted relative aspect-4/3 w-full overflow-hidden rounded-lg'>
                    <img
                        src={selectedSite.imgUrl!}
                        alt={`${selectedSite.title} screenshot`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  )}
                  {!hasScreenshot && hasAdditionalMedia && typeof selectedSite.additionalMedia === 'object' && (
                    <div className='bg-muted relative aspect-4/3 w-full overflow-hidden rounded-lg'>
                      {selectedSite.additionalMedia!.type === 'video' ? (
                        <video
                          src={selectedSite.additionalMedia!.mediaUrl!}
                          autoPlay
                          muted
                          playsInline
                          loop
                          className='h-full w-full object-cover'
                          aria-label={selectedSite.additionalMedia!.altText || `${selectedSite.title} video`}
                        />
                      ) : (
                        <img
                          src={selectedSite.additionalMedia!.mediaUrl!}
                          alt={selectedSite.additionalMedia!.altText || `${selectedSite.title} additional media`}
                          className='h-full w-full object-cover'
                        />
                      )}
                    </div>
                  )}
                </>
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
              className='group relative flex-1 transform overflow-hidden rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:opacity-90 hover:shadow-xl'
              onClick={() => {
                // TODO: Implement regenerate functionality
                console.log('Regenerate website:', selectedSite.title)
              }}
            >
              <span className='relative z-10 flex items-center justify-center gap-2'>
                <Sparkles className='h-5 w-5' />
                Regenerate This Website
              </span>
            </button>

            {/* Visit Website Button */}
            {selectedSite.pageUrl && (
              <a
                href={selectedSite.pageUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200'
              >
                <ExternalLink className='h-4 w-4' />
                Visit Site
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
