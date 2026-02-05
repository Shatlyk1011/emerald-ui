import { Suspense } from 'react'
import InspirationPageContent from '@/components/InspirationPage/InspirationPageContent'
import InspirationPageSkeleton from '@/components/InspirationPage/InspirationPageSkeleton'

export default async function InspirationPage() {
  return (
    <main className='bg-background min-h-screen font-sans'>
      <div className='mx-auto max-w-520 px-10 py-10'>
        <Suspense fallback={<InspirationPageSkeleton />}>
          <InspirationPageContent />
        </Suspense>
      </div>
    </main>
  )
}
