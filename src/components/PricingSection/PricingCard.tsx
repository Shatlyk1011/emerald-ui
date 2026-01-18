import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export interface PricingTier {
  name: string
  description: string
  price: string
  priceDetail?: string
  ctaText: string
  ctaVariant: 'blue' | 'black'
  featuresIntro: string
  features: string[]
  isAnnual?: boolean
}
interface PricingCardProps {
  item: PricingTier
}
export function PricingCard({ item }: PricingCardProps) {
  return (
    <div className='border-border bg-background flex w-full flex-col rounded-xl border p-7 shadow-sm transition-shadow hover:shadow-md'>
      <div className='mb-4 min-h-22'>
        <h3 className='text-foreground text-2xl font-semibold'>{item.name}</h3>
        <p className='text-foreground/70 mt-2 line-clamp-2 text-base'>
          {item.description}
        </p>
      </div>

      <div className='mb-6'>
        <div className='flex items-end'>
          <span className='-tracking-two font-mono text-3xl leading-8 font-medium'>
            {item.price}
          </span>

          {item.priceDetail && (
            <span className='text-muted-foreground ml-2 max-w-[80px] text-xs leading-tight'>
              {item.isAnnual && (
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
              <CheckCircle
                className='text-muted-foreground h-4 w-4'
                aria-hidden='true'
              />
              <span className='text-foreground/70 text-sm'>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
