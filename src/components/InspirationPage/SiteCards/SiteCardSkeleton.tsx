import { Skeleton } from '@/components/ui/skeleton'

export default function SiteCardSkeleton() {
  return (
    <div className='relative flex flex-col gap-3'>
      <div className='relative rounded-xl border px-8 py-16 shadow-lg bg-muted/20'>
        <div className='relative aspect-4/3 w-full overflow-hidden'>
          <Skeleton className='absolute inset-0 rounded-lg' />
        </div>
      </div>

      {/* Card Footer */}
      <div className='flex items-start gap-3 px-1'>
        <Skeleton className='h-8 w-8 shrink-0 rounded-md' />
        <div className='flex flex-1 flex-col gap-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-full' />
        </div>
      </div>
    </div>
  )
}
