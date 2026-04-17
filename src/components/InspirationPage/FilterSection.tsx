'use client'
import { Suspense } from 'react'
import { Category, WebsiteStyle } from '@/payload-types'
import { useAppStore } from '@/store/useAppStore'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// Lazy load the dialog for better performance
const SitePreviewDialog = dynamic(() => import('./SitePreviewDialog'), {
  ssr: false,
})

interface FilterSectionProps {
  categories: Category[]
  styles: WebsiteStyle[]
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  selectedStyles: string[]
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>
  isLoading?: boolean
}

function FilterSection({
  categories,
  styles,
  selectedCategories,
  setSelectedCategories,
  selectedStyles,
  setSelectedStyles,
  isLoading,
}: FilterSectionProps) {
  const { closeSiteDialog } = useAppStore()

  const isCategorySelected = selectedCategories.length > 0
  const isStyleSelected = selectedStyles.length > 0

  const toggleCategory = (c: string) => {
    if (selectedCategories.includes(c)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== c))
    } else {
      setSelectedCategories((prev) => [...prev, c])
    }
  }

  const toggleStyle = (s: string) => {
    if (selectedStyles.includes(s)) {
      setSelectedStyles((prev) => prev.filter((item) => item !== s))
    } else {
      setSelectedStyles((prev) => [...prev, s])
    }
  }

  // Handlers for dialog filter clicks
  const handleDialogCategoryClick = (category: string) => {
    closeSiteDialog()
    setSelectedCategories([category])
  }

  return (
    <section
      id='website-inspirations'
      className={cn(
        'mb-12 pt-20 transition-opacity duration-300 max-xl:pt-12 max-md:pt-8',
        isLoading && 'pointer-events-none opacity-60'
      )}
    >
      <div className='flex gap-12 max-md:flex-col max-md:gap-8'>
        <div className='group flex max-w-md flex-1 flex-col'>
          <h4
            className={cn(
              'tracking-three mb-3 text-xs font-medium uppercase transition-colors ease-in-out',
              isCategorySelected && 'text-muted-foreground'
            )}
          >
            Categories
          </h4>
          <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-x-1 gap-y-1 text-sm font-normal'>
            {categories.map(({ value, category }) => {
              const isActive = selectedCategories.some((c) => c == value)
              return (
                <li
                  key={category}
                  className={cn(
                    'hover:text-foreground text-muted-foreground max-h-max rounded-md px-[5px] py-[3px] leading-none ring ring-transparent',
                    isActive && 'text-foreground! bg-card ring-current',
                    isCategorySelected
                      ? 'text-muted-foreground'
                      : 'group-hover:text-muted-foreground'
                  )}
                >
                  <button
                    className='-tracking-one transition-colors ease-in-out'
                    onClick={() => toggleCategory(value)}
                    disabled={isLoading}
                  >
                    {category}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Styles Column */}
        <div className='group flex max-w-md flex-1 flex-col'>
          <h3
            className={cn(
              'tracking-three mb-3 text-xs font-medium uppercase transition-colors ease-in-out',
              isStyleSelected && 'text-muted-foreground'
            )}
          >
            Styles
          </h3>
          <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-x-1 gap-y-1 text-sm font-normal capitalize'>
            {styles.map((item) => {
              const isActive = selectedStyles.some((s) => s == item.style)

              return (
                <li
                  key={item.id}
                  className={cn(
                    'hover:text-foreground text-muted-foreground max-h-max rounded-md px-[5px] py-[3px] leading-none ring ring-transparent',
                    isActive && 'text-foreground! bg-card ring-current',
                    isStyleSelected
                      ? 'text-muted-foreground'
                      : 'group-hover:text-muted-foreground'
                  )}
                >
                  <button
                    className='-tracking-one capitalize transition-colors ease-in-out'
                    onClick={() => toggleStyle(item.style)}
                    disabled={isLoading}
                  >
                    {item.style}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Lazy-loaded Site Preview Dialog */}
      <Suspense fallback={null}>
        <SitePreviewDialog onCategoryClick={handleDialogCategoryClick} />
      </Suspense>
    </section>
  )
}

export default FilterSection
