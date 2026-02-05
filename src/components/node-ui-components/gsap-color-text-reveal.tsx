'use client'

/**
 * @author: @codegrid
 * @description: Scroll Text Reveal with GSAP and Lenis
 * @version: 1.0.0
 * @date: 2026-02-05
 * @license: MIT
 * @website: https://nodeui.com
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
}

function ColorTextReveal({ children }: Props) {
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
    // eslint-disable-next-line react-hooks/refs
    return React.cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      { ref: containerRef }
    )
  }

  return (
    <div ref={containerRef} data-copy-wrapper='true'>
      {children}
    </div>
  )
}

export default function ColorTextRevealDemo() {
  return (
    <section className='bg-background relative'>
      {/* Hero Section */}
      <div className='relative h-[50vh] w-full overflow-hidden py-20'>
        <div className='flex h-full w-full flex-col items-center justify-center px-8 text-center'>
          <h1 className='mb-6 text-5xl font-black md:text-7xl'>
            GSAP Color Text Reveal
          </h1>
          <p className='max-w-2xl text-xl opacity-80'>
            Experience smooth character-by-character color transitions with
            scroll-triggered animations
          </p>
        </div>
      </div>

      {/* First Fact Section */}
      <div className='bg-background relative flex min-h-svh w-full items-center overflow-hidden py-20'>
        <div className='flex w-full items-center justify-center px-8 text-center'>
          <div className='w-[70%] max-md:w-[85%] max-sm:w-[95%]'>
            <ColorTextReveal>
              <p className='text-foreground mb-8 text-center text-3xl leading-tight font-black'>
                In an era defined by precision and speed, innovation reshapes
                the foundation of modern industry. Every component is built with
                intent, every system designed to perform at scale. This is more
                than machinery— it is the architecture of progress, setting new
                benchmarks for how we build, move, and connect.
              </p>
            </ColorTextReveal>
          </div>
        </div>
      </div>

      {/* Second Fact Section */}
      <div className='bg-background relative flex min-h-svh w-full items-center overflow-hidden py-20'>
        <div className='flex w-full items-center justify-center px-8 text-center'>
          <div className='w-[70%] max-md:w-[85%] max-sm:w-[95%]'>
            <ColorTextReveal>
              <p className='text-foreground mb-8 text-center text-3xl leading-tight font-black'>
                The average human attention span has decreased from 12 seconds
                in 2000 to just 8 seconds today. This makes vibrant and
                interactive storytelling more crucial than ever for capturing
                user engagement and delivering clarity in digital experiences.
              </p>
            </ColorTextReveal>
          </div>
        </div>
      </div>

      {/* Third Fact Section */}
      <div className='bg-background relative flex min-h-svh w-full items-center overflow-hidden py-20'>
        <div className='flex w-full items-center justify-center px-8 text-center'>
          <div className='w-[70%] max-md:w-[85%] max-sm:w-[95%]'>
            <ColorTextReveal>
              <p className='text-foreground mb-8 text-center text-3xl leading-tight font-black'>
                Studies show that users form an opinion about a website in just
                50 milliseconds. The shape and expression of your interface can
                make or break user trust, making intuitive design and living
                animations essential for modern web experiences.
              </p>
            </ColorTextReveal>
          </div>
        </div>
      </div>

      {/* Ending Section */}
      <div className='relative flex h-[20vh] w-full flex-col items-center justify-center overflow-hidden'>
        <h2 className='mb-4 text-4xl font-black md:text-4xl'>
          The End of the Beginning
        </h2>
      </div>
    </section>
  )
}
