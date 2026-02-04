'use client'

import { useState, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { Category, WebsiteStyle } from '@/payload-types'
import { IWebsites } from '@/types/inspiration'
import { useInfiniteInspirationSites } from '@/services/useGetInspirationSites'
import { Where } from 'payload'
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  
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
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  // Flatten all pages into a single array
  const allWebsites = data?.pages.flatMap((page) => page.docs) ?? []

  // Build filter query from selected categories and styles
  const filterQueryFromSelections = useMemo(() => {
    if (!mounted) {
      // eslint-disable-next-line react-hooks/set-state-in-render
      setMounted(true)
      return
    }
    const query: Where = {
      and: [
        {
          isVisible: {
            equals: true,
          },
        },
        {
          category: {
            in: selectedCategories.map((item) => item.toLowerCase()),
          },
        },
        {
          style: {
            in: selectedStyles.map((item) => item.toLowerCase())
          }
        }
      ]
    }
    return query
  }, [selectedCategories, selectedStyles])

  // Create debounced setFilterQuery function (memoized to maintain stable reference)
  const debouncedSetFilterQuery = useMemo(
    () => debounce((query: Where) => setFilterQuery(query), 1000),
    []
  )

  // Update filter query when selections change (with debounce)
  useEffect(() => {
    if (filterQueryFromSelections) {
      debouncedSetFilterQuery(filterQueryFromSelections)
    }
  }, [filterQueryFromSelections, debouncedSetFilterQuery])

  const handleResetFilters = () => {
    setFilterQuery({ isVisible: { equals: true } })
    setSelectedCategories([])
    setSelectedStyles([])
  }

  return (
    <>
      <FilterSection
        categories={categories}
        styles={styles}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
      />
      
      <h1 className='-tracking-two text-3xl font-semibold mb-6'>
        Explore curated websites
      </h1>

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
