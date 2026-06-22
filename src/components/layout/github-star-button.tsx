'use client'

import { useEffect, useState } from 'react'
import { Github, Star } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

interface GitHubStarButtonProps {
  className?: string
}

export default function GitHubStarButton({ className }: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const cachedStars = localStorage.getItem('emerald-ui-stars')
      return cachedStars ? parseInt(cachedStars, 10) : null
    }
    return null
  })

  useEffect(() => {
    const cachedStars = localStorage.getItem('emerald-ui-stars')
    const cachedTime = localStorage.getItem('emerald-ui-stars-time')
    const now = Date.now()

    // Refresh count if no cache or cache older than 5 hours
    const fifteenMinutes = 60 * 60 * 1000 * 5
    if (
      !cachedStars ||
      !cachedTime ||
      now - parseInt(cachedTime, 10) > fifteenMinutes
    ) {
      fetch('https://api.github.com/repos/shatlyk1011/emerald-ui')
        .then((res) => {
          if (!res.ok) throw new Error('Rate limit or network error')
          return res.json()
        })
        .then((data) => {
          if (typeof data.stargazers_count === 'number') {
            setStars(data.stargazers_count)
            localStorage.setItem(
              'emerald-ui-stars',
              data.stargazers_count.toString()
            )
            localStorage.setItem('emerald-ui-stars-time', now.toString())
          }
        })
        .catch(() => {
          // Gracefully fallback to cached value or silent failure
        })
    }
  }, [])

  return (
    <a
      href={siteConfig.githubRepo}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        'group bg-background/60 hover:bg-background/90 text-foreground focus-visible:ring-ring relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-md border border-neutral-200 px-3 py-1 text-xs font-semibold backdrop-blur-xs transition-all duration-300 select-none hover:border-neutral-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.03)] focus-visible:ring-1 focus-visible:outline-none dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]',
        className
      )}
      aria-label='Star us on GitHub'
    >
      {/* Light sweep sweep effect */}
      <span className='via-foreground/5 absolute inset-0 -translate-x-full bg-linear-to-r from-transparent to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full' />

      <div className='flex items-center gap-1'>
        <Github className='h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110' />
        <span className='hidden font-sans font-medium tracking-tight sm:inline'>
          Star Us
        </span>
      </div>

      <div className='h-3.5 w-px bg-neutral-200 dark:bg-neutral-800' />

      <div className='flex items-center gap-1'>
        <Star className='h-3.5 w-3.5 fill-yellow-500/10 text-yellow-500 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:fill-yellow-500/80' />
        {stars !== null ? (
          <span className='text-muted-foreground group-hover:text-foreground font-mono text-sm font-bold transition-colors duration-300'>
            {stars}
          </span>
        ) : (
          <span className='text-muted-foreground font-sans text-[10px] font-medium'>
            docs
          </span>
        )}
      </div>
    </a>
  )
}
