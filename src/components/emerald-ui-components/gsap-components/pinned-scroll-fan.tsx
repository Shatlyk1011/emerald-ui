'use client'

/**
 * @author: @shatlyk1011
 * @description: Pinned scroll fan gallery with stacked cards that reveal and rotate through an editorial arc
 * @version: 1.1.0
 * @date: 2026-06-05
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface FanCard {
  title: string
  region: string
  image: string
}

interface PinnedScrollFanProps {
  className?: string
  cards?: FanCard[]
}

const DEFAULT_CARDS: FanCard[] = [
  {
    title: 'Mistral House',
    region: 'Marseille',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Signal Loft',
    region: 'Copenhagen',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Canopy Office',
    region: 'Singapore',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Harbor Suite',
    region: 'Auckland',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Atlas Corner',
    region: 'Berlin',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Quiet Frame',
    region: 'Oslo',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Northlight Lab',
    region: 'Reykjavik',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
]

const FAN_ANGLE = 5

export default function PinnedScrollFan({
  className,
  cards = DEFAULT_CARDS,
}: PinnedScrollFanProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const pinHeightRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const circlesRef = useRef<HTMLDivElement | null>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const root = rootRef.current
      const pinHeight = pinHeightRef.current
      const container = containerRef.current
      const circles = circlesRef.current
      const items = circleRefs.current.filter(Boolean) as HTMLDivElement[]

      if (!root || !pinHeight || !container || !circles || !items.length) return

      gsap.set(items, { autoAlpha: 0 })

      let currentIndex = -1

      // quickTo avoids stacking overlapping tweens on every scroll tick —
      // it reuses a single tween and only updates the destination value,
      // which eliminates the lag caused by elastic.out tweens piling up.
      const rotateTo = gsap.quickTo(circles, 'rotation', {
        duration: 0.4,
        ease: 'power2.out',
      })

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const trigger = ScrollTrigger.create({
          trigger: pinHeight,
          start: 'top top',
          end: 'bottom bottom',
          pin: container,
          onUpdate: (self) => {
            const nextIndex = Math.floor(self.progress * items.length)

            if (nextIndex === currentIndex || nextIndex >= items.length) return

            if (nextIndex > currentIndex) {
              for (
                let index = currentIndex + 1;
                index <= nextIndex;
                index += 1
              ) {
                const circle = items[index]
                if (!circle) continue

                gsap.set(circle, {
                  autoAlpha: 1,
                  rotation: index * FAN_ANGLE,
                })
                gsap.fromTo(
                  circle,
                  { scale: 0.92 },
                  {
                    scale: 1,
                    ease: 'back.out(1.4)',
                    duration: 0.45,
                    overwrite: true,
                  }
                )
              }
            } else {
              for (let index = currentIndex; index > nextIndex; index -= 1) {
                const circle = items[index]
                if (!circle) continue
                gsap.set(circle, { autoAlpha: 0 })
              }
            }

            rotateTo(-nextIndex * FAN_ANGLE + (FAN_ANGLE / 2) * nextIndex)

            currentIndex = nextIndex
          },
          onLeaveBack: () => {
            currentIndex = -1
            gsap.set(items, { autoAlpha: 0 })
            gsap.set(circles, { rotation: 0 })
          },
        })

        return () => {
          trigger.kill()
        }
      })

      return () => {
        mm.revert()
      }
    },
    { scope: rootRef, dependencies: [cards.length] }
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'bg-background text-foreground relative w-full overflow-hidden',
        className
      )}
    >
      {/* Radial gradient using theme colors */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--chart-1)_16%,transparent),transparent_34%),linear-gradient(180deg,color-mix(in_oklch,var(--background)_92%,transparent),var(--background)_100%)]' />

      {/* Desktop-first: h-[500svh] is the base; shrink to 420svh on small screens */}
      <div ref={pinHeightRef} className='relative h-[500svh] max-md:h-[420svh]'>
        <div
          ref={containerRef}
          className='relative flex h-svh w-full overflow-hidden px-16 pt-8 pb-10 max-lg:px-6 max-sm:px-4'
        >
          <div className='relative flex w-full flex-col items-center justify-start'>
            <div className='relative z-20 mt-2 text-center'>
              <p className='text-[clamp(2.6rem,6.4vw,5.7rem)] leading-[0.92] font-semibold tracking-[-0.08em] text-balance'>
                <span className='text-foreground block'>Rounded spaces</span>
                <span className='text-muted-foreground block'>
                  opening on scroll
                </span>
              </p>
              <p className='text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-6 sm:text-base'>
                A stacked editorial fan for interior references, campaign
                frames, and launch stories.
              </p>
            </div>

            {/* Desktop-first fan container — offset-left so arc fans from center */}
            <div
              ref={circlesRef}
              className='relative mt-[50svh] ml-[-100%] aspect-square w-[300%] max-w-none max-md:mt-[22svh] max-md:ml-0'
            >
              {cards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  ref={(node) => {
                    circleRefs.current[index] = node
                  }}
                  className='absolute inset-0 flex items-start justify-center'
                >
                  <article className='border-border bg-card relative aspect-[3/4] w-[20vw] max-w-[20rem] min-w-[13rem] -translate-y-1/2 overflow-hidden rounded-[1.25vw] border shadow-[0_24px_80px_color-mix(in_oklch,var(--foreground)_14%,transparent)] max-md:w-[43vw] max-md:rounded-[1.6rem]'>
                    <img
                      src={card.image}
                      alt={card.title}
                      className='absolute inset-0 h-full w-full object-cover'
                      loading='lazy'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent' />
                    <div className='absolute right-0 bottom-[4.4vw] left-0 z-10 px-5 text-center text-white uppercase max-md:bottom-[16%] max-md:px-4'>
                      <p className='text-[clamp(1.55rem,3vw,2.4rem)] leading-none font-black tracking-[-0.04em]'>
                        {card.title}
                      </p>
                      <span className='mt-2 block text-[0.82vw] font-medium tracking-[0.22em] opacity-85 max-md:text-[0.72rem]'>
                        {card.region}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Mobile scroll hint — hidden on desktop */}
            <div className='absolute right-0 bottom-8 left-0 z-20 px-4 text-center md:hidden'>
              <p className='text-muted-foreground mx-auto max-w-sm text-sm leading-6'>
                Scroll through the section to reveal each card in a rotating
                fan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
