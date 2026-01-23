'use client'

import { useState, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { Category, WebsiteStyle } from '@/payload-types'
import { IWebsites } from '@/types/inspiration'
import { useInfiniteInspirationSites } from '@/services/useGetInspirationSites'
import { Where } from 'payload'
import { useAppStore } from '@/store/useAppStore'
import { Switch } from '@/components/ui/switch'
import FilterSection from './FilterSection'
import SiteCards from './SiteCards'
import SiteCardsSkeleton from './SiteCards/SiteCardsSkeleton'
import { debounce } from '@/composables/utils'
import EmptyResult from './SiteCards/EmptyResult'

interface Props {
  initialData: IWebsites
  categories: Category[]
  styles: WebsiteStyle[]
}

export default function InspirationContent({ initialData, categories, styles }: Props) {
  const [filterQuery, setFilterQuery] = useState<Where>({ isVisible: { equals: true } })
  const { isZoomEnabled, toggleZoom } = useAppStore()
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteInspirationSites(initialData, filterQuery)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '160px',
  })

  // Derive loading state from query status
  const isLoading = useMemo(() => isFetching && !isFetchingNextPage, [isFetching, isFetchingNextPage])

  // Fetch next page when the sentinel element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Flatten all pages into a single array
  const allWebsites = data?.pages.flatMap((page) => page.docs) ?? []

  const handleFilterRequest = debounce((query: Where) => setFilterQuery(query), 1000)

  const handleResetFilters = () => {
    setFilterQuery({ isVisible: { equals: true } })
  }

  return (
    <>
      <FilterSection
        categories={categories}
        styles={styles}
        handleFilterRequest={handleFilterRequest}
      />
      
      <div className='flex items-center justify-between mb-6'>
        <h1 className='-tracking-two text-3xl font-semibold'>
          Explore curated websites
        </h1>
        <div className='flex items-center gap-2.5'>
          <label
            htmlFor='zoom-toggle'
            className='text-sm font-medium text-muted-foreground cursor-pointer select-none'
          >
            Image Zoom
          </label>
          <Switch
            id='zoom-toggle'
            checked={isZoomEnabled}
            onCheckedChange={() => toggleZoom()}
          />
        </div>
      </div>

      {isLoading ? (
        <SiteCardsSkeleton />
      ) : allWebsites.length === 0 ? (
          <EmptyResult handleResetFilters={handleResetFilters} />
      ) : (
            <SiteCards websites={allWebsites} />
      )}

      {/* Sentinel element for infinite scroll */}
      {!isLoading && allWebsites.length > 0 && (
        <div ref={ref} className='flex flex-col items-center justify-center py-16'>
          {isFetchingNextPage ? (
            <div className='flex items-center gap-3 text-muted-foreground'>
              <div className='h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
              <span className='text-sm font-medium'>Loading more websites...</span>
            </div>
          ) : !hasNextPage ? (
            <div className='flex flex-col items-center gap-4'>
              <div className='h-0.5 w-24 bg-border' />
              <p className='text-sm font-medium text-muted-foreground'>
                You&apos;ve reached the end of the collection
              </p>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}
