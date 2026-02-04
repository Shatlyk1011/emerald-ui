'use client'

import { Skeleton } from '@/components/ui/skeleton'
import SiteCardsSkeleton from './SiteCards/SiteCardsSkeleton'

export default function InspirationPageSkeleton() {
  return (
    <>
      {/* Filter Section Skeleton */}
      <div className='mb-12'>
        <div className='flex justify-between gap-12'>
          {/* Categories Column */}
          <div className='group flex flex-1 flex-col'>
            <Skeleton className='h-5 w-24 mb-3' />
            <div className='flex flex-wrap gap-2 '>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={`cat-${i}`} className='h-6 w-25 rounded-lg' />
              ))}
            </div>
          </div>

          {/* Styles Column */}
          <div className='group flex flex-1 flex-col'>
            <Skeleton className='h-5 w-24 mb-3' />
            <div className='flex flex-wrap gap-2 '>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={`style-${i}`} className='h-6 w-25 rounded-lg' />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page Title Skeleton */}
      <Skeleton className='h-9 w-80 mb-6' />

      {/* Site Cards Skeleton */}
      <SiteCardsSkeleton />
    </>
  )
}
