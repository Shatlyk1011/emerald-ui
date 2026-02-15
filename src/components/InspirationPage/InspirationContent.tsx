'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { debounce } from '@/composables/utils'
import { Category, WebsiteStyle, InspirationWebsite } from '@/payload-types'
import { useInfiniteInspirationSites } from '@/services/useGetInspirationSites'
import dynamic from 'next/dynamic'
import { Where } from 'payload'
import { useInView } from 'react-intersection-observer'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import ThreeDMarquee from '../ui/3d-marquee'
import { Button } from '../ui/button'
import FilterSection from './FilterSection'
import SiteCards from './SiteCards'
import EmptyResult from './SiteCards/EmptyResult'
import SiteCardsSkeleton from './SiteCards/SiteCardsSkeleton'

const SubmitWebsiteDialog = dynamic(() => import('./SubmitWebsiteDialog'), {
  ssr: false,
})

interface Props {
  categories: Category[]
  styles: WebsiteStyle[]
}
// USE IDB AS DEFAULT BUT FETCH ANYWAY

export default function InspirationContent({
  categories,
  styles,
}: Props) {
  const [filterQuery, setFilterQuery] = useState<Where>({
    isVisible: { equals: true },
  })

  // ... (existing state)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '160px',
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteInspirationSites(undefined, filterQuery)


  const isLoading = isFetching || isFetchingNextPage

  // Fetch next page when the sentinel element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  // Flatten all pages into a single array
  const allWebsites = data?.pages.flatMap((page) => page.docs) ?? []

  // Calculate totalDocs and images if not provided (from client data)
  const currentTotalDocs = data?.pages[0]?.totalDocs || 0
  const currentImages = allWebsites.map((i: InspirationWebsite) => i.imgUrl).filter(Boolean) as string[]

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
            in: selectedStyles.map((item) => item.toLowerCase()),
          },
        },
      ],
    }
    return query
  }, [selectedCategories, selectedStyles, mounted])

  // Create debounced setFilterQuery function (memoized to maintain stable reference)
  const debouncedSetFilterQuery = useMemo(
    () => debounce((query: Where) => setFilterQuery(query), 800),
    []
  )

  // Update filter query when selections change (with debounce)
  useEffect(() => {
    if (filterQueryFromSelections && mounted && selectedCategories.length) {
      debouncedSetFilterQuery(filterQueryFromSelections)
    }
  }, [filterQueryFromSelections, debouncedSetFilterQuery, mounted])

  const handleResetFilters = () => {
    setFilterQuery({ isVisible: { equals: true } })
    setSelectedCategories([])
    setSelectedStyles([])
  }

  return (
    <>
      <section className='mb-10 flex items-center justify-between gap-10 px-20 py-10 max-2xl:px-6 max-xl:flex-col max-xl:items-start max-xl:px-0 max-lg:py-6 max-sm:mb-6'>
        <div className='relative flex w-full flex-3 flex-col items-start bg-cyan-50/0'>
          <NewsletterSubscribe />
          <h1 className='-tracking-two mb-2 text-5xl font-semibold'>
            Node Inspiration <br className='hidden max-lg:block' /> Websites (
            {currentTotalDocs})
          </h1>
          <div className='text-muted-foreground text-lg'>
            <p className='mb-2'>
              Explore selected websites for your next design.
            </p>
            <Button
              className='mt-1 text-sm'
              // size="sm"
              onClick={() => setIsDialogOpen(true)}
            >
              Submit your website
            </Button>
          </div>
        </div>
        <div className='flex-5 max-xl:w-full max-xl:flex-auto'>
          <ThreeDMarquee images={currentImages.slice(0, 12)} />
        </div>
      </section>

      <FilterSection
        categories={categories}
        styles={styles}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
      />

      {isLoading && allWebsites.length === 0 ? (
        <SiteCardsSkeleton />
      ) : allWebsites.length === 0 ? (
        <EmptyResult handleResetFilters={handleResetFilters} />
      ) : (
        <SiteCards websites={allWebsites} />
      )}

      {/* Sentinel element for infinite scroll */}
      {!isLoading && allWebsites.length > 0 && (
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
          ) : !hasNextPage ? (
            <div className='flex flex-col items-center gap-4'>
              <div className='bg-border h-0.5 w-24' />
              <p className='text-muted-foreground text-sm font-medium'>
                You&apos;ve reached the end of the collection
              </p>
            </div>
          ) : null}
        </div>
      )}
      <Suspense fallback={null}>
        {isDialogOpen && (
          <SubmitWebsiteDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        )}
      </Suspense>
    </>
  )
}
