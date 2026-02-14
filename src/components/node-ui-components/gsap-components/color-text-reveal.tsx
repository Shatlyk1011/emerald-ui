'use client'

/**
 * @author: @codegrid
 * @description: Scroll Text Reveal with GSAP and Lenis
 * @version: 1.0.0
 * @date: 2026-02-05
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import React, { ReactNode, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useTheme } from 'next-themes'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
  children: ReactNode
  classes?: string
}

export default function ColorTextReveal({ children, classes }: Props) {
  const { theme } = useTheme()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const splitRefs = useRef<
    Array<{ wordSplit: SplitText; charSplit: SplitText }>
  >([])
  const lastScrollProgress = useRef(0)
  const colorTransitionTimers = useRef<Map<number, NodeJS.Timeout>>(new Map())
  const completedChars = useRef<Set<number>>(new Set())

  const isDark = theme === 'dark'

  // update colors according your design
  const colorInitial = isDark ? '#202020' : '#dddddd'
  const colorAccent = '#abff02'
  const colorFinal = isDark ? '#dddddd' : '#000000'

  useGSAP(
    () => {
      if (!containerRef.current) return

      splitRefs.current = []
      lastScrollProgress.current = 0
      colorTransitionTimers.current.clear()
      completedChars.current.clear()

      let elements: HTMLElement[] = []
      if (containerRef.current.hasAttribute('data-copy-wrapper')) {
        elements = Array.from(containerRef.current.children) as HTMLElement[]
      } else {
        elements = [containerRef.current]
      }

      elements.forEach((element) => {
        const wordSplit = SplitText.create(element, {
          type: 'words',
          wordsClass: 'word',
        })

        const charSplit = SplitText.create(wordSplit.words, {
          type: 'chars',
          charsClass: 'char',
        })

        splitRefs.current.push({ wordSplit, charSplit })
      })

      const allChars = splitRefs.current.flatMap(
        ({ charSplit }) => charSplit.chars
      )

      gsap.set(allChars, { color: colorInitial })

      const scheduleFinalTransition = (char: Element, index: number) => {
        if (colorTransitionTimers.current.has(index)) {
          clearTimeout(colorTransitionTimers.current.get(index))
        }

        const timer = setTimeout(() => {
          if (!completedChars.current.has(index)) {
            gsap.to(char, {
              duration: 0.1,
              ease: 'none',
              color: colorFinal,
              onComplete: () => {
                completedChars.current.add(index)
              },
            })
          }
          colorTransitionTimers.current.delete(index)
        }, 100)

        colorTransitionTimers.current.set(index, timer)
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const totalChars = allChars.length
          const isScrollingDown = progress >= lastScrollProgress.current
          const currentCharIndex = Math.floor(progress * totalChars)

          allChars.forEach((char, index) => {
            if (!isScrollingDown && index >= currentCharIndex) {
              if (colorTransitionTimers.current.has(index)) {
                clearTimeout(colorTransitionTimers.current.get(index))
                colorTransitionTimers.current.delete(index)
              }
              completedChars.current.delete(index)
              gsap.set(char, { color: colorInitial })
              return
            }

            if (completedChars.current.has(index)) {
              return
            }

            if (index <= currentCharIndex) {
              gsap.set(char, { color: colorAccent })
              if (!colorTransitionTimers.current.has(index)) {
                scheduleFinalTransition(char, index)
              }
            } else {
              gsap.set(char, { color: colorInitial })
            }
          })

          lastScrollProgress.current = progress
        },
      })

      return () => {
        colorTransitionTimers.current.forEach((timer) => clearTimeout(timer))
        colorTransitionTimers.current.clear()
        completedChars.current.clear()

        splitRefs.current.forEach(({ wordSplit, charSplit }) => {
          if (charSplit) charSplit.revert()
          if (wordSplit) wordSplit.revert()
        })
      }
    },
    {
      scope: containerRef,
      dependencies: [theme],
    }
  )
  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(
      { ...children, type: 'span' } as React.ReactElement<Record<string, unknown>>,
      // eslint-disable-next-line react-hooks/refs
      { ref: containerRef }
    )
  }

  return (
    <div ref={containerRef} data-copy-wrapper='true'>
      {children}
    </div>
  )
}


