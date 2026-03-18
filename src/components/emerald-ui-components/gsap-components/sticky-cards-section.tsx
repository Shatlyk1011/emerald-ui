'use client'

/**
 * @author: @emerald-ui
 * @description: Sticky Work Section with pinned header text that stays behind scrolling items
 * @version: 1.0.0
 * @date: 2026-03-17
 * @license: MIT
 * @website: https://emerald-ui.com
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const workList = [
  {
    id: 1,
    title: 'Fragments of Light',
    category: 'Short Film',
    image:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Market Pulse',
    category: 'Documentary',
    image:
      'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'The Stillness Project',
    category: 'Experimental',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Chroma/City',
    category: 'Branded Content',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Echoes of Silence',
    category: 'Narrative Drama',
    image:
      'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop',
  },
]

export default function StickyWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyWorkHeaderRef = useRef<HTMLDivElement>(null)
  const listWrapperRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const workHeaderSection = stickyWorkHeaderRef.current
      const homeWorkSection = listWrapperRef.current

      if (!workHeaderSection || !homeWorkSection) return

      const workHeaderPinTrigger = ScrollTrigger.create({
        trigger: workHeaderSection,
        start: 'top top',
        endTrigger: homeWorkSection,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })

      return () => {
        workHeaderPinTrigger.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-1">

      <div
        ref={stickyWorkHeaderRef}
        className="relative z-0 flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-8 text-center"
      >
        <h1 className="text-3xl font-black uppercase leading-[0.85] tracking-tighter opacity-15 md:text-[10vw]">
          SELECTED
        </h1>
      </div>


      <ul
        ref={listWrapperRef}
        className="relative z-10 w-full px-8 py-32 max-md:px-4"
      >
        <li className="mx-auto flex w-full max-w-md flex-col gap-32">
          {workList.map((work, index) => (
            <a
              href="#"
              key={work.id}
              className="group flex flex-col items-center justify-center gap-6 text-center"
            >
              <div className="flex w-full items-end justify-between px-2">
                <p className="font-mono text-sm tracking-widest text-muted-foreground">
                  {String(index + 1).padStart(2, '0')} -{' '}
                  {String(workList.length).padStart(2, '0')}
                </p>
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
                  {work.category}
                </h4>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-full w-full object-cover transition-transform ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-5xl">
                {work.title}
              </h3>
            </a>
          ))}
        </li>
      </ul>
    </section>
  )
}
