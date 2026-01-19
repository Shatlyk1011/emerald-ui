import { Category, WebsiteStyle } from '@/payload-types'
import { cn } from '@/lib/utils'

interface FilterSectionProps {
  categories: Category[]
  styles: WebsiteStyle[]
}

function FilterSection({ categories, styles }: FilterSectionProps) {
  return (
    <div className='mb-20'>
      <div className='flex justify-between gap-12'>
        <div className='group flex flex-1 flex-col'>
          <h3 className='tracking-four group-hover:text-foreground text-muted-foreground mb-4 text-sm font-medium uppercase transition-colors ease-in-out'>
            Categories
          </h3>
          <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-x-2 gap-y-1 text-base font-normal capitalize'>
            {categories.map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  'group-hover:text-muted-foreground hover:text-foreground max-h-max rounded-lg px-1.5 py-1 leading-none ring ring-transparent',
                  (i === 3 || i === 2) &&
                    'text-foreground! bg-card ring-current'
                )}
              >
                <button className='-tracking-one capitalize transition-colors ease-in-out'>
                  {item.category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='group flex flex-1 flex-col'>
          <h3 className='tracking-four group-hover:text-foreground text-muted-foreground mb-4 text-sm font-medium uppercase transition-colors ease-in-out'>
            Styles
          </h3>
          <ul className='-ml-1 flex h-max flex-1 flex-wrap place-content-start gap-x-2 gap-y-1 text-base font-normal capitalize'>
            {styles.map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  'group-hover:text-muted-foreground hover:text-foreground max-h-max rounded-lg px-1.5 py-1 leading-none ring ring-transparent',
                  (i === 0 || i === 4) &&
                    'text-foreground! bg-card ring-current'
                )}
              >
                <button className='-tracking-one capitalize transition-colors ease-in-out'>
                  {item.style}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
