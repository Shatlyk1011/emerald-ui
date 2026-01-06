import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import PreviewContent from './preview-content'

type PreviewProps = {
  children: React.ReactNode
  className?: string
  isPremium?: boolean
  link: string
  useIframe?: boolean
  height?: string
  compact?: boolean
  comment?: string[]
  isBlock?: boolean
}

const PRE_PATH = '@kokonutui'

function Preview({
  children,
  className = '',
  link,
  useIframe = false,
  compact = false,
  comment = [],
  isBlock = false,
}: PreviewProps) {
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <PreviewContent isBlock={isBlock} link={link} prePath={PRE_PATH} />

      {useIframe ? (
        <div className='my-4 w-full rounded-md border border-zinc-400 dark:border-zinc-700'>
          <div className='relative h-[100dvh] w-full overflow-hidden'>
            <iframe
              className='h-full w-full list-none overflow-y-auto'
              src={`${PRE_PATH}/preview/${link}`}
              style={{
                border: 'none',
                transform: 'scale(0.95)',
              }}
              title={link}
            />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'not-prose relative my-4 flex items-center justify-center rounded-md border border-zinc-400 p-2 md:p-8 dark:border-zinc-800',
            compact ? 'min-h-[100px]' : 'min-h-[400px]',
            isBlock ? 'md:p-0' : ''
          )}
        >
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </div>
      )}
      {comment.length > 0 && (
        <div className='mt-6 mb-4 flex flex-wrap gap-3'>
          {comment.map((text) => (
            <div
              className='rounded-md border border-purple-200 bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 shadow-xs transition-colors hover:bg-purple-200/70 dark:border-purple-800/50 dark:bg-purple-950/30 dark:text-purple-300 dark:hover:bg-purple-950/50'
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
