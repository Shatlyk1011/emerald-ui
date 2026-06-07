'use client'

/**
 * @author: @emerald-ui
 * @description: Title mask effect with GSAP — scroll-driven or hover-driven
 * @version: 2.0.0
 * @date: 2026-06-07
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleLines = [
  ['Build', 'things'],
  ['that', 'feel'],
  ['impossible.'],
  ['Ship', 'with'],
  ['intention.'],
]

interface TitleMaskEffectProps {
  /** When true the mask reveal is driven by mouse hover instead of scroll */
  hoverEffect?: boolean
}

export default function TitleMaskEffect({
  hoverEffect = false,
}: TitleMaskEffectProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const words = gsap.utils.toArray<HTMLElement>(
        '.title-mask-word',
        sectionRef.current
      )

      if (hoverEffect) {
        // ── Hover-driven mode ──────────────────────────────────────────────
        words.forEach((word) => {
          const children = word.children

          // Set initial state: ghost copy slides in from top
          gsap.set(children, { yPercent: 0 })

          const enter = () => {
            gsap.to(children, {
              yPercent: 100,
              duration: 0.45,
              ease: 'power2.inOut',
              overwrite: 'auto',
            })
          }

          const leave = () => {
            gsap.to(children, {
              yPercent: 0,
              duration: 0.45,
              ease: 'power2.inOut',
              overwrite: 'auto',
            })
          }

          word.addEventListener('mouseenter', enter)
          word.addEventListener('mouseleave', leave)
        })
      } else {
        // ── Scroll-driven mode ─────────────────────────────────────────────
        const scrollCue = sectionRef.current.querySelector('.title-mask-scroll')

        gsap.to(scrollCue, {
          autoAlpha: 0,
          duration: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'top -1',
            toggleActions: 'play none reverse none',
          },
        })

        words.forEach((word) => {
          gsap.to(word.children, {
            yPercent: 100,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: word,
              start: 'bottom 90%',
              end: 'top 45%',
              scrub: 0.5,
            },
          })
        })
      }
    },
    { scope: sectionRef, dependencies: [hoverEffect] }
  )

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-svh w-full flex-col items-center gap-[8vw] overflow-hidden bg-[#10100e] px-4 pt-[30vh] pb-[10vh] text-[#f5f0e8]'
    >
      <h2 className='relative z-10 text-center text-[clamp(2rem,5.5vw,6.5rem)] leading-[1.15] font-black tracking-[-0.06em] text-balance uppercase'>
        {titleLines.map((line, lineIndex) => (
          <span key={line.join('-')} className='block'>
            {line.map((word) => (
              <span
                key={`${lineIndex}-${word}`}
                className='title-mask-word relative mr-[0.28em] inline-block overflow-hidden align-top'
                style={hoverEffect ? { cursor: 'default' } : undefined}
              >
                <span className='absolute top-0 left-0 inline-block -translate-y-full'>
                  {word}
                </span>
                <span className='inline-block px-1'>{word}</span>
              </span>
            ))}
          </span>
        ))}
      </h2>

      {!hoverEffect && (
        <p className='title-mask-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-sm tracking-widest text-[#f5f0e8]/40 uppercase select-none'>
          scroll
        </p>
      )}
    </section>
  )
}
