'use client'

/**
 * @author: @shatlyk1011
 * @description: A scroll-triggered projects section using GSAP
 * @version: 1.0.0
 * @date: 2026-04-17
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export type Project = {
  title: string
  img: string
  link: string
  contribution: 'contributed' | 'led'
  leftText: string
  rightList: string[]
  location: string
  description: string
  stroke1: string
}

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Nexus Platform',
    link: '#',
    contribution: 'led',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    leftText: 'SaaS Dashboard',
    rightList: ['#react', '#tailwind'],
    location: 'New York',
    description:
      'A comprehensive analytics dashboard for enterprise resource planning.',
    stroke1: '#101828',
  },
  {
    title: 'Aura E-Commerce',
    link: '#',
    contribution: 'led',
    img: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=3495&auto=format&fit=crop',
    leftText: 'Online Retail',
    rightList: ['#nextjs', '#stripe'],
    location: 'London',
    description:
      'Modern e-commerce platform with seamless checkout and inventory management.',
    stroke1: '#5B91FF',
  },
  {
    title: 'Horizon App',
    link: '#',
    contribution: 'led',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop',
    leftText: 'Mobile Application',
    rightList: ['#react-native', '#firebase'],
    location: 'Tokyo',
    description:
      'A cross-platform mobile application focused on habit tracking and productivity.',
    stroke1: '#E7EBEB',
  },
]

// Internal Project Card component
const Card = ({ item, linkText }: { item: Project; linkText: string }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-muted-foreground/50 relative aspect-4/3 w-full overflow-hidden rounded-2xl'>
        <img
          src={item.img}
          alt={item.title}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-1 px-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-semibold text-zinc-900 dark:text-white'>
            {item.title}
          </h3>
          <a
            href={item.link}
            className='rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black'
          >
            {linkText}
          </a>
        </div>
        <p className='leading-[145%] text-zinc-500 dark:text-zinc-400'>
          {item.description}
        </p>
        <div className='mt-2 flex gap-2'>
          {item.rightList.map((tag) => (
            <span
              key={tag}
              className='rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

interface GsapProjectsSectionProps {
  projects?: Project[]
  title?: string
}

export default function GsapProjectsSection({
  projects = DEFAULT_PROJECTS,
  title = 'Selected Works',
}: GsapProjectsSectionProps) {
  const container = useRef<HTMLDivElement>(null)

  const totalProjectCount = projects.length

  useGSAP(
    () => {
      if (typeof window === 'undefined' || window.innerWidth < 1024) return
      const spotlightSection = container.current
      if (!spotlightSection) return

      const projectIndex = spotlightSection.querySelector(
        '.project-index h1'
      ) as HTMLElement
      const projectImagesContainer = spotlightSection.querySelector(
        '.project-images'
      ) as HTMLElement
      const projectNamesContainer = spotlightSection.querySelector(
        '.project-names'
      ) as HTMLElement
      const projectNames = gsap.utils.toArray<HTMLElement>('.project-names p')

      if (
        !projectIndex ||
        !projectImagesContainer ||
        !projectNamesContainer ||
        totalProjectCount === 0
      )
        return

      let moveDistanceIndex = 0
      let moveDistanceNames = 0
      let moveDistanceImages = 0

      const calculateMetrics = () => {
        const spotlightSectionHeight = spotlightSection.offsetHeight
        const spotlightSectionPadding =
          parseFloat(getComputedStyle(spotlightSection).paddingTop) || 0
        const projectIndexHeight = projectIndex.offsetHeight
        const containerHeight = projectNamesContainer.offsetHeight
        const imagesHeight = projectImagesContainer.offsetHeight

        moveDistanceIndex =
          spotlightSectionHeight -
          spotlightSectionPadding * 2 -
          projectIndexHeight
        moveDistanceNames =
          spotlightSectionHeight - spotlightSectionPadding * 2 - containerHeight

        // Ensure image container moves appropriately
        moveDistanceImages = Math.min(
          window.innerHeight - imagesHeight,
          -(imagesHeight - window.innerHeight * 0.7)
        )
      }

      calculateMetrics()
      ScrollTrigger.addEventListener('refreshInit', calculateMetrics)

      ScrollTrigger.create({
        trigger: spotlightSection,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const currentIndex = Math.min(
            Math.floor(progress * totalProjectCount) + 1,
            totalProjectCount
          )

          projectIndex.innerHTML = `${String(currentIndex).padStart(2, '0')}<span class="text-[28px] tracking-tight font-normal text-zinc-400">/${String(totalProjectCount).padStart(2, '0')}</span>`

          gsap.set(projectIndex, { y: progress * moveDistanceIndex })
          gsap.set(projectImagesContainer, { y: progress * moveDistanceImages })

          projectNames.forEach((p, index) => {
            const startProgress = index / totalProjectCount
            const endProgress = (index + 1) / totalProjectCount
            const projectProgress = Math.max(
              0,
              Math.min(
                1,
                (progress - startProgress) / (endProgress - startProgress)
              )
            )
            gsap.set(p, { y: -projectProgress * moveDistanceNames })

            if (projectProgress > 0 && projectProgress < 1) {
              gsap.set(p, { color: 'white' })
            } else {
              gsap.set(p, { color: 'gray' })
            }
          })
        },
      })

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', calculateMetrics)
      }
    },
    { scope: container, dependencies: [projects, totalProjectCount] }
  )

  return (
    <section
      className='text-foreground relative w-full overflow-hidden bg-white pt-32 max-lg:h-auto max-lg:px-10 max-lg:pt-16 max-md:px-5 max-sm:px-4 max-sm:pt-12 dark:bg-zinc-950'
      id='works'
    >
      <div className='relative container mx-auto px-4 lg:px-12'>
        <div className='absolute top-0 left-0 px-10 max-lg:static max-lg:mb-20 max-lg:px-0 max-md:mb-12'>
          <h2 className='relative mb-[-13svh] inline-block text-6xl font-bold tracking-tighter uppercase max-lg:mb-0'>
            {title}
          </h2>
        </div>
      </div>

      <div
        ref={container}
        className='relative container mx-auto h-full min-h-svh w-full px-4 pt-36 pb-10 max-lg:min-h-auto max-lg:px-0 max-lg:pt-0 lg:px-12'
      >
        <div className='relative flex items-center justify-between max-lg:hidden'>
          <div className='project-index z-50 text-white mix-blend-difference dark:text-black dark:mix-blend-normal'>
            <h1 className='text-[140px] leading-none font-light tracking-tighter text-zinc-900 dark:text-zinc-50'>
              01
              <span className='text-[28px] font-normal tracking-tight text-zinc-400'>
                /0{projects.length}
              </span>
            </h1>
          </div>
        </div>

        <div className='project-images absolute top-0 left-1/2 z-10 flex w-[45%] -translate-x-1/2 flex-col gap-32 px-0 pt-[30svh] pb-[30svh] max-lg:static max-lg:w-full max-lg:translate-x-0 max-lg:gap-16 max-lg:py-0 max-lg:pt-0 max-md:gap-10'>
          {projects.map((item) => (
            <Card key={item.title} item={item} linkText='VISIT' />
          ))}
        </div>

        <div className='project-names absolute right-8 bottom-8 flex translate-y-4 flex-col gap-2 text-2xl whitespace-nowrap text-zinc-400 max-lg:hidden'>
          {projects.map(({ title }, i) => (
            <p
              key={i}
              className='font-medium text-zinc-300 transition-colors duration-300 data-[active=true]:text-zinc-900 dark:text-zinc-700 dark:data-[active=true]:text-zinc-100'
            >
              {title}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
