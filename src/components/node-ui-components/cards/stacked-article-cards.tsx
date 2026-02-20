'use client'

/**
 * @author: @emerald-ui
 * @description: Stacked article cards that expand on click with smooth transitions
 * @version: 1.1.0
 * @date: 2026-02-17
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { MouseEventHandler, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ArticleItem {
  url: string
  title: string
  subTitle: string
  img: string
}

const DefaultArticleItems: ArticleItem[] = [
  {
    url: 'https://github.com/shatlyk1011',
    title: 'Github',
    subTitle: 'Github — Explore my open source projects',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop&q=80',
  },
  {
    url: 'https://www.instagram.com/devbyshat',
    title: 'Instagram',
    subTitle: 'Instagram — Explore my works',
    img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=200&fit=crop&q=80',
  },
  {
    url: 'https://youtube.com/@devbyshat',
    title: 'Youtube',
    subTitle: 'Youtube — Explore my works',
    img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&q=80',
  },
  {
    url: 'https://linkedin.com/in/shatlyk1011',
    title: 'Linkedin',
    subTitle: 'Lets connect',
    img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&q=80',
  },
]

/** Stacked top offset when collapsed (cards peek behind each other) */
const COLLAPSED_OFFSETS = [
  'top-6',
  'top-[calc(1.5rem+0.75rem)]',
  'top-[calc(1.5rem+1.5rem)]',
  'top-[calc(1.5rem+3rem)]',
]

/** Spread top offset when expanded */
const EXPANDED_OFFSETS = [
  'top-6',
  'top-[calc(1.5rem+112px+1rem)]',
  'top-[calc(1.5rem+224px+2rem)]',
  'top-[calc(1.5rem+336px+3rem)]',
]

interface StackedArticleCardsProps {
  items?: ArticleItem[]
  className?: string
}

export default function StackedArticleCards({
  items = DefaultArticleItems,
  className,
}: StackedArticleCardsProps) {
  const [isActive, setIsActive] = useState(false)

  const handleExpand = () => {
    setIsActive(true)
  }

  const handleCollapse: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setIsActive(false)
  }

  return (
    <div
      className={cn('relative min-h-150 w-full max-w-md', className)}
      onClick={handleExpand}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'absolute right-6 flex h-28 w-96 cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)] hover:bg-white/10 max-md:w-72 dark:border-white/5 dark:bg-white/3 dark:hover:bg-white/[0.07]',
            isActive ? EXPANDED_OFFSETS[index] : COLLAPSED_OFFSETS[index]
          )}
        >
          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'flex w-full items-center gap-4 no-underline',
              isActive ? 'pointer-events-auto' : 'pointer-events-none'
            )}
          >
            <div className='size-16 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10'>
              <img
                src={item.img}
                alt={item.title}
                className='h-full w-full object-cover transition-transform duration-500 hover:scale-110'
              />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='text-foreground mb-1 truncate text-base font-semibold'>
                {item.title}
              </p>
              <p className='text-muted-foreground line-clamp-2 text-sm leading-relaxed'>
                {item.subTitle}
              </p>
            </div>
          </a>
        </div>
      ))}

      {/* Show less toggle */}
      <div
        className={cn(
          'absolute top-[calc(1.5rem+448px+4rem)] right-6 transition-all duration-300 ease-in-out',
          isActive
            ? 'pointer-events-auto visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        )}
        onClick={handleCollapse}
      >
        <Button variant={'secondary'} size='sm'>
          Show less
        </Button>
      </div>
    </div>
  )
}
