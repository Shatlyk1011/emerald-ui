import { CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
export interface PricingTier {
  name: string
  description: string
  price: string
  priceDetail?: string
  ctaText: string
  ctaVariant: 'blue' | 'black'
  featuresIntro: string
  features: string[]
  isAnnual?:boolean
}
interface PricingCardProps {
  item: PricingTier
}
export function PricingCard({ item }: PricingCardProps) {
  const isBlue = item.ctaVariant === 'blue'
  
  return (
    <div className="flex flex-col w-full rounded-xl border border-border bg-background p-7 shadow-sm hover:shadow-md transition-shadow">
      <div className="min-h-22 mb-4">
        <h3 className="text-2xl font-semibold text-foreground">{item.name}</h3>
        <p className="mt-2 text-base text-foreground/80 line-clamp-2">
          {item.description}
        </p>
      </div>

      <div className="mb-6 ">
        <div className="flex items-end">
          <span className="text-3xl leading-8 font-mono -tracking-two font-medium ">
            {item.price}
          </span>
          
          {item.priceDetail && (
            <span className="ml-2 text-xs text-muted-foreground max-w-[80px] leading-tight">
              {item.isAnnual && (
                <span>billed annually <br/></span>
              )}
              {item.priceDetail}
            </span>
          )}
        </div>
      </div>

      <Button className={cn(`w-full text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors`, isBlue ? 'bg-blue-700 hover:bg-blue-700/90' : 'bg-foreground text-background') }
      >
        {item.ctaText}
      </Button>

      <div className="mt-8 flex flex-1 flex-col">
        <p className="text-sm text-foreground/80 font-medium mb-4">{item.featuresIntro}</p>
        <ul className="space-y-3 ">
          {item.features.map((feature) => (
            <li key={feature} className="flex gap-2 items-start">
              <CheckCircle
                className="h-4 w-4 text-emerald-700"
                aria-hidden="true"
              />
              <span className="text-sm text-foreground/70">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
