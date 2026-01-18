'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Switch } from '../ui/switch'
import { PricingCard, PricingTier } from './PricingCard'

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
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom SLA',
      'Advanced security',
      'On-premise deployment',
    ],
    ctaText: 'Contact Sales',
    ctaVariant: 'black',
    featuresIntro: 'Everything in Pro, plus:',
    isAnnual: true,
  },
]

// interface Props {};

const PricingSection = () => {
  const [isAnnual, setAnnual] = useState(true)

  return (
    <>
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
          className='bg-red-500'
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

      <section className='mx-auto grid h-full max-w-full grid-cols-3 justify-center gap-3 px-10 max-lg:px-0'>
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} item={plan} />
        ))}
      </section>
    </>
  )
}
export default PricingSection
