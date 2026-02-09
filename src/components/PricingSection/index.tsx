'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Switch } from '../ui/switch'
import { PricingCard, PricingTier } from './PricingCard'

const pricingPlans: PricingTier[] = [
  {
    name: 'Starter',
    price: '20',
    priceYearly: '15',
    description: 'Perfect for individuals and small projects',
    features: [
      '100 monthly credits',
      'Credit rollovers',
      'Private generations',
      'Custom design system',
      'No watermark on previews',
    ],
    ctaText: 'Get Started',
    ctaVariant: 'blue',
    featuresIntro: 'Everything in Free, plus:',
    priceDetail: 'per seat/mo',
  },
  {
    name: 'Pro',
    price: '60',
    priceYearly: '48',
    description: 'Ideal for growing teams and businesses',
    features: [
      '300 monthly credits',
      'Credit rollovers',
      'Faster AI Model',
      'Node UI Component Generations',
    ],
    ctaText: 'Start Free Trial',
    ctaVariant: 'blue',
    featuresIntro: 'Everything in Hobby, plus:',
    priceDetail: 'per seat/mo',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceYearly: 'Custom',
    description: 'For large organizations with specific needs',
    features: [''],
    ctaText: "Let's talk",
    ctaVariant: 'black',
    // featuresIntro: 'Everything in Pro, plus:',
  },
]

const PricingSection = () => {
  const [isAnnual, setAnnual] = useState(true)

  return (
    <>
      <section className='mb-8 text-center'>
        <h1 className='mb-2 text-4xl font-bold tracking-tight max-sm:text-3xl'>
          Simple, Transparent Pricing
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg max-sm:text-base'>
          Deliver new products faster with Node UI
        </p>
      </section>
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

      <section className='mx-auto grid h-full max-w-full grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-center gap-3 px-10 max-lg:px-0'>
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} item={plan} isAnnual={isAnnual} />
        ))}
      </section>
    </>
  )
}
export default PricingSection
