'use client'

/**
 * @author: @shatlyk1011
 * @description: Mouse-driven image trail that sends spawned frames backward in 3D space until they fade away
 * @version: 1.0.0
 * @date: 2026-06-07
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface TrailImage {
  title: string
  image: string
}

interface VanishingMouseTrailProps {
  className?: string
  images?: TrailImage[]
}

const DEFAULT_IMAGES: TrailImage[] = [
  {
    title: 'Signal Bloom',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Neon Harbor',
    image:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Quiet Orbit',
    image:
      'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Drift Theory',
    image:
      'https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Glass Static',
    image:
      'https://images.unsplash.com/photo-1518544889280-685f0805b421?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Amber Relay',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Afterimage',
    image:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Blue Index',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  },
]

export default function VanishingMouseTrail({
  className,
  images = DEFAULT_IMAGES,
}: VanishingMouseTrailProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const liveRegionRef = useRef<HTMLParagraphElement | null>(null)
  const mediaIndexRef = useRef(0)
  const activeImagesRef = useRef<
    Array<{
      img: HTMLImageElement
      recessionInput: number
      zTo: (value: number) => void
      fadedOut: boolean
    }>
  >([])

  const safeImages = useMemo(
    () => (images.length ? images : DEFAULT_IMAGES),
    [images]
  )

  useGSAP(
    () => {
      const root = rootRef.current
      const liveRegion = liveRegionRef.current
      if (!root || !safeImages.length) return

      let distance = 0
      let lastX = 0
      let firstMove = true
      let isTouch = false

      const easeIn = gsap.parseEase('power2.in')
      const mm = gsap.matchMedia()
      mm.add('(hover: none)', () => {
        isTouch = true
      })

      const getBounds = () => {
        const width = root.clientWidth
        const height = root.clientHeight

        return {
          width,
          height,
          clampX: gsap.utils.clamp(0, width),
          clampY: gsap.utils.clamp(0, height),
          maxZ: width * 10,
          spawnDist: width / (isTouch ? 6 : 12),
        }
      }

      const createMedia = (x: number, y: number) => {
        const payload = safeImages[mediaIndexRef.current % safeImages.length]
        if (!payload) return

        const img = document.createElement('img')
        img.src = payload.image
        img.alt = payload.title
        img.draggable = false
        img.className =
          'pointer-events-none absolute top-0 left-0 h-[clamp(10rem,18vw,15rem)] w-[clamp(7rem,13vw,10rem)] rounded-[1.6rem] object-cover shadow-[0_18px_70px_rgba(0,0,0,0.28)] will-change-transform'

        root.appendChild(img)

        gsap.fromTo(
          img,
          {
            x,
            y,
            z: 0,
            xPercent: -50,
            yPercent: -50,
            rotation: (Math.random() - 0.5) * 14,
            scale: 1.3,
          },
          {
            scale: 1,
            ease: 'elastic.out(2, 0.6)',
            duration: 0.6,
          }
        )

        const zTo = gsap.quickTo(img, 'z', {
          duration: 1.2,
          ease: 'power2',
        })

        activeImagesRef.current.push({
          img,
          recessionInput: 0,
          zTo,
          fadedOut: false,
        })

        if (liveRegion) {
          liveRegion.textContent = `${payload.title} released into the trail`
        }

        mediaIndexRef.current = (mediaIndexRef.current + 1) % safeImages.length
      }

      const applyMove = (clientX: number, clientY: number) => {
        const rect = root.getBoundingClientRect()
        const bounds = getBounds()
        const x = bounds.clampX(clientX - rect.left)
        const y = bounds.clampY(clientY - rect.top)

        if (firstMove) {
          firstMove = false
          lastX = x
          return
        }

        const delta = Math.abs(x - lastX)
        distance += delta
        lastX = x

        const inputDelta = delta * bounds.width * 0.06

        activeImagesRef.current.slice().forEach((entry) => {
          entry.recessionInput += inputDelta

          const progress = Math.min(
            entry.recessionInput / (bounds.width * 45),
            1
          )
          entry.zTo(-easeIn(progress) * bounds.maxZ)

          if (progress >= 0.98 && !entry.fadedOut) {
            entry.fadedOut = true
            gsap.to(entry.img, {
              autoAlpha: 0,
              duration: 0.2,
              ease: 'power2.in',
              onComplete: () => {
                entry.img.remove()
                activeImagesRef.current = activeImagesRef.current.filter(
                  (item) => item !== entry
                )
              },
            })
          }
        })

        if (distance > bounds.spawnDist) {
          distance = 0
          createMedia(x, y)
        }
      }

      const handleMouseMove = (event: MouseEvent) => {
        applyMove(event.clientX, event.clientY)
      }

      const handleTouchMove = (event: TouchEvent) => {
        if (!event.touches[0]) return
        applyMove(event.touches[0].clientX, event.touches[0].clientY)
      }

      root.addEventListener('mousemove', handleMouseMove)
      root.addEventListener('touchstart', handleTouchMove, { passive: true })
      root.addEventListener('touchmove', handleTouchMove, { passive: true })

      return () => {
        root.removeEventListener('mousemove', handleMouseMove)
        root.removeEventListener('touchstart', handleTouchMove)
        root.removeEventListener('touchmove', handleTouchMove)
        activeImagesRef.current.forEach(({ img }) => img.remove())
        activeImagesRef.current = []
        mm.revert()
      }
    },
    { scope: rootRef, dependencies: [safeImages] }
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative h-[100svh] w-full overflow-hidden rounded-[2rem] bg-[#050816] text-white',
        className
      )}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(87,194,255,0.2),transparent_24%),radial-gradient(circle_at_80%_16%,rgba(255,181,71,0.16),transparent_26%),linear-gradient(180deg,#0a1024_0%,#050816_54%,#02040d_100%)]' />
      <div className='absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:3.75rem_3.75rem] opacity-30' />
      <div className='absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyan-300/12 to-transparent blur-3xl' />

      <div className='relative z-10 flex h-full flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10'>
        <div className='flex flex-wrap items-start justify-between gap-6'>
          <div className='max-w-3xl'>
            <p className='mb-4 text-xs font-medium tracking-[0.38em] text-cyan-200/70 uppercase'>
              Signal Atlas / Motion Archive
            </p>
            <h2 className='max-w-4xl text-[clamp(2.75rem,7vw,6.75rem)] leading-[0.9] font-semibold tracking-[-0.08em] text-balance'>
              Vanishing frames
              <span className='block text-white/48'>
                that fall backward into depth
              </span>
            </h2>
          </div>

          <div className='w-full max-w-sm rounded-[1.5rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm'>
            <p className='text-[0.72rem] font-medium tracking-[0.3em] text-white/50 uppercase'>
              Interaction
            </p>
            <p className='mt-3 text-sm leading-6 text-white/72'>
              Move across the field to release image fragments. Each new pass
              pushes older captures deeper into space until they disappear.
            </p>
          </div>
        </div>

        <div className='flex items-end justify-between gap-4 max-md:flex-col max-md:items-start'>
          <div className='max-w-md'>
            <p className='text-sm leading-6 text-white/58 sm:text-base'>
              Built for launch teasers, portfolio intros, and editorial hero
              moments where motion should feel tactile but restrained.
            </p>
          </div>
          <div className='rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-medium tracking-[0.22em] text-white/68 uppercase'>
            Cursor or touch enabled
          </div>
        </div>
      </div>

      <p ref={liveRegionRef} className='sr-only' aria-live='polite' />
    </section>
  )
}
