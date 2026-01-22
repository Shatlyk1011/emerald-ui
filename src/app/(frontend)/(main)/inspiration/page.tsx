import { AxiosResponse } from 'axios'
import { IWebsites, ICategories, IWebsiteStyles } from '@/types/inspiration'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'
// components
import InspirationContent from '@/components/InspirationPage/InspirationContent'
import SitePreviewDialog from '@/components/InspirationPage/SitePreviewDialog'

const stringifiedQuery = stringify(
  {
    where: {
      isVisible: {
        equals: true,
      },
    },
    depth: 1,
    limit: 24,
  },
  { addQueryPrefix: true }
)

const getInitialData = async () => {
  return axios(`/inspiration-websites/${stringifiedQuery || ''}`)
}

const getCategories = async () => {
  return axios(`/categories`)
}

const getStyles = async () => {
  return axios(`/website-style`)
}

export default async function InspirationPage() {
  const initialData = await getInitialData()
  const categories = await getCategories()
  const websiteStyles = await getStyles()

  const [data, categoriesData, stylesData]: [
    AxiosResponse<IWebsites>,
    AxiosResponse<ICategories>,
    AxiosResponse<IWebsiteStyles>,
  ] = await Promise.all([initialData, categories, websiteStyles])

  return (
    <main className='bg-background min-h-screen font-sans'>
      <div className='mx-auto max-w-[1440px] px-6 py-10'>
        <InspirationContent
          initialData={data.data}
          categories={categoriesData.data.docs}
          styles={stylesData.data.docs} 
        />
      </div>
      <SitePreviewDialog />
    </main>
  )
}
