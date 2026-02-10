import { Suspense } from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import InspirationPageContent from '@/components/InspirationPage/InspirationPageContent'
import InspirationPageSkeleton from '@/components/InspirationPage/InspirationPageSkeleton'

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
}

export default function Home() {
  return (
    <main className='bg-background mt-14 min-h-screen font-sans'>
      <div className='mx-auto max-w-400 px-10 py-10 max-sm:px-4 max-sm:py-6'>
        <Suspense fallback={<InspirationPageSkeleton />}>
          <InspirationPageContent />
        </Suspense>
      </div>
    </main>
  )
}
