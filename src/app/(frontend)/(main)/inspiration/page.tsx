import { AxiosResponse } from 'axios'
import { IWebsites, ICategories, IWebsiteStyles } from '@/types/inspiration'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'

// components
import SiteCards from '@/components/InspirationPage/SiteCards'
import FilterSection from '@/components/InspirationPage/FilterSection'
import SitePreviewDialog from '@/components/InspirationPage/SitePreviewDialog'

const stringifiedQuery = stringify(
  {
    where: {
      isVisible: {
        equals: true,
      },
    },
    limit: 24,
  },
  { addQueryPrefix: true }
)

export default async function InspirationPage() {
  const [initialData, categoriesData, stylesData]: [
    AxiosResponse<IWebsites>,
    AxiosResponse<ICategories>,
    AxiosResponse<IWebsiteStyles>
  ] = await Promise.all([
    axios(`/inspiration-websites/${stringifiedQuery || ""}`),
    axios('/categories'),
    axios('/website-style')
  ])

  return (
    <div className='bg-background min-h-screen font-sans'>
      <main className='mx-auto max-w-7xl px-6 py-10'>

        <FilterSection
          categories={categoriesData.data.docs}
          styles={stylesData.data.docs}
        />

        <h1 className='-tracking-two mb-6 text-3xl font-semibold'>
          Explore curated websites
        </h1>

        <SiteCards initialData={initialData.data} />
      </main>

      <SitePreviewDialog />
    </div>
  )
}
