'use client'

/**
 * @author: @codegrid
 * @description: Magnetic Hover Effect wrapper with GSAP
 * @version: 2.0.0
 * @date: 2026-02-17
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap, { Elastic } from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticEffectProps {
  /** Content to apply the magnetic effect to */
  children: React.ReactNode
  /** Parallax movement intensity in px (default 50) */
  strength?: number
  /** Animation duration on mouse move in seconds (default 0.3) */
  duration?: number
  /** Spring-back duration on mouse leave in seconds (default 2) */
  resetDuration?: number
  className?: string
}

export default function MagneticEffect({
  children,
  strength = 35,
  duration = 0.3,
  resetDuration = 2,
  className,
}: MagneticEffectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrapper = wrapperRef.current!
      const inner = innerRef.current!

      function handleMouseLeave() {
        gsap.to(inner, {
          duration: resetDuration,
          scale: 1,
          x: 0,
          y: 0,
          ease: Elastic.easeOut.config(2, 0.3),
        })
      }

      function handleMouseMove(e: MouseEvent) {
        const boundingRect = wrapper.getBoundingClientRect()
        const relX = e.pageX - boundingRect.left
        const relY = e.pageY - boundingRect.top

        gsap.to(inner, {
          duration,
          x: ((relX - boundingRect.width / 2) / boundingRect.width) * strength,
          y: ((relY - boundingRect.height / 2) / boundingRect.width) * strength,
        })
      }

      wrapper.addEventListener('mouseleave', handleMouseLeave)
      wrapper.addEventListener('mousemove', handleMouseMove)

      return () => {
        wrapper.removeEventListener('mouseleave', handleMouseLeave)
        wrapper.removeEventListener('mousemove', handleMouseMove)
      }
    },
    { scope: wrapperRef }
  )

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center p-10',
        className
      )}
      ref={wrapperRef}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
