'use client'

import { useState, useEffect, useMemo } from 'react'
import { debounce } from '@/composables/utils'
import { OpenSourceProject, Media } from '@/payload-types'
import { useInfiniteOpenSourceComponents } from '@/services/useGetOpenSourceComponents'
import { IOpenSourceComponents } from '@/types/open-source'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Where } from 'payload'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { OPEN_SOURCE_FILTER_OPTIONS } from '@/constants/open-source'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Props {
  initialData: IOpenSourceComponents
}

type FilterKey = keyof typeof OPEN_SOURCE_FILTER_OPTIONS

const FILTER_CONFIG: {
  key: FilterKey
  title: string
  options: { label: string; value: string }[]
}[] = [
  {
    key: 'type',
    title: 'Project Type',
    options: OPEN_SOURCE_FILTER_OPTIONS.type,
  },
  { key: 'ui', title: 'UI Framework', options: OPEN_SOURCE_FILTER_OPTIONS.ui },
  { key: 'css', title: 'CSS', options: OPEN_SOURCE_FILTER_OPTIONS.css },
  {
    key: 'cms',
    title: 'CMS / Database',
    options: OPEN_SOURCE_FILTER_OPTIONS.cms,
  },
]

const MOCK_COMPONENTS: OpenSourceProject[] = [
  {
    id: 'mock-1',
    title: 'Modern SaaS Starter',
    description:
      'A comprehensive Next.js boilerplate with Payload CMS, Stripe integration, and authentication pre-configured.',
    author: 'Antigravity',
    linkToRepo: 'https://github.com/example/saas-starter',
    linkToProject: 'https://saas-starter.example.com',
    type: 'blog',
    ui: 'shadcn',
    css: 'tailwind',
    cms: 'payload',
  },
  {
    id: 'mock-2',
    title: 'Developer Portfolio',
    description:
      'Minimal and clean portfolio template for developers. Includes blog, project showcase, and contact form.',
    author: 'John Doe',
    linkToRepo: 'https://github.com/example/portfolio',
    linkToProject: 'https://portfolio.example.com',
    type: 'portfolio',
    ui: 'other',
    css: 'tailwind',
    cms: 'other',
  },
  {
    id: 'mock-3',
    title: 'E-commerce Boilerplate',
    description:
      'A full-featured online store template with Supabase, Tailwind CSS, and Stripe checkout.',
    author: 'Shatlyk',
    linkToRepo: 'https://github.com/example/ecommerce-template',
    linkToProject: 'https://shop.example.com',
    type: 'ecommerce',
    ui: 'shadcn',
    css: 'tailwind',
    cms: 'supabase',
  },
  {
    id: 'mock-4',
    title: 'Admin Dashboard Pro',
    description:
      'Feature-rich admin dashboard with Material UI, Prisma, and advanced data visualization charts.',
    author: 'CreativeDev',
    linkToRepo: 'https://github.com/example/admin-pro',
    linkToProject: 'https://admin.example.com',
    type: 'dashboard',
    ui: 'mui',
    css: 'tailwind',
    cms: 'prisma',
  },
  {
    id: 'mock-5',
    title: 'AI Chatbot UI',
    description:
      'A beautiful chat interface for AI applications. Supports multiple models, streaming responses, and markdown rendering.',
    author: 'AILabs',
    linkToRepo: 'https://github.com/example/ai-chat',
    linkToProject: 'https://chat.example.com',
    type: 'other',
    ui: 'shadcn',
    css: 'tailwind',
  },
]

export default function OpenSourceContent({ initialData }: Props) {
  const [filterQuery, setFilterQuery] = useState<Where | undefined>(undefined)
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterKey, string[]>
  >({
    type: [],
    ui: [],
    css: [],
    cms: [],
  })

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
  })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isInitialLoading,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteOpenSourceComponents(initialData, filterQuery)

  const isLoading = isFetching || isFetchingNextPage

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  const filterQueryFromSelections = useMemo(() => {
    const andQuery: Where[] = []

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        andQuery.push({ [key]: { in: values } })
      }
    })

    return andQuery.length > 0 ? { and: andQuery } : undefined
  }, [selectedFilters])

  const debouncedSetFilterQuery = useMemo(
    () => debounce((query: Where | undefined) => setFilterQuery(query), 800),
    []
  )

  useEffect(() => {
    if (!isLoading) {
      debouncedSetFilterQuery(filterQueryFromSelections)
    }
  }, [filterQueryFromSelections, debouncedSetFilterQuery])

  const handleResetFilters = () => {
    setFilterQuery(undefined)
    setSelectedFilters({
      type: [],
      ui: [],
      css: [],
      cms: [],
    })
  }

  const allComponents = useMemo(() => {
    const fetchedDocs = data?.pages.flatMap((page) => page.docs) || []
    if (filterQuery) return fetchedDocs
    if (fetchedDocs.length === 0) return MOCK_COMPONENTS
    return [...fetchedDocs, ...MOCK_COMPONENTS]
  }, [data, filterQuery])

  const toggleFilter = (key: FilterKey, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl font-bold tracking-tight'>
          Open Source Projects
        </h1>
        <p className='text-muted-foreground text-lg'>
          A curated collection of open source projects and boilerplates to
          jumpstart your next application.
        </p>
      </div>

      <section
        className={cn(
          'transition-opacity duration-300',
          isLoading && 'pointer-events-none opacity-60'
        )}
      >
        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {FILTER_CONFIG.map((config) => (
            <FilterColumn
              key={config.key}
              title={config.title}
              options={config.options}
              selected={selectedFilters[config.key]}
              onToggle={(val) => toggleFilter(config.key, val)}
            />
          ))}
        </div>
      </section>

      {isInitialLoading ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='bg-muted h-96 animate-pulse rounded-xl' />
          ))}
        </div>
      ) : (
        <section className='relative'>
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

          {allComponents && allComponents.length > 0 ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {allComponents.map((component) => (
                <div
                  key={component.id}
                  className='group border-border bg-card hover:border-primary/50 flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md'
                >
                  <div className='bg-muted/50 relative aspect-video w-full overflow-hidden'>
                    {component.imgUrl ? (
                      <img
                        src={component.imgUrl}
                        alt={component.title}
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    ) : (
                      <div className='flex h-full items-center justify-center'>
                        <div className='text-muted-foreground/20 text-4xl font-bold select-none'>
                          {component.title.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='flex grow flex-col p-6'>
                    <div className='mb-4'>
                      <h3
                        className='mb-2 line-clamp-1 text-xl font-semibold'
                        title={component.title}
                      >
                        {component.title}
                      </h3>
                      <p className='text-muted-foreground line-clamp-2 min-h-[2.5rem] text-sm'>
                        {component.description}
                      </p>
                    </div>

                    <div className='mb-6 flex flex-wrap gap-2'>
                      <CustomBadge>{component.type}</CustomBadge>
                      <CustomBadge>{component.ui}</CustomBadge>
                      <CustomBadge>{component.css}</CustomBadge>
                      <CustomBadge>{component.cms}</CustomBadge>
                    </div>

                    <div className='border-border mt-auto flex items-center justify-between border-t pt-6'>
                      <div className='text-muted-foreground text-sm'>
                        By{' '}
                        <span className='text-foreground font-medium'>
                          {component.author}
                        </span>
                      </div>
                      <div className='flex gap-3'>
                        {component.linkToProject && (
                          <Link
                            href={component.linkToProject}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-primary p-1 transition-colors'
                            title='Live Preview'
                          >
                            <ExternalLink className='h-5 w-5' />
                          </Link>
                        )}
                        <Link
                          href={component.linkToRepo}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-muted-foreground hover:text-primary p-1 transition-colors'
                          title='View Source'
                        >
                          <Github className='h-5 w-5' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='py-20 text-center'>
              <h3 className='mb-2 text-lg font-medium'>No projects found</h3>
              <p className='text-muted-foreground mb-6'>
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <Button onClick={handleResetFilters} variant='secondary'>
                Reset Filters
              </Button>
            </div>
          )}
        </section>
      )}

      <div ref={ref} className='flex flex-col items-center justify-center py-8'>
        {isFetchingNextPage && (
          <div className='text-muted-foreground flex items-center gap-3'>
            <div className='border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent' />
            <span className='text-sm font-medium'>
              Loading more projects...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterColumn({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: { label: string; value: string }[]
  selected: string[]
  onToggle: (val: string) => void
}) {
  const isSelected = selected.length > 0

  return (
    <div className='group flex flex-col'>
      <h4
        className={cn(
          'tracking-three mb-3 text-sm font-medium uppercase transition-colors ease-in-out',
          isSelected && 'text-muted-foreground'
        )}
      >
        {title}
      </h4>
      <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-1 text-base font-normal'>
        {options.map(({ value, label }) => {
          const isActive = selected.includes(value)
          return (
            <li
              key={value}
              className={cn(
                'hover:text-foreground text-muted-foreground max-h-max rounded-md px-[5px] py-[3px] leading-none ring ring-transparent transition-all',
                isActive && 'text-foreground! bg-card ring-primary/30',
                isSelected
                  ? 'text-muted-foreground'
                  : 'group-hover:text-muted-foreground'
              )}
            >
              <button
                className='-tracking-one text-left transition-colors ease-in-out'
                onClick={() => onToggle(value)}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function CustomBadge({ children }: { children: React.ReactNode }) {
  if (!children) return null
  return (
    <Badge
      variant='outline'
      className='bg-muted/30 text-sm font-normal capitalize'
    >
      {children}
    </Badge>
  )
}
