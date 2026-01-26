'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, Suspense } from 'react'

import { cn } from '@/lib/utils'
import { Category, WebsiteStyle } from '@/payload-types'
import { Input } from '../ui/input'
import { Where } from 'payload'
import { useAppStore } from '@/store/useAppStore'

// Lazy load the dialog for better performance
const SitePreviewDialog = dynamic(() => import('./SitePreviewDialog'), {
  ssr: false
})

interface FilterSectionProps {
  categories: Category[]
  styles: WebsiteStyle[]
  handleFilterRequest: (query: Where) => void;
}

function FilterSection({ categories, styles, handleFilterRequest }: FilterSectionProps) {
  const isFirstRender = useRef(true);
  const { closeSiteDialog } = useAppStore()

  const [search, setSearch] = useState('')
  const [selectedCategories, setCategories] = useState<string[]>([])
  const [selectedStyles, setStyles] = useState<string[]>([])

  const isCategorySelected = selectedCategories.length > 0
  const isStyleSelected = selectedStyles.length > 0

  const toggleCategory = (c: string) => {
    if (selectedCategories.includes(c)) {
      setCategories((prev) => prev.filter((item) => item !== c))
    } else {
      setCategories((prev) => ([...prev, c]))
    }
  }

  const toggleStyle = (s: string) => {
    if (selectedStyles.includes(s)) {
      setStyles((prev) => prev.filter((item) => item !== s))
    } else {
      setStyles((prev) => ([...prev, s]))
    }
  }

  // Handlers for dialog filter clicks
  const handleDialogCategoryClick = (category: string) => {
    closeSiteDialog()
    setCategories([category])
    setSearch('')
  }

  useEffect(() => {
    // Skip the filter request on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const query: Where = {
      and: [
        {
          // search
          title: {
            contains: search,
          },
        },
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
    };
    handleFilterRequest(query);
  }, [search, selectedCategories, selectedStyles])

  return (
    <div className='mb-12'>
      <div className='flex justify-between gap-12'>
        {/* Search Column */}
        <div className='group flex flex-1 flex-col'>
          <label className='tracking-four group-hover:text-foreground text-muted-foreground mb-3 text-sm font-medium uppercase transition-colors ease-in-out'>
            Search
          </label>
          <Input value={search} onChange={(e) => setSearch(e.currentTarget.value)} placeholder='Type url or website name' className='h-11' />
        </div>

        {/* Categories Column */}
        <div className='group flex flex-1 flex-col'>
          <h3 className={cn('tracking-three text-muted-foreground mb-3 text-sm font-medium uppercase transition-colors ease-in-out', isCategorySelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground')}>
            Categories
          </h3>
          <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-x-2 gap-y-1 text-base font-normal '>
            {categories.map(({ value, category }) => {
              const isActive = selectedCategories.some(c => c == value)
              return (
                <li
                  key={category}
                  className={cn(
                    'hover:text-foreground max-h-max rounded-lg px-1.5 py-1 leading-none ring ring-transparent',
                    isActive && 'text-foreground! bg-card ring-current ', isCategorySelected ? "text-muted-foreground" : "group-hover:text-muted-foreground "
                  )}
                >
                  <button className='-tracking-one transition-colors ease-in-out ' onClick={() => toggleCategory(value)}>
                    {category}
                  </button>
                </li>
              )
            }
            )}
          </ul>
        </div>

        {/* Styles Column */}
        <div className='group flex flex-1 flex-col'>
          <h3 className={cn('tracking-three mb-3 text-sm font-medium uppercase transition-colors ease-in-out', isStyleSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground')}>
            Styles
          </h3>
          <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-x-2 gap-y-1 text-base font-normal capitalize'>
            {styles.map((item) => {
              const isActive = selectedStyles.some(s => s == item.style)

              return (
                <li
                  key={item.id}
                  className={cn(
                    'hover:text-foreground max-h-max rounded-lg px-1.5 py-1 leading-none ring ring-transparent',
                    isActive && 'text-foreground! bg-card ring-current', isStyleSelected ? "text-muted-foreground" : "group-hover:text-muted-foreground "
                  )}
                >
                  <button className='-tracking-one capitalize transition-colors ease-in-out' onClick={() => toggleStyle(item.style)}>
                    {item.style}
                  </button>
                </li>
              )
            }
            )}
          </ul>
        </div>
      </div>

      {/* Lazy-loaded Site Preview Dialog */}
      <Suspense fallback={null}>
        <SitePreviewDialog onCategoryClick={handleDialogCategoryClick} />
      </Suspense>
    </div>
  )
}

export default FilterSection
