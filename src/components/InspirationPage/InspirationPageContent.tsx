import { AxiosResponse } from 'axios'
import { ICategories, IWebsites, IWebsiteStyles } from '@/types/inspiration'
import { axios } from '@/lib/axios'
import InspirationContent from './InspirationContent'
import { stringify } from 'qs-esm'

const getCategories = async () => {
  return axios(`/categories`)
}

const getStyles = async () => {
  return axios(`/website-style`)
}

const getInspirationSites = async () => {
  const stringifiedQuery = stringify(
    {
      where: { isVisible: { equals: true } },
      depth: 1,
      limit: 12,
      page: 1,
    },
    { addQueryPrefix: true }
  )
  return axios(`/inspiration-websites${stringifiedQuery}`)
}

export default async function InspirationPageContent() {
  const categoriesUrl = getCategories()
  const websiteStylesUrl = getStyles()
  const inspirationSitesUrl = getInspirationSites()

  const [categoriesData, stylesData, inspirationSitesData]: [
    AxiosResponse<ICategories>,
    AxiosResponse<IWebsiteStyles>,
    AxiosResponse<IWebsites>
  ] = await Promise.all([categoriesUrl, websiteStylesUrl, inspirationSitesUrl])

  return (
    <InspirationContent
      categories={categoriesData.data.docs}
      styles={stylesData.data.docs}
      initialData={inspirationSitesData.data}
    />
  )
}
