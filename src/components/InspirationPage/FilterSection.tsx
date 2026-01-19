import { cn } from '@/lib/utils'
import { Category, WebsiteStyle } from '../../../payload-types'

interface FilterSectionProps {
  categories: Category[]
  styles: WebsiteStyle[]
}

function FilterSection({ categories, styles }: FilterSectionProps) {
  return (
    <div className='mb-20'>
      <div className='flex gap-12 justify-between'>
        <div className='flex-1 flex flex-col group'>
          <h3 className='tracking-four mb-4 text-sm group-hover:text-foreground transition-colors ease-in-out font-medium uppercase text-muted-foreground'>
            Categories
          </h3>
          <ul className='flex -ml-1 flex-1 place-content-start h-max flex-wrap gap-x-2 gap-y-1 text-base capitalize font-normal'>
            {categories.map((item, i) => (
              <li key={item.id} className={cn('max-h-max px-1.5 py-1 group-hover:text-muted-foreground hover:text-foreground rounded-lg leading-none ring ring-transparent ', (i === 3 || i === 2) && "ring-current text-foreground! bg-card")}>
                <button className='capitalize -tracking-one transition-colors ease-in-out'>
                  {item.category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex-1 flex flex-col group'>
          <h3 className='tracking-four mb-4 text-sm font-medium group-hover:text-foreground transition-colors ease-in-out uppercase text-muted-foreground'>
            Styles
          </h3>
          <ul className='flex -ml-1 flex-1 place-content-start h-max flex-wrap gap-x-2 gap-y-1 text-base capitalize font-normal'>
            {styles.map((item, i) => (
              <li key={item.id} className={cn('max-h-max px-1.5 py-1 group-hover:text-muted-foreground hover:text-foreground rounded-lg leading-none ring ring-transparent ', (i === 0 || i === 4) && "ring-current text-foreground! bg-card")} >
                <button className='capitalize -tracking-one transition-colors ease-in-out'>
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
