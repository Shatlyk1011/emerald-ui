'use client'

import { useState, useRef } from 'react'
import { formatDateFull } from '@/composables/utils'
import { InspirationWebsite } from '@/payload-types'
import { useAppStore } from '@/store/useAppStore'
import { BotIcon, Sticker } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SiteCardProps {
  item: InspirationWebsite
  index: number
}

function SiteCard({ item, index }: SiteCardProps) {
  const openSiteDialog = useAppStore((state) => state.openSiteDialog)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Determine which media to display (prioritize additionalMedia)
  const displayMedia =
    item.additionalMedia &&
    typeof item.additionalMedia === 'object' &&
    item.additionalMedia.mediaUrl
      ? item.additionalMedia
      : null
  const hasVideo = displayMedia?.type === 'video'
  const videoUrl = hasVideo ? displayMedia?.mediaUrl : null
  const imageUrl = item.imgUrl

  // Use pre-computed gradient color from database
  const bgColor = item.gradientColor!

  // Lazy loading strategy: first 12 images load eagerly, rest load lazily
  const loadingStrategy = index < 12 ? 'eager' : 'lazy'

  const handleClick = () => {
    if (!imageUrl && !videoUrl) return
    openSiteDialog(item)
  }

  const handleMouseEnter = () => {
    if (videoRef.current && hasVideo) {
      setIsHovered(true)
      videoRef.current.load()
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && hasVideo) {
      setIsHovered(false)
      videoRef.current.pause()
    }
  }

  return (
    <div className='relative flex flex-col gap-3'>
      <div
        role='button'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative rounded-xl border bg-transparent px-8 py-16 shadow-md transition-all duration-300 max-sm:px-8 max-sm:py-16',
          imageUrl || videoUrl
            ? 'hover:border-foreground/15 hover:shadow-lg'
            : 'hover:border-destructive/15'
        )}
        style={{ background: bgColor }}
      >
        <div className='relative aspect-4/3 w-full overflow-hidden'>
          <figure className='absolute inset-0 overflow-hidden rounded-lg border bg-background'>
            {imageUrl || videoUrl ? (
              <>
                {/* Always show image */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className={cn(
                      'h-full w-full object-cover transition-opacity duration-300',
                      isHovered && hasVideo ? 'opacity-0' : 'opacity-100'
                    )}
                    alt={item.title + ' image'}
                    crossOrigin='anonymous'
                    loading={loadingStrategy}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      backgroundImage: item.imgPlaceholder
                        ? `url(${item.imgPlaceholder})`
                        : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                )}
                {/* Show video on hover if available */}
                {hasVideo && videoUrl && (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                      isHovered ? 'inline-block' : 'hidden'
                    )}
                    muted
                    loop
                    playsInline
                    preload="none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
              </>
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
          <time
            className='text-muted-foreground text-xs'
            dateTime={item.createdAt}
          >
            {formatDateFull(item.createdAt)}
          </time>
        </div>
      </div>
    </div>
  )
}

export default SiteCard
