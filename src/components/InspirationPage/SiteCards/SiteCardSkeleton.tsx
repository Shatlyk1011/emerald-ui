import { Skeleton } from '@/components/ui/skeleton'

export default function SiteCardSkeleton() {
  return (
    <div className='relative flex flex-col gap-3'>
      <div className='bg-muted/20 relative rounded-xl border px-8 py-16 shadow-lg'>
        <div className='relative aspect-4/3 w-full overflow-hidden'>
          <Skeleton className='absolute inset-0 rounded-lg' />
        </div>
      </div>

      {/* Card Footer */}
      <div className='flex items-center gap-3 px-1'>
        <Skeleton className='h-8 w-8 shrink-0 rounded-md' />
        <Skeleton className='h-6 w-3/4' />
      </div>
    </div>
  )
}
