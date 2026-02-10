import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import PricingSection from '@/components/PricingSection'

export const metadata: Metadata = {
  title: 'Pricing',
  description: siteConfig.description,
}

export default function PricingPage() {
  return (
    <main className='mx-auto mb-16 w-full max-w-7xl px-8 pt-20 max-lg:px-6 max-sm:px-4 max-sm:pt-8'>

      {/* <PricingSection /> */}
    </main>
  )
}
