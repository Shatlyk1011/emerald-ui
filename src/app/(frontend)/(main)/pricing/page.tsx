import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import PricingSection from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'Pricing',
  description: siteConfig.description,
}


export default function PricingPage() {
  return (
    <main className='mx-auto mb-16 w-full max-w-7xl px-8 pt-20 max-lg:px-6 max-sm:px-4 max-sm:pt-8'>
      <section className='mb-8 text-center'>
        <h1 className='mb-2 text-4xl font-bold tracking-tight max-sm:text-3xl'>
          Simple, Transparent Pricing
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg max-sm:text-base'>
          Choose the perfect plan for your needs. All plans include a 14-day
          free trial.
        </p>
      </section>

      <PricingSection />
    </main>
  )
}
