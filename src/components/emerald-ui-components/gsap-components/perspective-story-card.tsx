'use client'

/**
 * @author: @shatlyk1011
 * @description: Cursor-reactive perspective story card with oversized editorial typography and GSAP easing
 * @version: 1.0.0
 * @date: 2026-06-03
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface PerspectiveStoryCardProps {
  className?: string
  imageUrl?: string
}
export default function PerspectiveStoryCard({
  className,
  imageUrl = 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
}: PerspectiveStoryCardProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 1000
      const root = rootRef.current
      const card = cardRef.current
      const media = mediaRef.current

      if (!root || !card || !media) return
      if (isMobile) return

      const xTo = gsap.quickTo(card, 'x', { duration: 1, ease: 'power4' })
      const yTo = gsap.quickTo(card, 'y', { duration: 1, ease: 'power4' })
      const rotationYTo = gsap.quickTo(card, 'rotationY', {
        duration: 1,
        ease: 'power4',
      })
      const rotationXTo = gsap.quickTo(card, 'rotationX', {
        duration: 1,
        ease: 'power4',
      })
      const scaleXTo = gsap.quickTo(media, 'scaleX', {
        duration: 2,
        ease: 'power1',
      })
      const scaleYTo = gsap.quickTo(media, 'scaleY', {
        duration: 2,
        ease: 'power1',
      })

      let movementTimeout: number | undefined
      let previousX = 0
      let previousY = 0

      const handlePointerMove = (event: MouseEvent) => {
        const rootBounds = root.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        rotationYTo(event.clientX - previousX)
        rotationXTo(-(event.clientY - previousY))

        xTo(event.clientX - viewportWidth / 2)
        yTo(event.clientY - rootBounds.top - viewportHeight / 2)

        scaleXTo(1)
        scaleYTo(1)

        previousX = event.clientX
        previousY = event.clientY

        window.clearTimeout(movementTimeout)
        movementTimeout = window.setTimeout(() => {
          rotationYTo(0)
          rotationXTo(0)
          scaleXTo(1.18)
          scaleYTo(1.18)
        }, 66)
      }

      window.addEventListener('mousemove', handlePointerMove)

      return () => {
        window.removeEventListener('mousemove', handlePointerMove)
        window.clearTimeout(movementTimeout)
      }
    },
    { dependencies: [], scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative h-screen w-full overflow-hidden bg-[#0b0d12] px-4 py-6 text-[#f7f2eb] sm:px-6 lg:px-8',
        className
      )}
      style={{ perspective: '100vw' }}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.12),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent_40%)]' />

      <div className='relative z-10 flex h-full flex-col justify-between'>
        <div className='flex items-start justify-between gap-6'>
          <p className='text-[clamp(2rem,10vw,12rem)] leading-[0.8] font-medium tracking-[-0.07em]'>
            Design systems
          </p>

          <div className='max-w-[13rem] pt-2 text-right text-[clamp(0.8rem,1.6vw,1.15rem)] leading-[1.1] font-medium tracking-[-0.04em] text-[#b7bac5]'>
            <p>8 launches</p>
            <p>Motion studies</p>
            <p>Editorial prototypes</p>
          </div>
        </div>

        <div className='flex items-end justify-between gap-6'>
          <div className='w-full text-right text-[clamp(2rem,10vw,12rem)]'>
            <div className='flex justify-end gap-[0.22em] leading-[0.8] font-medium tracking-[-0.07em]'>
              <span>that</span>
              <span>move</span>
            </div>
            <p className='leading-[0.8] font-medium tracking-[-0.07em]'>
              people forward
            </p>
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className={cn(
          'absolute top-1/2 left-1/2 aspect-[0.75] w-[min(22vw,18rem)] min-w-[12rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30 shadow-[0_40px_120px_rgba(0,0,0,0.45)] max-[1000px]:hidden'
        )}
      >
        <div
          ref={mediaRef}
          aria-label='Editorial cover artwork'
          role='img'
          className='absolute inset-0 h-full w-full scale-[1.18] bg-cover bg-center'
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10' />
      </div>

      <p className='text-primary absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center text-sm font-medium tracking-[0.04em] uppercase max-[1000px]:block'>
        This animation works on desktop <br /> with mouse movement
      </p>
    </section>
  )
}
