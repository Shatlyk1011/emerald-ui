import { AxiosResponse } from 'axios'
import { InspirationWebsite } from '@/payload-types'
import { IWebsites, ICategories, IWebsiteStyles } from '@/types/inspiration'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'
import InspirationContent from './InspirationContent'

const stringifiedQuery = stringify(
  {
    where: {
      isVisible: {
        equals: true,
      },
    },
    depth: 1,
    limit: 12,
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

export default async function InspirationPageContent() {
  const initialData = await getInitialData()
  const categories = await getCategories()
  const websiteStyles = await getStyles()

  const [data, categoriesData, stylesData]: [
    AxiosResponse<IWebsites>,
    AxiosResponse<ICategories>,
    AxiosResponse<IWebsiteStyles>,
  ] = await Promise.all([initialData, categories, websiteStyles])

  const totalDocs = initialData.data.totalDocs as number
  const images = initialData.data.docs
    .map((i: InspirationWebsite) => i.imgUrl)
    .filter(Boolean)

  return (
    <InspirationContent
      initialData={data.data}
      totalDocs={totalDocs}
      images={images}
      categories={categoriesData.data.docs}
      styles={stylesData.data.docs}
    />
  )
}
