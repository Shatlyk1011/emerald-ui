'use client'

import { Skeleton } from '@/components/ui/skeleton'
import SiteCardsSkeleton from './SiteCards/SiteCardsSkeleton'

export default function InspirationPageSkeleton() {
  return (
    <>
      <section className='mb-10 flex items-center justify-between gap-10 px-20 py-10 max-2xl:px-6 max-xl:flex-col max-xl:items-start max-xl:px-0 max-lg:py-6'>
        <div className='relative flex w-full flex-3 flex-col items-start'>
          <Skeleton className='absolute -top-8 left-0 mb-2 h-4 w-40' />
          <Skeleton className='mb-2 h-12 w-96 max-lg:w-full' />
          <div className='space-y-2'>
            <Skeleton className='h-5 w-80 max-lg:w-full' />
            <Skeleton className='h-5 w-40' />
          </div>
        </div>
        <div className='flex-5 max-xl:w-full max-xl:flex-auto'>
          <Skeleton className='h-60 w-full rounded-lg' />
        </div>
      </section>

      <div className='mb-12'>
        <div className='flex justify-between gap-12'>
          <div className='group flex flex-1 flex-col'>
            <Skeleton className='mb-3 h-5 w-24' />
            <div className='flex flex-wrap gap-2'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={`cat-${i}`} className='h-6 w-25 rounded-lg' />
              ))}
            </div>
          </div>

          <div className='group flex flex-1 flex-col'>
            <Skeleton className='mb-3 h-5 w-24' />
            <div className='flex flex-wrap gap-2'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={`style-${i}`} className='h-6 w-25 rounded-lg' />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SiteCardsSkeleton />
    </>
  )
}
