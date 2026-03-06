'use client'

import { useAppStore } from '@/store/useAppStore'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '../ui/button'
import Lens from '../ui/lens'
import { ScrollArea } from '../ui/scroll-area'
import { Switch } from '../ui/switch'

interface SitePreviewDialogProps {
  onCategoryClick: (category: string) => void
}

export default function SitePreviewDialog({
  onCategoryClick,
}: SitePreviewDialogProps) {
  const {
    selectedSite,
    isDialogOpen,
    closeSiteDialog,
    isZoomEnabled,
    toggleZoom,
  } = useAppStore()

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
      <DialogContent className='scrollbar-thin max-h-[96%] overflow-hidden p-0 max-lg:overflow-auto'>
        {/* Two-column layout */}
        <ScrollArea className='h-full w-full'>
          <div className='grid grid-cols-[1fr_320px] max-lg:grid-cols-1'>
            {/* Left: Image Preview Area */}
            <div
              className='flex flex-col overflow-y-auto px-4 py-4 max-lg:py-6 max-md:p-4 max-sm:pt-2'
              style={{ background: selectedSite.gradientColor! }}
            >
              {/* Media Gallery with Tabs */}
              <div className='flex-1'>
                {showTabs ? (
                  <Tabs
                    defaultValue='media'
                    className='h-full w-full'
                    autoFocus={false}
                  >
                    <TabsList className='mb-4 flex w-full justify-start gap-2 rounded-none border-b bg-transparent pb-4 max-sm:pb-0'>
                      <TabsTrigger
                        autoFocus={false}
                        className='rounded-px px-4 py-2 transition-all data-[state=active]:bg-transparent'
                        value='media'
                      >
                        Video
                      </TabsTrigger>
                      <TabsTrigger
                        autoFocus={false}
                        className='rounded-px px-4 py-2 transition-all data-[state=active]:bg-transparent'
                        value='screenshot'
                      >
                        Screenshot
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value='screenshot'
                      className='mt-0 h-[calc(100%-3rem)]'
                    >
                      <div className='bg-background relative flex h-full w-full items-center overflow-hidden rounded-lg border shadow-lg'>
                        <Lens
                          disableZoom={!isZoomEnabled}
                          classes='rounded-xl overflow-hidden'
                          background={selectedSite.gradientColor!}
                        >
                          <img
                            draggable={false}
                            src={selectedSite.imgUrl!}
                            loading="lazy"
                            alt={`${selectedSite.title} screenshot`}
                            className='aspect-4/3 h-full w-full object-contain object-top'
                          />
                        </Lens>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value='media'
                      className='mt-0 h-[calc(100%-3rem)]'
                    >
                      {hasAdditionalMedia &&
                        typeof selectedSite.additionalMedia === 'object' && (
                          <div className='bg-background relative h-full w-full overflow-hidden rounded-lg border shadow-lg'>
                            {selectedSite.additionalMedia?.type === 'video' ? (
                              <video
                                src={selectedSite.additionalMedia.mediaUrl!}
                                className='aspect-4/3 h-full w-full object-contain object-center'
                                autoPlay
                                muted
                                playsInline
                                loop
                                aria-label={
                                  selectedSite.additionalMedia.altText ||
                                  `${selectedSite.title} video`
                                }
                              />
                            ) : (
                              <Lens
                                disableZoom={!isZoomEnabled}
                                background={selectedSite.gradientColor!}
                              >
                                <img
                                  draggable={false}
                                  src={selectedSite.additionalMedia!.mediaUrl!}
                                  loading="lazy"
                                  alt={
                                    selectedSite.additionalMedia!.altText ||
                                    `${selectedSite.title} additional media`
                                  }
                                  className='aspect-4/3 h-full w-full object-contain object-top'
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
                    <div className='bg-background relative h-full overflow-hidden rounded-lg border shadow-lg'>
                      <Lens
                        disableZoom={!isZoomEnabled}
                        background={selectedSite.gradientColor!}
                      >
                        <img
                          draggable={false}
                            loading="lazy"
                          src={selectedSite.imgUrl!}
                          alt={`${selectedSite.title} screenshot`}
                          className='h-full w-full object-contain object-top'
                        />
                      </Lens>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Sidebar with Details */}
            <div className='bg-background flex flex-col overflow-y-auto border-l'>
              {/* Content Section */}
              <div className='flex min-h-100 flex-1 flex-col gap-6 p-6 pt-8 pb-4 max-lg:min-h-auto'>
                <DialogHeader>
                  <DialogTitle className='text-start text-3xl font-bold tracking-tight'>
                    {selectedSite.title}
                  </DialogTitle>
                </DialogHeader>
                <div>
                  <h3 className='text-muted-foreground tracking-one mb-1 font-mono text-xs font-semibold uppercase'>
                    Description
                  </h3>
                  <p className='text-foreground/90 leading-[1.4]'>
                    {selectedSite.description}
                  </p>
                </div>

                <div className='space-y-4'>
                  {selectedSite.category && (
                    <div>
                      <h3 className='text-muted-foreground tracking-one mb-1 font-mono text-xs font-semibold uppercase'>
                        Category
                      </h3>
                      <button
                        // @ts-expect-error this is string
                        onClick={() => onCategoryClick(selectedSite.category)}
                        className='text-foreground hover:text-primary font-medium capitalize underline-offset-2 transition-colors hover:underline'
                      >
                        {Array.isArray(selectedSite.category)
                          ? selectedSite.category[0]
                          : selectedSite.category}
                      </button>
                    </div>
                  )}
                </div>

                {/* Styles */}
                {selectedSite.style && selectedSite.style.length > 0 && (
                  <div>
                    <h3 className='text-muted-foreground tracking-one mb-1 font-mono text-xs font-semibold uppercase'>
                      Styles
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {selectedSite.style.map((style) => (
                        <span
                          key={style}
                          className='bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md px-2.25 py-1.75 text-xs leading-[0.9] font-medium capitalize transition-colors'
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Zoom Toggle */}
                <div className='mt-auto flex items-center gap-2.5'>
                  <label
                    htmlFor='zoom-toggle'
                    className='text-muted-foreground cursor-pointer text-sm font-medium select-none'
                  >
                    Zoom on images
                  </label>
                  <Switch
                    id='zoom-toggle'
                    checked={isZoomEnabled}
                    onCheckedChange={() => toggleZoom()}
                  />
                </div>
              </div>

              {/* Action Buttons - Fixed at bottom */}
              <div className='bg-muted/20 space-y-3 border-t p-6'>
                {/* Visit Website Button */}
                {selectedSite.pageUrl && (
                  <Button asChild variant={'secondary'}>
                    <a
                      href={`${selectedSite.pageUrl}?ref=${siteConfig.siteUrl}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full'
                    >
                      <ExternalLink className='size-3.5' />
                      Visit Site
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
