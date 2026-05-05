import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { axios } from '@/lib/axios'
import OpenSourceContent from './OpenSourceContent'

const getOpenSourceProjects = unstable_cache(
  async () => {
    return (await axios(`/open-source-projects?limit=12`)).data.docs
  },
  ['open-source-projects'],
  { revalidate: 3600 * 24 } // 24 hours
)

export default function OpenSourcePage() {
  return (
    <main className='bg-background mt-14 min-h-screen font-sans'>
      <div className='mx-auto max-w-400 px-10 py-10 max-sm:px-4 max-sm:py-6'>
        <Suspense fallback={<OpenSourcePageSkeleton />}>
          <OpenSourceDataLoader />
        </Suspense>
      </div>
    </main>
  )
}

async function OpenSourceDataLoader() {
  const initialData = await getOpenSourceProjects()

  return <OpenSourceContent initialData={initialData} />
}

function OpenSourcePageSkeleton() {
  return (
    <div className='flex animate-pulse flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <div className='bg-muted h-10 w-64 rounded-md' />
        <div className='bg-muted h-6 w-96 rounded-md' />
      </div>

      <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='flex flex-col gap-3'>
            <div className='bg-muted h-4 w-24 rounded-md' />
            <div className='flex flex-wrap gap-2'>
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className='bg-muted h-6 w-16 rounded-md' />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='bg-muted h-64 rounded-xl' />
        ))}
      </div>
    </div>
  )
}
