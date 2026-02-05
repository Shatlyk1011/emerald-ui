'use client'

/**
 * @author: @nodeui
 * @description: Text Shimmer Component
 * @version: 1.0.0
 * @date: 2026-02-04
 * @license: MIT
 * @website: https://nodeui.com
 */
import { cn } from '@/lib/utils'

export type TextShimmerProps = {
  as?: string
  duration?: number
  spread?: number
  children: React.ReactNode | string
} & React.HTMLAttributes<HTMLElement>

function TextShimmer({
  as = 'span',
  className,
  duration = 4,
  spread = 20,
  children = 'Default Text',
  ...props
}: TextShimmerProps) {
  const dynamicSpread = Math.min(Math.max(spread, 5), 55)
  const Component = as as React.ElementType

  return (
    <Component
      className={cn(
        'bg-size-[200%_auto] bg-clip-text font-medium text-transparent',
        'animate-[shimmer_4s_infinite_linear]',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, var(--muted-foreground) ${50 - dynamicSpread}%, var(--foreground) 50%, var(--muted-foreground) ${50 + dynamicSpread}%)`,
        animationDuration: `${duration}s`,
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

const TextShimmerDemo = () => {
  return (
    <div className='flex flex-col items-center gap-6'>
      <TextShimmer>Node UI Components</TextShimmer>
      <TextShimmer duration={2}>Fast Shimmer</TextShimmer>
    </div>
  )
}

export default TextShimmerDemo
