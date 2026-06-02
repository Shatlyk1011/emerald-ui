'use client'

/**
 * @author: @codegrid
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
  ['Soundtrack', 'synthesizes', 'the'],
  ['sound', 'of'],
  ['tomorrow.'],
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
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: word,
            start: 'bottom bottom',
            end: 'top 55%',
            scrub: 0.4,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-[220vh] flex-col items-center gap-[8vw] overflow-hidden bg-[#10100e] px-4 pt-[82vh] pb-[10vw] text-[#f5f0e8]'
    >
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl' />
        <div className='absolute right-[8%] bottom-[18%] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_38%,rgba(16,16,14,0.72)_76%)]' />
      </div>

      <p className='title-mask-scroll fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5f0e8]/20 bg-[#10100e]/60 px-5 py-2 text-xs font-semibold tracking-[0.55em] text-[#f5f0e8]/70 uppercase backdrop-blur-md'>
        Scroll
      </p>

      <p className='relative z-10 max-w-xl text-center font-mono text-[clamp(0.72rem,0.95vw,1rem)] leading-relaxed font-medium tracking-[0.24em] text-[#f5f0e8]/68 uppercase'>
        At Soundtrack, we do not just deliver music - we build the tools that
        create it. Our VST offer powerful sound-shaping capabilities and
        intuitive controls that fuel creativity across every genre.
      </p>

      <h2 className='relative z-10 text-center text-[clamp(3.35rem,8.2vw,9.5rem)] leading-[0.86] font-black tracking-[-0.08em] text-balance uppercase'>
        {titleLines.map((line, lineIndex) => (
          <span key={line.join('-')} className='block'>
            {line.map((word) => (
              <span
                key={`${lineIndex}-${word}`}
                className='title-mask-word relative mr-[0.13em] inline-block overflow-hidden align-top'
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

      <div className='relative z-10 aspect-[3/4] w-[min(18rem,58vw)] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(155deg,#f8d589_0%,#d86135_34%,#182b25_70%,#0a0a08_100%)] shadow-2xl shadow-black/50'>
        <div className='absolute inset-x-8 top-8 h-24 rounded-full bg-white/25 blur-2xl' />
        <div className='absolute right-8 bottom-8 left-8 h-2/5 rounded-[2rem] bg-black/35 backdrop-blur-sm' />
        <div className='absolute inset-x-7 bottom-8 flex items-end justify-between text-[0.65rem] font-semibold tracking-[0.32em] text-white/72 uppercase'>
          <span>VST</span>
          <span>004</span>
        </div>
      </div>
    </section>
  )
}
