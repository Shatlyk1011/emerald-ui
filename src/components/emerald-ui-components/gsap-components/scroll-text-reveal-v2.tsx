'use client'

/**
 * @author: @codegrid
 * @description: Text Reveal with GSAP
 * @version: 1.0.0
 * @date: 2026-02-11
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import React, { useRef, ElementType, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
  asElement?: ElementType
  classes?: string
}

export default function TextReveal2({ children, asElement, classes }: Props) {
  const textRef = useRef<HTMLElement>(null)
  const Component = asElement || 'div'

  useGSAP(
    () => {
      if (!textRef.current) return

      const textElement = textRef.current
      // Set the data-text attribute for the pseudo-element content
      if (textElement.textContent) {
        textElement.setAttribute('data-text', textElement.textContent.trim())
      }

      ScrollTrigger.create({
        trigger: textElement,
        start: 'top 80%', // Adjusted start for better visibility
        end: 'bottom 20%', // Adjusted end
        scrub: 1,
        onUpdate: (self) => {
          // Calculate clip value based on scroll progress
          // 100% (hidden) -> 0% (fully visible)
          const clipValue = Math.max(0, 100 - self.progress * 100)
          textElement.style.setProperty('--clip-value', `${clipValue}%`)
        },
      })
    },
    { scope: textRef, dependencies: [children] }
  )

  return (
    <Component
      ref={textRef}
      style={{ '--clip-value': '100%' } as React.CSSProperties}
      className={cn(
        'text-muted-foreground/20 before:text-foreground relative mx-auto w-fit max-w-[80%] before:absolute before:top-0 before:left-0 before:will-change-[clip-path] before:content-[attr(data-text)] before:[clip-path:inset(0_0_var(--clip-value)_0)]',
        classes
      )}
    >
      {children}
    </Component>
  )
}
