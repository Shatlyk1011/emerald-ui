import { CheckCircle, Construction, Hammer, LucideConstruction } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export interface PricingTier {
  name: 'Starter' | 'Pro' | 'Enterprise'
  description: string
  price: string
  priceYearly: string
  priceDetail?: string
  ctaText: string
  ctaVariant: 'blue' | 'black'
  featuresIntro?: string
  features: string[]
}
interface PricingCardProps {
  item: PricingTier
  isAnnual: boolean
  classes?: string
}
const getPricingLabel = (s: string) => {
  return s.toLowerCase() === 'custom' ? s : `$${s}`

}
export function PricingCard({ item, isAnnual, classes }: PricingCardProps) {
  const isEnterprice = item.name === 'Enterprise'

  return (
    <div className={cn('relative overflow-hidden border-border bg-background flex w-full flex-col rounded-xl border p-7 shadow-sm transition-shadow hover:shadow-md', classes, isEnterprice && "max-md:hidden")}>
      <div className='mb-4 min-h-22'>
        <h3 className='text-foreground text-2xl font-semibold'>{item.name}</h3>
        <p className='text-foreground/70 mt-2 line-clamp-2 text-base'>
          {item.description}
        </p>
      </div>

      <div className='mb-6'>
        <div className='flex items-end'>
          <span className='-tracking-two font-mono text-3xl leading-8 font-medium'>
            {isAnnual ? getPricingLabel(item.priceYearly) : getPricingLabel(item.price)}
          </span>

          {item.priceDetail && (
            <span className='text-muted-foreground ml-2 max-w-20 text-xs leading-tight'>
              {isAnnual && (
                <span>
                  billed annually <br />
                </span>
              )}
              {item.priceDetail}
            </span>
          )}
        </div>
      </div>

      <Button
        className={cn(
          'w-full text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
          'bg-foreground text-background hover:bg-foreground/80'
        )}
      >
        {item.ctaText}
      </Button>

      <div className='mt-8 flex flex-1 flex-col'>
        <p className='text-foreground/80 mb-4 text-sm font-medium'>
          {item.featuresIntro}
        </p>
        <ul className='space-y-3'>
          {item.features.map((feature) => (
            <li key={feature} className='flex items-start gap-2'>
              {!isEnterprice && (
                <CheckCircle
                  className='text-muted-foreground h-4 w-4'
                  aria-hidden='true'
                />
              )}
              <span className='text-foreground/70 text-sm'>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {isEnterprice && (
        // overlay
        <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full bg-background/70 z-[10200]'>
          <div className='-bottom-16 relative flex flex-col items-center text-neutral-500'>
            <Hammer size={28} className='mb-2' />
            <span className='text-sm text-center gap-1 font-medium tracking-one'>Enterprice API <br /> Under Development <br /> </span>
          </div>
        </div>
      )}
    </div>
  )
}
