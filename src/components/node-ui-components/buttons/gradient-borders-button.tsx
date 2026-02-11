'use client'

/**
 * @author: @nodeui
 * @description: Gradient Borders Button Component - A button with animated gradient borders
 * @version: 1.0.0
 * @date: 2026-02-11
 * @license: MIT
 * @website: https://nodeui.com
 */
import React from 'react'
import { cn } from '@/lib/utils'

interface GradientBordersButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export default function GradientBordersButton({
  className,
  children,
  ...props
}: GradientBordersButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-block cursor-pointer rounded-full border-none bg-slate-100 p-0.5 text-xs leading-6 font-semibold text-white no-underline outline-none focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-100 focus-visible:ring-1 dark:bg-slate-800 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-950',
        className
      )}
      type='button'
      {...props}
    >
      <span className='absolute inset-0 overflow-hidden rounded-full'>
        <span className='absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(189,56,222,1)_0%,rgba(56,189,248,1)_75%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(75%_100%_at_50%_0%,rgba(189,56,222,0.8)_0%,rgba(56,189,248,0.4)_75%)] dark:opacity-0' />
      </span>
      <div className='relative z-10 flex h-8 items-center space-x-2 rounded-full bg-slate-100 px-4 text-black/80 ring-2 ring-white/10 dark:bg-slate-950 dark:text-white/80'>
        <span>{children || 'Gradient Borders'}</span>
      </div>
      <span className='absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
    </button>
  )
}
