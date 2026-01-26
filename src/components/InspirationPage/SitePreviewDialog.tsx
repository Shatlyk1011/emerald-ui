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
import { Button } from '../ui/button'
import Lens from '../ui/lens'

interface SitePreviewDialogProps {
  onCategoryClick: (category: string) => void
}

export default function SitePreviewDialog({ onCategoryClick }: SitePreviewDialogProps) {
  const { selectedSite, isDialogOpen, closeSiteDialog, isZoomEnabled } = useAppStore()

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
      <DialogContent className='scrollbar-thin max-h-[90vh]  overflow-hidden p-0 max-lg:overflow-auto '>
        {/* Two-column layout */}
        <div className='grid h-full max-lg:grid-cols-1 grid-cols-[1fr_320px] '>
          {/* Left: Image Preview Area */}
          <div className='flex flex-col overflow-y-auto px-4 py-4 max-lg:py-6 ' style={{ background: selectedSite.gradientColor! }}>
            {/* Media Gallery with Tabs */}
            <div className='flex-1'>
              {showTabs ? (
                <Tabs defaultValue='screenshot' className='h-full w-full' autoFocus={false}>
                  <TabsList className='mb-4 w-full justify-start bg-transparent'>
                    <TabsTrigger
                      className='data-[state=active]:bg-background rounded-md px-4 py-2 transition-all'
                      value='screenshot'
                    >
                      Screenshot
                    </TabsTrigger>
                    <TabsTrigger
                      className='data-[state=active]:bg-background rounded-md px-4 py-2 transition-all'
                      value='media'
                    >
                      Media
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='screenshot' className='mt-0 h-[calc(100%-3rem)]'>
                    <div className='bg-background relative h-full w-full overflow-hidden rounded-md border shadow-lg flex items-center'>
                      <Lens disableZoom={!isZoomEnabled} background={selectedSite.gradientColor!}>
                        <img
                          src={selectedSite.imgUrl!}
                          alt={`${selectedSite.title} screenshot`}
                          className='h-full w-full object-contain aspect-4/3'
                        />
                      </Lens>
                    </div>
                  </TabsContent>
                  <TabsContent value='media' className='mt-0 h-[calc(100%-3rem)]'>
                    {hasAdditionalMedia && typeof selectedSite.additionalMedia === 'object' && (
                      <div className='bg-background relative h-full w-full overflow-hidden rounded-xm border shadow-lg'>
                        {selectedSite.additionalMedia?.type === 'video' ? (
                          <video
                            src={selectedSite.additionalMedia.mediaUrl!}
                            className='h-full w-full object-contain aspect-4/3'
                            autoPlay
                            muted
                            playsInline
                            loop
                            aria-label={selectedSite.additionalMedia.altText || `${selectedSite.title} video`}
                          />
                        ) : (
                            <Lens disableZoom={!isZoomEnabled} background={selectedSite.gradientColor!}>
                              <img
                                src={selectedSite.additionalMedia!.mediaUrl!}
                                alt={selectedSite.additionalMedia!.altText || `${selectedSite.title} additional media`}
                                className='h-full w-full object-contain aspect-4/3'
                              />
                            </Lens>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                // Single media view (no tabs)
                  <div className='h-full'>
                    <div className='bg-background relative h-full overflow-hidden rounded-md border shadow-lg'>
                      <Lens disableZoom={!isZoomEnabled} background={selectedSite.gradientColor!}>
                        <img
                          src={selectedSite.imgUrl!}
                          alt={`${selectedSite.title} screenshot`}
                          className='h-full w-full object-contain'
                        />
                      </Lens>
                    </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sidebar with Details */}
          <div className='border-l  bg-background flex flex-col overflow-y-auto'>
            {/* Content Section */}
            <div className='flex-1 space-y-6 p-6 min-h-100 max-lg:min-h-auto'>
              <DialogHeader className='mb-6'>
                <DialogTitle className='text-3xl text-start font-bold tracking-tight'>
                  {selectedSite.title}
                </DialogTitle>
              </DialogHeader>
              <div>
                <h3 className='text-muted-foreground font-mono mb-1 text-xs font-semibold uppercase tracking-one'>
                  Description
                </h3>
                <p className='text-foreground/90 leading-[1.4]'>
                  {selectedSite.description}
                </p>
              </div>

              <div className='space-y-4'>
                {selectedSite.category && (
                  <div>
                    <h3 className='text-muted-foreground mb-1 font-mono text-xs font-semibold uppercase tracking-one'>
                      Category
                    </h3>
                    <button
                      // @ts-expect-error this is string
                      onClick={() => onCategoryClick(selectedSite.category)}
                      className='text-foreground hover:text-primary font-medium capitalize transition-colors underline-offset-2 hover:underline'
                    >
                      {Array.isArray(selectedSite.category) ? selectedSite.category[0] : selectedSite.category}
                    </button>
                  </div>
                )}

              </div>

              {/* Styles */}
              {selectedSite.style && selectedSite.style.length > 0 && (
                <div>
                  <h3 className='text-muted-foreground mb-1 text-xs font-mono font-semibold uppercase tracking-one'>
                    Styles
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {selectedSite.style.map((style) => (
                      <span
                        key={style}
                        className='bg-secondary hover:bg-secondary/80 leading-[0.9] text-secondary-foreground rounded-lg px-2.25 py-1.75 capitalize text-xs font-medium transition-colors'
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className='border-t  bg-muted/20 space-y-3 p-6'>
              {/* Regenerate Website Button */}
              <Button
                className='w-full'
                onClick={() => {
                  // TODO: Implement regenerate functionality
                  console.log('Regenerate website:', selectedSite.title)
                }}
              >
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  <Sparkles className='h-4 w-4' />
                  Regenerate This Template
                </span>
              </Button>

              {/* Visit Website Button */}
              {selectedSite.pageUrl && (
                <Button asChild variant={'secondary'}>
                  <a
                    href={selectedSite.pageUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full'
                  >
                    <ExternalLink className='h-4 w-4' />
                    Visit Site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <div className='fixed bottom-6 right-10'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae impedit veritatis ad voluptates beatae porro tenetur rerum earum quam excepturi expedita, laborum similique. Porro, eius voluptatum quod quae, voluptates hic nulla inventore vel ex nisi facilis dolore. Soluta, eius ratione.</p>
      </div>
    </Dialog>
  )
}
