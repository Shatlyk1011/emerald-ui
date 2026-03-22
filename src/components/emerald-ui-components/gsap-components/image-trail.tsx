'use client'

/**
 * @author: @emerald-ui
 * @description: Image trail effect — images cascade behind the cursor on mouse move using GSAP
 * @version: 1.0.0
 * @date: 2026-03-10
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

// ─── Utilities ───────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1)

// ─── Image pool ──────────────────────────────────────────────────────────────

const TRAIL_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
  'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400&q=80',
  'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80',
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80',
  'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=400&q=80',
]

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageTrailProps {
  /** Distance in px the mouse must travel before showing the next image */
  threshold?: number
  imageWidth?: number
  imageHeight?: number
  title?: string
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImageTrail({
  threshold = 70,
  imageWidth = 240,
  imageHeight = 160,
  title = 'Emerald UI',
  className,
}: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Img element refs populated after first render
  const imgRefs = useRef<HTMLImageElement[]>([])

  useGSAP(
    () => {
      const container = containerRef.current
      const imgs = imgRefs.current
      if (!container || !imgs.length) return

      // Set all images to their default invisible state
      gsap.set(imgs, { opacity: 0, scale: 1, x: 0, y: 0 })

      // ── Cursor tracking ──────────────────────────────────────────────────
      let mousePos = { x: 0, y: 0 }
      let lastMousePos = { x: 0, y: 0 }
      const cacheMousePos = { x: 0, y: 0 }
      let imgPosition = 0
      let zIndexVal = 1
      let isInsideContainer = false

      const getRelativePos = (ev: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        return {
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
        }
      }

      const onMouseMove = (ev: MouseEvent) => {
        mousePos = getRelativePos(ev)
      }
      const onMouseEnter = () => {
        isInsideContainer = true
      }
      const onMouseLeave = () => {
        isInsideContainer = false
      }

      container.addEventListener('mousemove', onMouseMove)
      container.addEventListener('mouseenter', onMouseEnter)
      container.addEventListener('mouseleave', onMouseLeave)

      // ── Image active check ───────────────────────────────────────────────
      const isActive = (img: HTMLImageElement) =>
        gsap.isTweening(img) || parseFloat(img.style.opacity || '0') !== 0

      // ── Show next image ──────────────────────────────────────────────────
      const showNextImage = () => {
        const img = imgs[imgPosition]
        gsap.killTweensOf(img)

        gsap
          .timeline()
          .set(img, {
            opacity: 1,
            scale: 1,
            zIndex: zIndexVal,
            x: cacheMousePos.x - imageWidth / 2,
            y: cacheMousePos.y - imageHeight / 2,
          })
          .to(
            img,
            {
              duration: 0.9,
              ease: 'expo.out',
              x: mousePos.x - imageWidth / 2,
              y: mousePos.y - imageHeight / 2,
            },
            0
          )
          .to(
            img,
            {
              duration: 1,
              ease: 'power1.out',
              opacity: 0,
            },
            0.4
          )
          .to(
            img,
            {
              duration: 1,
              ease: 'power3.out',
              scale: 0.2,
            },
            0.4
          )
      }

      const tick = () => {
        cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.1)
        cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.1)

        if (
          isInsideContainer &&
          distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y) >
            threshold
        ) {
          showNextImage()
          ++zIndexVal
          imgPosition = imgPosition < imgs.length - 1 ? imgPosition + 1 : 0
          lastMousePos = { ...mousePos }
        }

        const allIdle = imgs.every((img) => !isActive(img))
        if (allIdle && zIndexVal !== 1) zIndexVal = 1
      }

      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        container.removeEventListener('mousemove', onMouseMove)
        container.removeEventListener('mouseenter', onMouseEnter)
        container.removeEventListener('mouseleave', onMouseLeave)
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-160 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-50 select-none dark:bg-zinc-950',
        className
      )}
    >
      <div className='pointer-events-none absolute inset-0 z-10' />

      {/* Title anchor */}
      <h3 className='tracking-two text-primary relative z-20 text-7xl font-black select-none max-md:text-5xl'>
        {title}
      </h3>

      {/* Trail images — absolutely positioned, managed by GSAP */}
      {TRAIL_IMAGES.map((src, i) => (
        <img
          key={i}
          ref={(el) => {
            if (el) imgRefs.current[i] = el
          }}
          src={src}
          alt=''
          draggable={false}
          className='absolute top-0 left-0 rounded-lg object-cover opacity-0 shadow-2xl'
          style={{
            width: imageWidth,
            height: imageHeight,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
