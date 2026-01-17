'use client'
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { PricingCard, PricingTier } from './PricingCard';
import { Switch } from '../ui/switch';

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
    isAnnual: true
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
    isAnnual: false
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
    isAnnual: true
  },
]

// interface Props {};

const PricingSection = () => {
  const [isAnnual, setAnnual] = useState(true)

  return (
    <>
      <div className='flex gap-1.5 items-center text-sm font-normal  justify-center mb-4'>
        <span className={cn("transition-colors", isAnnual && 'text-muted-foreground')}>Monthly</span>
        <Switch className='bg-red-500' color="red" checked={isAnnual} onCheckedChange={(checked) => setAnnual(checked)} />
        <p className='relative'>
          <span className={cn("transition-colors",!isAnnual && 'text-muted-foreground')}>Annual</span>
          <span className='absolute text-xs bg-blue-400/20 text-blue-400 w-max text-[10px] text-nowrap font-medium tracking-one rounded-full px-1.5 leading-[1.2] py-0.5 left-12.5 top-1/2 -translate-y-1/2'>Save 20%</span>
        </p>
      </div>
    
      <section className='grid grid-cols-3 justify-center max-w-full px-10 max-lg:px-0  gap-3 mx-auto h-full'>
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} item={plan} />
        ))}
      </section>
    </>
  )
};
export default PricingSection