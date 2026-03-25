'use client'

/**
 * @author: @emerald-ui
 * @description: SplitText character hover animation and a morphing link highlighter
 * @version: 1.0.0
 * @date: 2026-03-25
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { cn } from '@/lib/utils'

gsap.registerPlugin(SplitText)

// ─── Types ──────────────────────────────────────────────────────────────────

interface MenuItem {
  label: string
  href: string
}

interface MenuNavOverlayProps {
  items?: MenuItem[]
  className?: string
}

const DEFAULT_ITEMS: MenuItem[] = [
  { label: 'Github', href: 'https://github.com/shatlyk1011' },
  { label: 'Blog', href: 'https://blog.shatlykabdullayev.com' },
  { label: 'Linkedin', href: 'https://linkedin.com/in/shatlyk1011' },
]

export default function MorphingHighlighter({
  items = DEFAULT_ITEMS,
  className,
}: MenuNavOverlayProps) {
  // ── Refs ────────────────────────────────────────────────────────────────
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuLinksWrapperRef = useRef<HTMLDivElement>(null)
  const linkHighlighterRef = useRef<HTMLDivElement>(null)
  const menuLinkContainersRef = useRef<(HTMLDivElement | null)[]>([])
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([])

  // rAF lerp state stored in refs to avoid re-renders
  const animationFrameRef = useRef<number | null>(null)
  const splitTextInstances = useRef<InstanceType<typeof SplitText>[]>([])

  const lerpFactor = 0.07
  const currentX = useRef(0)
  const targetX = useRef(0)
  const currentHighlighterX = useRef(0)
  const targetHighlighterX = useRef(0)
  const currentHighlighterWidth = useRef(0)
  const targetHighlighterWidth = useRef(0)

  // ── GSAP setup ──────────────────────────────────────────────────────────
  useGSAP(
    () => {
      const menuOverlay = menuOverlayRef.current
      const menuLinksWrapper = menuLinksWrapperRef.current
      const linkHighlighter = linkHighlighterRef.current
      const menuLinkContainers = menuLinkContainersRef.current
      const menuLinks = menuLinksRef.current

      if (!menuOverlay || !menuLinksWrapper || !linkHighlighter) return

      // ── SplitText – create two char layers per link ──────────────────
      splitTextInstances.current.forEach((s) => s.revert())
      splitTextInstances.current = []

      menuLinks.forEach((link) => {
        if (!link) return
        const spans = link.querySelectorAll<HTMLSpanElement>('span')
        spans.forEach((span, spanIndex) => {
          const split = new SplitText(span, { type: 'chars' })
          splitTextInstances.current.push(split)
          split.chars.forEach((char) => char.classList.add('char'))
          // Second span starts below – ready to animate up on hover
          if (spanIndex === 1) gsap.set(split.chars, { y: '110%' })
        })
      })

      // ── Default highlighter position (first link) ────────────────────
      const firstLinkEl = menuLinksWrapper.querySelector<HTMLDivElement>(
        '.menu-link:first-child'
      )
      const firstSpan = firstLinkEl?.querySelector<HTMLSpanElement>('a span')
      if (firstLinkEl && firstSpan) {
        const linkWidth = firstSpan.offsetWidth
        currentHighlighterWidth.current = linkWidth
        targetHighlighterWidth.current = linkWidth
        linkHighlighter.style.width = `${linkWidth}px`

        const linkRect = firstLinkEl.getBoundingClientRect()
        const wrapperRect = menuLinksWrapper.getBoundingClientRect()
        const initialX = linkRect.left - wrapperRect.left
        currentHighlighterX.current = initialX
        targetHighlighterX.current = initialX
      }

      // ── Mouse-parallax: shift the whole wrapper left/right ───────────
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1000) return

        const vw = menuOverlayRef.current!.getBoundingClientRect().width!
        const wrapperWidth = menuLinksWrapper.offsetWidth
        const maxRight = vw - wrapperWidth

        const sensitivity = vw * 0.4
        const startX = (vw - sensitivity) / 1
        const endX = startX + sensitivity

        const pct =
          e.clientX <= startX
            ? 0
            : e.clientX >= endX
              ? 1
              : (e.clientX - startX) / sensitivity

        targetX.current = pct * maxRight
      }

      menuOverlay.addEventListener('mousemove', handleMouseMove)

      // ── Per-link hover: char swap ────────────────────────────────────
      menuLinkContainers.forEach((linkEl) => {
        if (!linkEl) return

        const handleEnter = () => {
          if (window.innerWidth < 1000) return

          const spans = linkEl.querySelectorAll<HTMLSpanElement>('a > span')
          if (spans.length < 2) return

          const visibleChars = spans[0].querySelectorAll<HTMLElement>('.char')
          const hiddenChars = spans[1].querySelectorAll<HTMLElement>('.char')

          gsap.to(visibleChars, {
            y: '-110%',
            stagger: 0.05,
            duration: 0.5,
            ease: 'expo.inOut',
          })
          gsap.to(hiddenChars, {
            y: '0%',
            stagger: 0.05,
            duration: 0.5,
            ease: 'expo.inOut',
          })

          // Move highlighter
          const linkRect = linkEl.getBoundingClientRect()
          const wrapperRect = menuLinksWrapper.getBoundingClientRect()
          targetHighlighterX.current = linkRect.left - wrapperRect.left

          const span = linkEl.querySelector<HTMLSpanElement>('a > span')
          targetHighlighterWidth.current = span
            ? span.offsetWidth
            : linkEl.offsetWidth
        }

        const handleLeave = () => {
          if (window.innerWidth < 1000) return

          const spans = linkEl.querySelectorAll<HTMLSpanElement>('a > span')
          if (spans.length < 2) return

          const visibleChars = spans[0].querySelectorAll<HTMLElement>('.char')
          const hiddenChars = spans[1].querySelectorAll<HTMLElement>('.char')

          gsap.to(hiddenChars, {
            y: '110%',
            stagger: 0.05,
            duration: 0.5,
            ease: 'expo.inOut',
          })
          gsap.to(visibleChars, {
            y: '0%',
            stagger: 0.05,
            duration: 0.5,
            ease: 'expo.inOut',
          })
        }

        linkEl.addEventListener('mouseenter', handleEnter)
        linkEl.addEventListener('mouseleave', handleLeave)
        ;(linkEl as HTMLElement & { _enter?: () => void })._enter = handleEnter
        ;(linkEl as HTMLElement & { _leave?: () => void })._leave = handleLeave
      })

      // ── Highlighter reset when leaving wrapper ────────────────────────
      const handleWrapperLeave = () => {
        const defaultEl = menuLinksWrapper.querySelector<HTMLDivElement>(
          '.menu-link:first-child'
        )
        const defaultSpan = defaultEl?.querySelector<HTMLSpanElement>('a span')
        if (!defaultEl || !defaultSpan) return

        const linkRect = defaultEl.getBoundingClientRect()
        const wrapperRect = menuLinksWrapper.getBoundingClientRect()
        targetHighlighterX.current = linkRect.left - wrapperRect.left
        targetHighlighterWidth.current = defaultSpan.offsetWidth
      }

      menuLinksWrapper.addEventListener('mouseleave', handleWrapperLeave)

      // ── rAF lerp loop ─────────────────────────────────────────────────
      const animate = () => {
        currentX.current += (targetX.current - currentX.current) * lerpFactor
        currentHighlighterX.current +=
          (targetHighlighterX.current - currentHighlighterX.current) *
          lerpFactor
        currentHighlighterWidth.current +=
          (targetHighlighterWidth.current - currentHighlighterWidth.current) *
          lerpFactor

        gsap.set(menuLinksWrapper, { x: currentX.current })
        gsap.set(linkHighlighter, {
          x: currentHighlighterX.current,
          width: currentHighlighterWidth.current,
        })

        animationFrameRef.current = requestAnimationFrame(animate)
      }
      animate()

      // ── Cleanup ───────────────────────────────────────────────────────
      return () => {
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current)

        menuOverlay.removeEventListener('mousemove', handleMouseMove)
        menuLinksWrapper.removeEventListener('mouseleave', handleWrapperLeave)

        menuLinkContainers.forEach((linkEl) => {
          if (!linkEl) return
          const el = linkEl as HTMLElement & {
            _enter?: () => void
            _leave?: () => void
          }
          if (el._enter) linkEl.removeEventListener('mouseenter', el._enter)
          if (el._leave) linkEl.removeEventListener('mouseleave', el._leave)
        })

        splitTextInstances.current.forEach((s) => s?.revert?.())
        splitTextInstances.current = []
      }
    },
    { scope: menuOverlayRef }
  )

  return (
    <div
      ref={menuOverlayRef}
      className={cn(
        'relative h-120 bg-emerald-500 w-full overflow-hidden ',
        className
      )}
    >
      {/* ── Links wrapper ── */}
      <div
        ref={menuLinksWrapperRef}
        className='menu-links-wrapper absolute bottom-0 left-0 flex w-max items-end justify-between gap-12 p-8 will-change-transform'
      >
        {items.map((item, index) => (
          <div
            key={item.label}
            className='menu-link relative cursor-pointer overflow-hidden will-change-transform'
            ref={(el) => {
              menuLinkContainersRef.current[index] = el
            }}
          >
            <a
              href={item.href}
              target='_blank'
              rel='noopener noreferrer'
              ref={(el) => {
                menuLinksRef.current[index] = el
              }}
              className={cn(
                'relative inline-block overflow-hidden no-underline text-foreground',
                'text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-tight -tracking-[4%]',
              )}
              style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}
            >
              {/* Layer 1 – visible at rest */}
              <span className='absolute left-0 top-0 block text-white'>{item.label}</span>
              {/* Layer 2 – animates in from below on hover */}
              <span
                className='absolute left-0 top-0 block text-white'
                aria-hidden
              >
                {item.label}
              </span>
              {/* Invisible spacer so the anchor has correct size */}
              <span className='invisible block'>{item.label}</span>
            </a>
          </div>
        ))}

        {/* ── Link highlighter bar ── */}
        <div
          ref={linkHighlighterRef}
          className='absolute bottom-8 left-2 h-2 w-50 rounded-full bg-white will-change-[transform,width]'
        />
      </div>
    </div>
  )
}
