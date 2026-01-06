'use client'

import { RefreshCw } from 'lucide-react'

interface RefreshButtonProps {
  onRefresh: () => void
}

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  return (
    <button
      type='button'
      onClick={onRefresh}
      className='group absolute top-17 right-2 z-10 flex h-7 items-center gap-2 rounded-md bg-black p-2 px-3 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100'
      aria-label='Refresh preview'
    >
      <RefreshCw
        className='transition-transform duration-300 group-hover:rotate-180'
        size={16}
      />
      <span className='text-sm font-medium'>Refresh</span>
    </button>
  )
}
