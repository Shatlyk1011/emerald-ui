'use client'

/**
 * @author: @codegrid
 * @description: Text Reveal with GSAP
 * @version: 1.0.0
 * @date: 2026-02-04
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import React, { useRef, ReactElement, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText, ScrollTrigger)

interface Props {
  children: ReactNode
  animateOnScroll?: boolean
  delay?: number
}

function TextReveal({ children, animateOnScroll = true, delay = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementRefs = useRef<HTMLElement[]>([])
  const splitRefs = useRef<SplitText[]>([])
  const lines = useRef<HTMLElement[]>([])

  useGSAP(
    () => {
      if (!containerRef.current) return

      splitRefs.current = []
      lines.current = []
      elementRefs.current = []

      let elements: HTMLElement[] = []
      if (containerRef.current.hasAttribute('data-copy-wrapper')) {
        elements = Array.from(containerRef.current.children) as HTMLElement[]
      } else {
        elements = [containerRef.current]
      }

      elements.forEach((element) => {
        elementRefs.current.push(element)

        const split = new SplitText(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line++',
          lineThreshold: 0.1,
        })

        splitRefs.current.push(split)

        const computedStyle = window.getComputedStyle(element)
        const textIndent = computedStyle.textIndent

        if (textIndent && textIndent !== '0px') {
          if (split.lines.length > 0) {
            ;(split.lines[0] as HTMLElement).style.paddingLeft = textIndent
          }
          element.style.textIndent = '0'
        }

        lines.current.push(...(split.lines as HTMLElement[]))
      })

      gsap.set(lines.current, { y: '100%' })

      const animationProps: gsap.TweenVars = {
        y: '0%',
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: delay,
      }

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        })
      } else {
        gsap.to(lines.current, animationProps)
      }

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert()
          }
        })
      }
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  )

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(
      children as ReactElement<Record<string, unknown>>,
      // eslint-disable-next-line react-hooks/refs
      { ref: containerRef }
    )
  }

  return (
    <div ref={containerRef} data-copy-wrapper='true' className='overflow-h'>
      {children}
    </div>
  )
}

export const TextRevealDemo = () => {
  return (
    <div className='space-y-12 p-20 max-md:p-8 max-sm:px-4'>
      <TextReveal>
        <h2 className='text-6xl font-bold max-sm:text-4xl'>
          Text Reveal with GSAP{' '}
        </h2>
        <h2 className='mt-8 text-4xl font-bold max-sm:text-2xl'>
          Scroll bottom to see more
        </h2>
      </TextReveal>
      <TextReveal delay={1}>
        <p className='text-2xl'>With Delay 1s</p>
      </TextReveal>

      <TextReveal>
        <p className='mt-60 text-2xl max-sm:mt-30 max-sm:text-xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          reprehenderit molestiae velit facere nulla beatae aspernatur
          voluptatum voluptate libero expedita minima, possimus vero, enim
          ratione ab fugit accusantium repellendus et. Blanditiis animi expedita
          necessitatibus consequuntur quasi odio repellat deleniti ipsa.
        </p>
      </TextReveal>

      <TextReveal>
        <p className='mt-60 text-2xl max-sm:mt-30 max-sm:text-xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          reprehenderit molestiae velit facere nulla beatae aspernatur
          voluptatum voluptate libero expedita minima, possimus vero, enim
          ratione ab fugit accusantium repellendus et. Blanditiis animi expedita
          necessitatibus consequuntur quasi odio repellat deleniti ipsa.
        </p>
      </TextReveal>

      <TextReveal>
        <p className='mt-60 text-2xl max-sm:mt-30 max-sm:text-xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          reprehenderit molestiae velit facere nulla beatae aspernatur
          voluptatum voluptate libero expedita minima, possimus vero, enim
          ratione ab fugit accusantium repellendus et. Blanditiis animi expedita
          necessitatibus consequuntur quasi odio repellat deleniti ipsa.
        </p>
      </TextReveal>
    </div>
  )
}

export default TextRevealDemo
