'use client'

/**
 * @author: @emerald-ui
 * @description: Pricing Card From Emerald UI Website
 * @version: 1.0.0
 * @date: 2026-02-03
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

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

const pricingPlans: PricingTier[] = [
  {
    name: 'Starter',
    price: '$9',
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 5 projects',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      'Community access',
    ],
    ctaText: 'Get Started',
    ctaVariant: 'blue',
    featuresIntro: 'Everything in Free, plus:',
    priceDetail: 'per seat/mo',
    isAnnual: true,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Ideal for growing teams and businesses',
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Advanced analytics',
      'Priority email support',
      'Team collaboration',
      'Custom integrations',
      'API access',
    ],
    ctaText: 'Start Free Trial',
    ctaVariant: 'blue',
    featuresIntro: 'Everything in Hobby, plus:',
    priceDetail: 'per seat/mo',
    isAnnual: false,
  },
]

function PricingCard({ item }: PricingCardProps) {
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

export default function PricingSection() {
  const [isAnnual, setAnnual] = useState(false)

  return (
    <section className=''>
      <div className='mb-8 p-5 text-center max-sm:mb-4'>
        <h1 className='mb-2 text-4xl font-bold tracking-tight max-sm:text-2xl'>
          Simple, Transparent Pricing
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg max-sm:text-sm'>
          Choose the perfect plan for your needs. All plans include a 14-day
          free trial.
        </p>
      </div>
      <div className='mb-4 flex items-center justify-center gap-1.5 text-sm font-normal'>
        <span
          className={cn(
            'transition-colors',
            isAnnual && 'text-muted-foreground'
          )}
        >
          Monthly
        </span>
        <Switch
          color='red'
          checked={isAnnual}
          onCheckedChange={(checked) => setAnnual(checked)}
        />
        <p className='relative'>
          <span
            className={cn(
              'transition-colors',
              !isAnnual && 'text-muted-foreground'
            )}
          >
            Annual
          </span>
          <span className='tracking-one absolute top-1/2 left-12.5 w-max -translate-y-1/2 rounded-full bg-blue-400/20 px-1.5 py-0.5 text-xs text-[10px] leading-[1.2] font-medium text-nowrap text-blue-400'>
            Save 20%
          </span>
        </p>
      </div>
      <div className='mx-auto grid h-full max-w-full grid-cols-2 justify-center gap-3 px-10 max-lg:px-0 max-sm:grid-cols-1'>
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} item={plan} />
        ))}
      </div>
    </section>
  )
}
