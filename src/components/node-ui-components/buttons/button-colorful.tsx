'use client'

/**
 * @author: @nodeui
 * @description: Colorful Gradient Button Component - A button with animated gradient background effects
 * @version: 1.0.0
 * @date: 2026-01-30
 * @license: MIT
 * @website: https://nodeui.com
 */
import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  variant?: 'default'
}

export default function ButtonColorful({
  className,
  children = 'Explore Components',
  variant = 'default',
  ...props
}: ButtonColorfulProps) {
  const gradientVariants = {
    default:
      'from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-700 dark:via-blue-700 dark:to-purple-700',
  }

  return (
    <button
      className={cn(
        'group relative h-10 overflow-hidden rounded-sm px-4 text-sm tracking-[-0.02em] text-white transition-all duration-200',
        'bg-neutral-400 dark:bg-neutral-300',
        className
      )}
      {...props}
    >
      {/* Gradient background effect */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-linear-to-r',
          gradientVariants[variant],
          'opacity-80 group-hover:opacity-100',
          'blur transition-opacity duration-500'
        )}
      />

      {/* Content */}
      <div className='relative flex items-center justify-center gap-2'>
        {children}
      </div>
    </button>
  )
}
