'use client'

/**
 * @author: @emerald-ui
 * @description: Scroll-driven title mask effect with GSAP
 * @version: 1.0.0
 * @date: 2026-06-02
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

export default function TitleMaskEffect() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const scrollCue = sectionRef.current.querySelector('.title-mask-scroll')
      const words = gsap.utils.toArray<HTMLElement>('.title-mask-word')

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
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-svh w-full flex-col items-center gap-[8vw] overflow-hidden bg-[#10100e] px-4 pt-[50vh] max-md:pt-[30vh] pb-[10vw] text-[#f5f0e8]'
    >

      <h2 className='relative z-10 text-center text-[clamp(2rem,5.5vw,6.5rem)] leading-[1.15] font-black tracking-[-0.06em] text-balance uppercase'>
        {titleLines.map((line, lineIndex) => (
          <span key={line.join('-')} className='block'>
            {line.map((word) => (
              <span
                key={`${lineIndex}-${word}`}
                className='title-mask-word relative mr-[0.28em] inline-block overflow-hidden align-top'
              >
                <span className='absolute top-0 left-0 inline-block -translate-y-full'>
                  {word}
                </span>
                <span className='inline-block'>{word}</span>
              </span>
            ))}
          </span>
        ))}
      </h2>

    </section>
  )
}
