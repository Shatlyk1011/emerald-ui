'use client'

/**
 * @author: @codegrid
 * @description: Scroll Text Reveal with GSAP and Lenis
 * @version: 1.0.0
 * @date: 2026-02-05
 * @license: MIT
 * @website: https://nodeui.com
 */
// Add utility classes to your tailwind css file
// These styles will be added dynamically via GSAP
// @layer utilities {
//   .anime-text p {
//     @apply text-foreground dark:text-foreground text-center text-3xl font-black leading-tight mb-8;
//   }
//   .anime-text .word {
//     @apply inline-block relative will-change-[background-color,opacity] mr-0.5 mb-0.5 px-0.5 py-0.5 rounded-full;
//   }
//   .anime-text .word.keyword-wrapper {
//     @apply ml-0.5 mr-1.5 mt-0 mb-0.5;
//   }
//   .anime-text .word span {
//     @apply relative;
//   }
//   .anime-text .word span.keyword {
//     @apply inline-block w-full h-full text-background dark:text-background px-0 py-0.5 rounded-full before:content-[""] before:absolute before:-translate-x-1/2 before:-translate-y-1/2 before:w-[calc(100%_+_1rem)] before:h-[calc(100%_+_0.5rem)] before:bg-foreground dark:before:bg-foreground before:z-[-1] before:rounded-full before:left-1/2 before:top-1/2;
//   }
//   .anime-text .word,
//   .anime-text .word span {
//     @apply opacity-0;
//   }
// }
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORD_HIGHLIGHT_BG_COLOR = '60, 60, 60'
const KEYWORDS = [
  'vibrant',
  'living',
  'clarity',
  'expression',
  'shape',
  'intuitive',
  'storytelling',
  'interactive',
  'vision',
]

export default function GsapScrollTextReveal() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const originalTextRef = useRef<Map<Element, string>>(new Map())

  useGSAP(
    () => {
      const animeTextParagraphs =
        sectionRef.current?.querySelectorAll('.anime-text p')

      if (!animeTextParagraphs) return

      // Store original text content before any manipulation
      animeTextParagraphs.forEach((paragraph) => {
        if (!originalTextRef.current.has(paragraph)) {
          originalTextRef.current.set(paragraph, paragraph.textContent || '')
        }
      })

      // Process all paragraphs and split them into words
      animeTextParagraphs.forEach((paragraph) => {
        // Get original text (either from ref or current content)
        const text =
          originalTextRef.current.get(paragraph) || paragraph.textContent
        const words = text?.split(/\s+/) || []
        paragraph.innerHTML = ''

        words.forEach((word) => {
          if (word.trim()) {
            const wordContainer = document.createElement('div')
            wordContainer.className = 'word'

            const wordText = document.createElement('span')
            wordText.textContent = word

            const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, '')
            if (KEYWORDS.includes(normalizedWord)) {
              wordContainer.classList.add('keyword-wrapper')
              wordText.classList.add('keyword', normalizedWord)
            }

            wordContainer.appendChild(wordText)
            paragraph.appendChild(wordContainer)
          }
        })
      })

      // After all paragraphs are processed, set up ScrollTriggers
      const animeTextContainers = sectionRef.current?.querySelectorAll(
        '.anime-text-container'
      )
      const scrollTriggers: ScrollTrigger[] = []

      animeTextContainers?.forEach((container) => {
        const trigger = ScrollTrigger.create({
          trigger: container as HTMLElement,
          pin: container as HTMLElement,
          start: 'top top',
          end: `+=${window.innerHeight * 4}`,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const words = Array.from(
              container.querySelectorAll('.anime-text .word')
            ) as HTMLElement[]
            const totalWords = words.length

            words.forEach((word, index) => {
              const wordText = word.querySelector('span') as HTMLSpanElement

              if (!wordText) return

              if (progress <= 0.7) {
                const progressTarget = 0.7
                const revealProgress = Math.min(1, progress / progressTarget)

                const overlapWords = 15
                const totalAnimationLength = 1 + overlapWords / totalWords

                const wordStart = index / totalWords
                const wordEnd = wordStart + overlapWords / totalWords

                const timelineScale =
                  1 /
                  Math.min(
                    totalAnimationLength,
                    1 +
                      (totalWords - 1) / totalWords +
                      overlapWords / totalWords
                  )

                const adjustedStart = wordStart * timelineScale
                const adjustedEnd = wordEnd * timelineScale
                const duration = adjustedEnd - adjustedStart

                const wordProgress =
                  revealProgress <= adjustedStart
                    ? 0
                    : revealProgress >= adjustedEnd
                      ? 1
                      : (revealProgress - adjustedStart) / duration

                word.style.opacity = String(wordProgress)

                const backgroundFadeStart =
                  wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0
                const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart)
                word.style.backgroundColor = `rgba(${WORD_HIGHLIGHT_BG_COLOR}, ${backgroundOpacity})`

                const textRevealThreshold = 0.9
                const textRevealProgress =
                  wordProgress >= textRevealThreshold
                    ? (wordProgress - textRevealThreshold) /
                      (1 - textRevealThreshold)
                    : 0
                wordText.style.opacity = String(
                  Math.pow(textRevealProgress, 0.5)
                )
              } else {
                const reverseProgress = (progress - 0.7) / 0.3
                word.style.opacity = '1'
                const targetTextOpacity = 1

                const reverseOverlapWords = 5
                const reverseWordStart = index / totalWords
                const reverseWordEnd =
                  reverseWordStart + reverseOverlapWords / totalWords

                const reverseTimelineScale =
                  1 /
                  Math.max(
                    1,
                    (totalWords - 1) / totalWords +
                      reverseOverlapWords / totalWords
                  )

                const reverseAdjustedStart =
                  reverseWordStart * reverseTimelineScale
                const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale
                const reverseDuration =
                  reverseAdjustedEnd - reverseAdjustedStart

                const reverseWordProgress =
                  reverseProgress <= reverseAdjustedStart
                    ? 0
                    : reverseProgress >= reverseAdjustedEnd
                      ? 1
                      : (reverseProgress - reverseAdjustedStart) /
                        reverseDuration

                if (reverseWordProgress > 0) {
                  wordText.style.opacity = String(
                    targetTextOpacity * (1 - reverseWordProgress)
                  )
                  word.style.backgroundColor = `rgba(${WORD_HIGHLIGHT_BG_COLOR}, ${reverseWordProgress})`
                } else {
                  wordText.style.opacity = String(targetTextOpacity)
                  word.style.backgroundColor = `rgba(${WORD_HIGHLIGHT_BG_COLOR}, 0)`
                }
              }
            })
          },
        })

        scrollTriggers.push(trigger)
      })

      // Cleanup function: kill all ScrollTriggers and restore original DOM
      return () => {
        scrollTriggers.forEach((trigger) => trigger.kill())

        // Restore original text content
        const paragraphs = sectionRef.current?.querySelectorAll('.anime-text p')
        paragraphs?.forEach((paragraph) => {
          const originalText = originalTextRef.current.get(paragraph)
          if (originalText) {
            paragraph.innerHTML = ''
            paragraph.textContent = originalText
          }
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className='relative'>
      {/* Hero Section */}
      <div className='relative h-[70vh] w-full overflow-hidden py-20'>
        <div className='flex h-full w-full flex-col items-center justify-center px-8 text-center'>
          <h1 className='mb-6 text-5xl font-black md:text-7xl'>
            GSAP Scroll Text Reveal
          </h1>
          <p className='max-w-2xl text-xl opacity-80'>
            Experience the power of scroll-triggered animations with
            word-by-word reveals and keyword highlighting
          </p>
        </div>
      </div>

      {/* First Fact Section */}
      <div className='anime-text-container relative flex h-svh w-full items-center overflow-hidden'>
        <div className='flex h-full w-full items-center justify-center px-8 text-center'>
          <div className='anime-text w-[70%] max-md:w-[85%] max-sm:w-[95%]'>
            <p>
              The average human attention span has decreased from 12 seconds in
              2000 to just 8 seconds today. This makes vibrant and interactive
              storytelling more crucial than ever for capturing user engagement
              and delivering clarity in digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Second Fact Section */}
      <div className='anime-text-container relative flex h-svh w-full items-center overflow-hidden'>
        <div className='flex h-full w-full items-center justify-center px-8 text-center'>
          <div className='anime-text w-[70%] max-md:w-[85%] max-sm:w-[95%]'>
            <p>
              Studies show that users form an opinion about a website in just 50
              milliseconds. The shape and expression of your interface can make
              or break user trust, making intuitive design and living animations
              essential for modern web experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Ending Section */}
      <div className='relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden'>
        <h2 className='mb-4 text-4xl font-black md:text-4xl'>
          The End of the Beginning
        </h2>
      </div>
    </section>
  )
}
