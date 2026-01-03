'use client'

import { File } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileExplorerProps {
  files: Record<string, string>
  activeFile: string
  onSelect: (filename: string) => void
}

export default function FileExplorer({
  files,
  activeFile,
  onSelect,
}: FileExplorerProps) {
  const fileList = Object.keys(files).sort((a, b) => {
    // Basic sort: components first or alphabetical?
    // Let's standard sort
    return a.localeCompare(b)
  })

  return (
    <div className='bg-muted/10 flex h-full w-48 flex-col border-r text-sm'>
      <div className='text-muted-foreground border-b p-3 text-xs font-semibold tracking-wider uppercase'>
        Explorer
      </div>
      <div className='flex-1 overflow-y-auto py-2'>
        {fileList.map((filename) => {
          const isActive = activeFile === filename
          return (
            <button
              key={filename}
              onClick={() => onSelect(filename)}
              className={cn(
                'hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-2 px-4 py-1.5 text-left transition-colors',
                isActive &&
                  'bg-accent text-accent-foreground border-primary border-l-2 pl-[14px] font-medium'
              )}
            >
              <File className='h-4 w-4 opacity-70' />
              <span className='truncate'>{filename.replace(/^\//, '')}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
