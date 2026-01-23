'use client'

import { cn } from '@/lib/utils'
import { InspirationWebsite } from '@/payload-types'
import { useAppStore } from '@/store/useAppStore'
import { BotIcon, Sticker } from 'lucide-react'

interface SiteCardProps {
  item: InspirationWebsite
  index: number
}

function SiteCard({ item, index }: SiteCardProps) {
  const isNew = true
  const openSiteDialog = useAppStore((state) => state.openSiteDialog)

  // Determine which media to display (prioritize additionalMedia)
  const displayMedia =
    item.additionalMedia && typeof item.additionalMedia === 'object' && item.additionalMedia.mediaUrl
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
        className={cn('relative rounded-xl border px-8 py-16 shadow-lg transition-all bg-transparent duration-300', displayUrl ? 'hover:border-foreground/20 hover:shadow-xl' : "hover:border-destructive/20")}
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
                <div className='flex flex-col items-center justify-center h-full w-full opacity-80 border-border border rounded-lg'>
                  <p className='text-xl -tracking-two font-medium font-mono '>No image</p>
                  <BotIcon className='w-8 h-8' />
                  {/* <Button size='sm' className='mt-2 py-0 min-h-6'>Report</Button> */}
                </div>
            )}
          </figure>

          {/* Badges */}
        </div>
        {isNew && (
          <span className='bg-background font-mono text-foreground tracking-[0.1em] border-border absolute top-3 left-3 rounded-md border px-2 py-2.5 text-[11px] leading-0 font-semibold uppercase'>
            New
          </span>
        )}
      </div>

      {/* Card Footer */}
      <div className='flex items-start gap-3 px-1'>
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
          <h3 className='text-sm leading-tight font-semibold transition-colors'>
            {item.title}
          </h3>
          <p className='mt-0.5 text-xs leading-snug text-gray-500'>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SiteCard
