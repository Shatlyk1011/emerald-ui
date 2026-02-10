import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import BackgroundThreads from '@/components/ui/background-threads'
import FileUploadInput from '@/components/FileUpload'
import InspirationPageSkeleton from '@/components/InspirationPage/InspirationPageSkeleton'
import { Suspense } from 'react'
import InspirationPageContent from '@/components/InspirationPage/InspirationPageContent'

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
}

export default function Home() {
  return (
    <main className='bg-background min-h-screen font-sans mt-14'>
      <div className='mx-auto max-w-400 px-10 py-10 max-sm:px-4 max-sm:py-6'>
        <Suspense fallback={<InspirationPageSkeleton />}>
          <InspirationPageContent />
        </Suspense>
      </div>
    </main>
  )
}
