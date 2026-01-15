import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Pricing',
  description: siteConfig.description,
}

const pricingPlans = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 5 projects',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      'Community access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
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
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
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
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <main className='mx-auto mb-16 w-full max-w-7xl px-8 pt-16 max-lg:px-6 max-sm:px-4 max-sm:pt-8'>
      <div className='mb-16 text-center'>
        <h1 className='mb-4 text-4xl font-bold tracking-tight max-sm:text-3xl'>
          Simple, Transparent Pricing
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg max-sm:text-base'>
          Choose the perfect plan for your needs. All plans include a 14-day
          free trial.
        </p>
      </div>

      <div className='grid gap-8 max-md:mx-auto max-md:max-w-md md:grid-cols-3'>
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-card border-border relative flex flex-col rounded-lg border p-8 shadow-sm transition-all hover:shadow-md ${
              plan.popular
                ? 'ring-primary border-primary scale-105 ring-2 max-md:scale-100'
                : ''
            }`}
          >
            {plan.popular && (
              <div className='bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-medium'>
                Most Popular
              </div>
            )}

            <div className='mb-6'>
              <h3 className='mb-2 text-2xl font-bold'>{plan.name}</h3>
              <p className='text-muted-foreground text-sm'>
                {plan.description}
              </p>
            </div>

            <div className='mb-6'>
              <div className='flex items-baseline'>
                <span className='text-5xl font-bold tracking-tight'>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className='text-muted-foreground ml-2 text-lg'>
                    {plan.period}
                  </span>
                )}
              </div>
            </div>

            <ul className='mb-8 flex-1 space-y-3'>
              {plan.features.map((feature) => (
                <li key={feature} className='flex items-start gap-3'>
                  <Check className='text-primary mt-0.5 h-5 w-5 shrink-0' />
                  <span className='text-sm'>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.popular ? 'default' : 'outline'}
              size='lg'
              className='w-full'
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      <div className='bg-muted/50 mt-16 rounded-lg p-8 text-center'>
        <h2 className='mb-2 text-2xl font-bold'>Need a custom solution?</h2>
        <p className='text-muted-foreground mb-6'>
          Contact our sales team to discuss enterprise pricing and custom
          features.
        </p>
        <Button variant='outline' size='lg'>
          Schedule a Call
        </Button>
      </div>
    </main>
  )
}
