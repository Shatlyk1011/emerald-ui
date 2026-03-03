'use client'

import { useState, useEffect, useMemo } from 'react'
import { debounce } from '@/composables/utils'
import { Category, WebsiteStyle } from '@/payload-types'
import { useInfiniteInspirationSites } from '@/services/useGetInspirationSites'
import { IWebsites } from '@/types/inspiration'
import { Where } from 'payload'
import { useInView } from 'react-intersection-observer'
import Hero from '../landing/Hero'
import FilterSection from './FilterSection'
import SiteCards from './SiteCards'
import SiteCardsSkeleton from './SiteCards/SiteCardsSkeleton'

interface Props {
  categories: Category[]
  styles: WebsiteStyle[]
  initialData: IWebsites
}

export default function InspirationContent({
  categories,
  styles,
  initialData,
}: Props) {
  const [filterQuery, setFilterQuery] = useState<Where>({
    isVisible: { equals: true },
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
  })

  const { data, fetchNextPage, hasNextPage, isLoading: isInitialLoading, isFetchingNextPage, isFetching } =
    useInfiniteInspirationSites(initialData, filterQuery)

  const images = initialData.docs
    .map(({ imgUrl }) => imgUrl)
    .filter(Boolean) as string[]

  const isLoading = isFetching || isFetchingNextPage

  // Fetch next page when the sentinel element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  // Build filter query from selected categories and styles
  const filterQueryFromSelections = useMemo(() => {
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
            in: selectedStyles.map((item) => item.toLowerCase()),
          },
        },
      ],
    }
    return query
  }, [selectedCategories, selectedStyles])

  // Create debounced setFilterQuery function (memoized to maintain stable reference)
  const debouncedSetFilterQuery = useMemo(
    () => debounce((query: Where) => setFilterQuery(query), 800),
    []
  )

  console.log('data.pages.length', data.pages)

  // Update filter query when selections change (with debounce)
  useEffect(() => {
    if (filterQueryFromSelections && !isLoading) {
      debouncedSetFilterQuery(filterQueryFromSelections)
    }
  }, [
    filterQueryFromSelections,
    debouncedSetFilterQuery,
    selectedCategories,
    selectedStyles,
  ])

  const handleResetFilters = () => {
    setFilterQuery({ isVisible: { equals: true } })
    setSelectedCategories([])
    setSelectedStyles([])
  }

  return (
    <>
      <Hero images={images} totalDocs={initialData.totalDocs} />

      <FilterSection
        categories={categories}
        styles={styles}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
        isLoading={isLoading}
      />

      {isInitialLoading ? (
        <SiteCardsSkeleton />
      ) : (
        <div className='relative'>
          {/* Loading overlay shown when refetching with existing results */}
          {isFetching && !isFetchingNextPage && (
            <div className='bg-background/60 absolute inset-0 z-10 flex items-start justify-center rounded-xl pt-24 backdrop-blur-[2px]'>
              <div className='border-border bg-card flex items-center gap-3 rounded-full border px-5 py-3 shadow-lg'>
                <div className='border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
                <span className='text-muted-foreground text-sm font-medium'>
                  Loading...
                </span>
              </div>
            </div>
          )}
          {data.pages.map(({ docs }, i) => (
            <SiteCards
              key={i}
              websites={docs}
              handleResetFilters={handleResetFilters}
            />
          ))}
        </div>
      )}

      {/* Sentinel element for infinite scroll */}
      <div
        ref={ref}
        className='flex flex-col items-center justify-center py-16'
      >
        {isFetchingNextPage ? (
          <div className='text-muted-foreground flex items-center gap-3'>
            <div className='border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent' />
            <span className='text-sm font-medium'>
              Loading more websites...
            </span>
          </div>
        ) : !hasNextPage &&
          data.pages.flatMap((page) => page.docs).length > 0 ? (
          <div className='flex flex-col items-center gap-4'>
            <div className='bg-border h-0.5 w-24' />
            <p className='text-muted-foreground text-sm font-medium'>
              You&apos;ve reached the end of the collection
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}
