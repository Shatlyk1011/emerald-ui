'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Category, WebsiteStyle } from '@/payload-types'
import { IWebsites } from '@/types/inspiration'
import { useInfiniteInspirationSites } from '@/services/useGetInspirationSites'
import { Where } from 'payload'
import FilterSection from './FilterSection'
import SiteCards from './SiteCards'

interface Props {
  initialData: IWebsites
  categories: Category[]
  styles: WebsiteStyle[]
}

export default function InspirationContent({ initialData, categories, styles }: Props) {
  const [filterQuery, setFilterQuery] = useState<Where>({ isVisible: { equals: true } })
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteInspirationSites(initialData, filterQuery)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  // Fetch next page when the sentinel element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Flatten all pages into a single array
  const allWebsites = data?.pages.flatMap((page) => page.docs) ?? []

  const handleFilterRequest = (query: Where) => {
    setFilterQuery(query)
  }

  return (
    <>
      <FilterSection
        categories={categories}
        styles={styles}
        handleFilterRequest={handleFilterRequest}
      />
      
      <h1 className='-tracking-two mb-6 text-3xl font-semibold'>
        Explore curated websites
      </h1>

      <SiteCards websites={allWebsites} />

      {/* Sentinel element for infinite scroll */}
      <div ref={ref} className='flex flex-col items-center justify-center py-16'>
        {isFetchingNextPage ? (
          <div className='flex items-center gap-3 text-muted-foreground'>
            <div className='h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            <span className='text-sm font-medium'>Loading more websites...</span>
          </div>
        ) : !hasNextPage && allWebsites.length > 0 ? (
          <div className='flex flex-col items-center gap-4'>
            <div className='h-0.5 w-24 bg-border' />
            <p className='text-sm font-medium text-muted-foreground'>
              You&apos;ve reached the end of the collection
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}
