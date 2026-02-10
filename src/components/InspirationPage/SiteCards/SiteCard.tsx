'use client'

import { InspirationWebsite } from '@/payload-types'
import { useAppStore } from '@/store/useAppStore'
import { BotIcon, Sticker } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDateFull } from '@/composables/utils'

interface SiteCardProps {
  item: InspirationWebsite
  index: number
}

function SiteCard({ item, index }: SiteCardProps) {
  const openSiteDialog = useAppStore((state) => state.openSiteDialog)

  // Determine which media to display (prioritize additionalMedia)
  const displayMedia =
    item.additionalMedia &&
    typeof item.additionalMedia === 'object' &&
    item.additionalMedia.mediaUrl
      ? item.additionalMedia
      : null
  const displayUrl = displayMedia?.mediaUrl || item.imgUrl
  const isVideo = displayMedia?.type === 'video'

  // Use pre-computed gradient color from database
  const bgColor = item.gradientColor!

  // Lazy loading strategy: first 12 images load eagerly, rest load lazily
  const loadingStrategy = index < 12 ? 'eager' : 'lazy'

  const handleClick = () => {
    if (!displayUrl) return
    openSiteDialog(item)
  }

  return (
    <div className='relative flex flex-col gap-3'>
      <div
        role='button'
        onClick={handleClick}
        className={cn(
          'relative rounded-xl border bg-transparent px-8 py-16 max-sm:px-8 max-sm:py-16 shadow-lg transition-all duration-300',
          displayUrl
            ? 'hover:border-foreground/15 hover:shadow-xl'
            : 'hover:border-destructive/15'
        )}
        style={{ background: bgColor }}
      >
        <div className='relative aspect-4/3 w-full overflow-hidden'>
          <figure className='absolute inset-0 overflow-hidden rounded-lg'>
            {displayUrl ? (
              isVideo ? (
                <video
                  src={displayUrl}
                  className='h-full w-full object-cover'
                  muted
                  autoPlay
                  loop
                  playsInline
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <img
                  src={displayUrl}
                  className='h-full w-full object-cover'
                  alt={item.title + ' image'}
                  crossOrigin='anonymous'
                  loading={loadingStrategy}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              )
            ) : (
              <div className='border-border flex h-full w-full flex-col items-center justify-center rounded-lg border opacity-80'>
                <p className='-tracking-two font-mono text-xl font-medium'>
                  No image
                </p>
                <BotIcon className='h-8 w-8' />
                {/* <Button size='sm' className='mt-2 py-0 min-h-6'>Report</Button> */}
              </div>
            )}
          </figure>

        </div>
      </div>

      <div className='flex items-center gap-3 px-1'>
        <div className='bg-card mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md'>
          {item.favicon ? (
            <img
              src={item.favicon}
              className='h-full w-full object-contain'
              alt=''
              draggable={false}
            />
          ) : (
            <Sticker />
          )}
        </div>
        <div className='flex flex-col'>
          <h3 className='text-lg leading-tight font-semibold transition-colors'>
            {item.title}
          </h3>
          <time className='text-xs text-muted-foreground' dateTime={item.createdAt}>{formatDateFull(item.createdAt)}</time>
        </div>
      </div>
    </div>
  )
}

export default SiteCard
