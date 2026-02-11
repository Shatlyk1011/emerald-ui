'use client'

/**
 * @author: @codegrid
 * @description: Text Reveal with GSAP
 * @version: 1.0.0
 * @date: 2026-02-11
 * @license: MIT
 * @website: https://nodeui.com
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

function TextReveal2({ children, asElement, classes }: Props) {
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

export const ScrollTextReveal2Demo = () => {
  return (
    <div className='flex min-h-[200vh] w-full flex-col items-center justify-center space-y-[20vh] py-24'>
      <div className='flex h-[50vh] items-center justify-center'>
        <p className='text-muted-foreground'>Scroll down...</p>
      </div>

      <TextReveal2
        asElement='h1'
        classes='text-4xl md:text-6xl font-bold tracking-tighter h-14'
      >
        DARLING, HOLD MY HAND
      </TextReveal2>

      <TextReveal2
        asElement='h2'
        classes='text-4xl md:text-6xl font-bold tracking-tighter h-14'
      >
        OH, WON&apos;T YOU HOLD MY HAND?
      </TextReveal2>

      <TextReveal2
        asElement='h2'
        classes='text-4xl md:text-6xl font-bold tracking-tighter h-14 text-blue-500'
      >
        CAUSE NOTHING BEATS A JET2HOLIDAY
      </TextReveal2>

      <div className='h-[50vh]'></div>
    </div>
  )
}

export default ScrollTextReveal2Demo
