'use client'

/**
 * @author: @emerald-ui
 * @description: Parallax image that smoothly translates on scroll using motion/react
 * @version: 1.0.0
 * @date: 2026-02-19
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  /** Image source URL */
  src?: string
  alt?: string
  speed?: number
  stiffness?: number
  damping?: number
  mass?: number
  containerClassName?: string
  className?: string
}

export default function ParallaxImage({
  src = 'https://pyengguphcmeqlelpozr.supabase.co/storage/v1/object/public/images/emilie.webp',
  alt = 'Parallax image',
  speed = 1,
  stiffness = 80,
  damping = 20,
  mass = 1,
  containerClassName,
  className,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of the container through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [-150 * speed, 150 * speed]
  )

  const y = useSpring(rawY, { stiffness, damping, mass })

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-full w-full overflow-hidden rounded-xl',
        containerClassName
      )}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.2 }}
        className={cn(
          'bg-secondary aspect-video h-full w-full border object-cover will-change-transform',
          className
        )}
      />
    </div>
  )
}
