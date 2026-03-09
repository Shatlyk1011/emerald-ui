'use client'

import { useState } from 'react'
import { ArrowUp, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function GsapTabHint() {
  const [dismissed, setDismissed] = useState(false)
  const pathname = usePathname()
  const isGsapPage = pathname.includes('gsap')

  if (dismissed) return null

  return (
    <div
      className={cn(
        'mx- relative overflow-hidden rounded-md border px-3 py-2.5',
        'border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/40',
        'text-emerald-900 dark:text-emerald-100'
      )}
    >
      {/* Animated glow accent */}
      <span className='pointer-events-none absolute top-0 left-0 h-full w-0.5 rounded-l-md bg-linear-to-b from-emerald-400 to-emerald-600' />

      <div className='flex items-start justify-between gap-2'>
        <div className='flex items-start gap-2'>
          <ArrowUp className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500' />
          <p className='text-xs leading-snug'>
            <span className='font-semibold'>Switch tabs above</span> <br /> to
            explore{' '}
            <Link
              href={`${isGsapPage ? '/docs' : '/docs/gsap/components'}`}
              className='underline underline-offset-2 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400'
            >
              {isGsapPage ? 'Motion Components' : 'GSAP Components'}
            </Link>{' '}
          </p>
        </div>
        <button
          aria-label='Dismiss hint'
          onClick={() => setDismissed(true)}
          className='shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100'
          type='button'
        >
          <X className='h-3 w-3' />
        </button>
      </div>
    </div>
  )
}
