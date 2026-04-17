import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'
import InspirationContent from '@/components/InspirationPage/InspirationContent'
import InspirationPageSkeleton from '@/components/InspirationPage/InspirationPageSkeleton'

const getCategories = unstable_cache(
  async () => (await axios('/categories')).data.docs,
  ['categories'],
  { revalidate: 3600 * 24 } // 24 hours
)

const getStyles = unstable_cache(
  async () => (await axios(`/website-style`)).data.docs,
  ['website-style'],
  { revalidate: 3600 * 24 } // 24 hours
)

const getInspirationSites = unstable_cache(
  async () => {
    const stringifiedQuery = stringify(
      {
        where: { isVisible: { equals: true } },
        depth: 1,
        limit: 12,
        page: 1,
      },
      { addQueryPrefix: true }
    )
    return (await axios(`/inspiration-websites${stringifiedQuery}`)).data
  },
  ['inspiration-websites'],
  { revalidate: 3600 }
)

export default async function Home() {
  return (
    <main className='bg-background mt-14 min-h-screen font-sans'>
      <div className='mx-auto max-w-400 px-10 py-10 max-sm:px-4 max-sm:py-6'>
        <Suspense fallback={<InspirationPageSkeleton />}>
          <InspirationDataLoader />
        </Suspense>
      </div>
    </main>
  )
}

async function InspirationDataLoader() {
  const [categoriesData, stylesData, inspirationSitesData] = await Promise.all([
    getCategories(),
    getStyles(),
    getInspirationSites(),
  ])

  return (
    <InspirationContent
      categories={categoriesData}
      styles={stylesData}
      initialData={inspirationSitesData}
    />
  )
}
