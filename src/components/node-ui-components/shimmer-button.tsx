'use client'

/**
 * @author: @nodeui
 * @description: An animated button with a shimmer gradient effect that moves across the surface
 * @version: 1.0.0
 * @date: 2026-02-11
 * @license: MIT
 * @website: https://nodeui.com
 */

// add this utility class to your tailwind config
// @layer utilities {
//  @keyframes shimmer2 {
//     0% {
//      background-position: 0% 0%;
//    }
//    100% {
//       background-position: -200% 0%;
//    }
//  }
// }

import { cn } from '@/lib/utils'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

export default function ShimmerButton({
  children = 'Shimmer',
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-12 animate-[shimmer2_2s_infinite_linear] items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#f1f1f1,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-6 font-medium text-slate-600 dark:text-slate-400 transition-colors focus:outline-none focus-visible:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-slate-400 dark:focus:ring-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

