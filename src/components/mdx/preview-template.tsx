import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CheckoutIcon } from '../icons/checkout'
import { ScreenOutlineIcon } from '../icons/screen-outline'

interface PreviewTemplateProps {
  previewLink: string
  buyLink: string
  videoUrl: string
  className?: string
}

export default function PreviewTemplate({
  previewLink,
  buyLink = 'https://kokonutui.pro/',
  videoUrl,
  className,
}: PreviewTemplateProps) {
  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      <div className='flex items-center gap-4'>
        <Link
          href={previewLink}
          target='_blank'
          className='group not-prose relative hidden items-center gap-2 rounded-lg border bg-zinc-900 px-2 py-1.5 text-sm text-white transition-colors hover:bg-zinc-700 md:inline-flex dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300'
        >
          Live Preview
          <ScreenOutlineIcon className='h-4 w-4' />
        </Link>
        <Link
          href={buyLink}
          target='_blank'
          className='group not-prose relative hidden items-center gap-2 rounded-lg border border-orange-500 px-2 py-1.5 text-sm text-orange-500 transition-colors hover:bg-orange-100 md:inline-flex dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950'
        >
          Buy Now
          <CheckoutIcon className='h-4 w-4' />
        </Link>
      </div>

      <div className='mt-0 flex flex-col'>
        <video
          autoPlay
          muted
          loop
          playsInline
          className='w-full max-w-4xl rounded-lg border border-zinc-400 p-0.5 shadow-sm dark:border-zinc-800'
          aria-label='Preview Video'
        >
          <source src={videoUrl} type='video/mp4' />
        </video>
      </div>
    </div>
  )
}
