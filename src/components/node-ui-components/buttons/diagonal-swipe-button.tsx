'use client'

/**
 * @author: @nodeui
 * @description: Diagonal Swipe Button Component - A button with a diagonal swipe hover effect
 * @version: 1.0.0
 * @date: 2026-02-11
 * @license: MIT
 * @website: https://nodeui.com
 */
import React from 'react'
import { cn } from '@/lib/utils'

interface DiagonalSwipeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export default function DiagonalSwipeButton({
  className,
  children = 'Diagonal Swipe',
  ...props
}: DiagonalSwipeButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-sm border-2 border-solid border-emerald-500 px-4 py-2 text-sm text-black transition-colors duration-700 ease-out before:absolute before:-left-10 before:top-0 before:z-[-1] before:h-full before:w-[0%] before:skew-x-45 before:bg-emerald-500 before:transition-all before:delay-75 before:duration-700 before:content-[''] hover:before:w-[150%] focus:outline-none focus:ring-emerald-400 focus:ring-offset-1 focus:ring-offset-white focus:before:w-[150%] focus-visible:ring-2 dark:border-emerald-700 dark:text-white dark:before:bg-emerald-700 dark:focus:ring-emerald-800 dark:focus:ring-offset-black",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
