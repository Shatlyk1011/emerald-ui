'use client'

import { Suspense, useState } from 'react'
import { cn } from '@/lib/utils'
import PreviewContent from './preview-content'

type PreviewProps = {
  children: React.ReactNode
  className?: string
  isPremium?: boolean
  link: string
  height?: string
  compact?: boolean
  comment?: string[]
  isBlock?: boolean
  isReload?: boolean
}
const PRE_PATH = '@emerald-ui'

function Preview({
  children,
  className = '',
  link,
  compact = false,
  comment = [],
  isBlock = false,
  isReload = false,
}: PreviewProps) {
  const [componentKey, setComponentKey] = useState(0)

  const handleReload = () => {
    if (isReload) {
      setComponentKey((prev) => prev + 1)
    }
  }

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <PreviewContent
        isBlock={isBlock}
        link={link}
        prePath={PRE_PATH}
        onReload={isReload ? handleReload : undefined}
      />

      <div
        key={componentKey}
        className={cn(
          'not-prose relative my-4 flex items-center justify-center rounded-md border border-zinc-400 p-2 md:p-8 dark:border-zinc-800',
          compact ? 'min-h-25' : 'min-h-100',
          isBlock ? 'md:p-0' : ''
        )}
      >
        <Suspense fallback={'Loading...'}>{children}</Suspense>
      </div>
      {comment.length > 0 && (
        <div className='mt-6 mb-4 flex flex-wrap gap-3'>
          {comment.map((text) => (
            <div
              className='rounded-md border border-current/20 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 shadow-xs transition-colors dark:bg-emerald-900 dark:text-emerald-50'
              key={text}
            >
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Preview
