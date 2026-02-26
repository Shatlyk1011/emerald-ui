'use client'

import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  variant?: 'primary' | 'secondary'
  classes?: string
  animate?: boolean
  delay?: number
}

const MotionButton: FC<Props> = ({ label, classes }) => {
  return (
    <button
      className={cn(
        'bg-background group relative h-auto w-50 cursor-pointer rounded-full border-[none] p-1 outline-none',
        classes
      )}
    >
      <span
        className='circle bg-primary m-0 block h-12 w-12 overflow-hidden rounded-full duration-500 group-hover:w-full'
        aria-hidden='true'
      ></span>
      <div className='icon absolute top-1/2 left-4 translate-x-0 -translate-y-1/2 duration-500 group-hover:translate-x-[0.4rem]'>
        <ArrowRight className='text-background size-6' />
      </div>
      <span className='button-text text-foreground group-hover:text-background font-manrope absolute top-2/4 left-2/4 ml-4 -translate-x-2/4 -translate-y-2/4 text-center text-lg font-medium tracking-tight whitespace-nowrap duration-500'>
        {label}
      </span>
    </button>
  )
}

export default MotionButton
