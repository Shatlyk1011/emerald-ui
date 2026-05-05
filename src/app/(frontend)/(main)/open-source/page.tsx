import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { axios } from '@/lib/axios'
import OpenSourceContent from './OpenSourceContent'
import OpenSourcePageSkeleton from './PageSkeleton'

export const dynamic = 'force-dynamic'

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

