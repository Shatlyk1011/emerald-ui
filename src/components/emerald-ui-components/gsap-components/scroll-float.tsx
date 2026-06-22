'use client'

/**
 * @author: @shatlyk1011
 * @description: Pinned editorial scrollytelling section with letter-by-letter upward drift tied to scroll
 * @version: 1.0.0
 * @date: 2026-06-22
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface Story {
  title: string
}

interface ScrollFloatProps {
  className?: string
  stories?: Story[]
}

const DEFAULT_STORIES: Story[] = [
  { title: 'Signal Bloom' },
  { title: 'Quiet Current' },
  { title: 'Common Ground' },
]

export default function ScrollFloat({
  className,
  stories = DEFAULT_STORIES,
}: ScrollFloatProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const hintRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      const hint = hintRef.current

      if (!root || !hint || !stories.length) return

      const containers = gsap.utils.toArray<HTMLDivElement>(
        '[data-scroll-float-container]',
        root
      )
      const titles = gsap.utils.toArray<HTMLHeadingElement>(
        '[data-scroll-float-title]',
        root
      )
      const triggerInstances: ScrollTrigger[] = []

      gsap.to(hint, {
        autoAlpha: 0,
        duration: 0.2,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'top top-=1',
          toggleActions: 'play none reverse none',
        },
      })

      containers.forEach((container, storyIndex) => {
        const title = titles[storyIndex]
        const letters = title
          ? gsap.utils.toArray<HTMLSpanElement>(
              '[data-scroll-float-letter]',
              title
            )
          : []

        if (!container || !title || !letters.length) return

        const distance = Math.max(
          container.clientHeight - title.clientHeight + 80,
          0
        )

        const pinTrigger = ScrollTrigger.create({
          trigger: container,
          pin: title,
          start: 'top 80px',
          end: `+=${distance}`,
        })

        triggerInstances.push(pinTrigger)

        letters.forEach((letter) => {
          const randomDistance = Math.random() * distance
          const tween = gsap.from(letter, {
            y: randomDistance,
            ease: 'none',
            scrollTrigger: {
              trigger: title,
              start: 'top 80px',
              end: `+=${randomDistance}`,
              scrub: true,
            },
          })

          const scrollTrigger = tween.scrollTrigger
          if (scrollTrigger) {
            triggerInstances.push(scrollTrigger)
          }
        })
      })

      return () => {
        triggerInstances.forEach((trigger) => trigger.kill())
      }
    },
    { scope: rootRef, dependencies: [stories] }
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative w-full overflow-clip bg-[#0f1115] px-4 py-[100svh] text-[#f4efe8] sm:px-6 lg:px-8',
        className
      )}
    >
      <p
        ref={hintRef}
        className='pointer-events-none absolute top-30 left-1/2 z-30 -translate-x-1/2 text-4xl font-medium tracking-[0.1em] text-white/60 uppercase'
      >
        Scroll bottom
      </p>

      <div className='relative z-10'>
        {stories.map((story) => (
          <article
            key={story.title}
            className='flex flex-col justify-between border-t border-white/10 pt-6 first:border-t-0 first:pt-0'
          >
            <div
              data-scroll-float-container
              className='flex h-[100svh] items-start'
            >
              <h2
                data-scroll-float-title
                className='max-w-[12ch] text-[clamp(3.8rem,11vw,10rem)] leading-[0.88] font-medium tracking-[-0.075em] uppercase'
              >
                {Array.from(story.title).map((character, charIndex) => (
                  <span
                    key={`${story.title}-${charIndex}`}
                    data-scroll-float-letter
                    className='inline-block will-change-transform'
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </span>
                ))}
              </h2>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
