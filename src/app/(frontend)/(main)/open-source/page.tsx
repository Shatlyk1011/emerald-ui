import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'
import OpenSourceContent from './OpenSourceContent'

const getOpenSourceComponents = unstable_cache(
  async () => {
    const stringifiedQuery = stringify(
      {
        depth: 1,
        limit: 12,
        page: 1,
      },
      { addQueryPrefix: true }
    )
    return (await axios(`/open-source-components${stringifiedQuery}`)).data
  },
  ['open-source-components'],
  { revalidate: 3600 } // 1 hour
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
  const initialData = await getOpenSourceComponents()

  return (
    <OpenSourceContent initialData={initialData} />
  )
}

function OpenSourcePageSkeleton() {
  return (
    <div className='flex flex-col gap-12 animate-pulse'>
      <div className='flex flex-col gap-4'>
        <div className='h-10 w-64 bg-muted rounded-md' />
        <div className='h-6 w-96 bg-muted rounded-md' />
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='flex flex-col gap-3'>
            <div className='h-4 w-24 bg-muted rounded-md' />
            <div className='flex flex-wrap gap-2'>
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className='h-6 w-16 bg-muted rounded-md' />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='h-64 rounded-xl bg-muted' />
        ))}
      </div>
    </div>
  )
}
