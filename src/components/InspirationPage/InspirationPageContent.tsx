import { AxiosResponse } from 'axios'
import { ICategories, IWebsiteStyles } from '@/types/inspiration'
import { axios } from '@/lib/axios'
import InspirationContent from './InspirationContent'

const getCategories = async () => {
  return axios(`/categories`)
}

const getStyles = async () => {
  return axios(`/website-style`)
}

export default async function InspirationPageContent() {
  const categories = await getCategories()
  const websiteStyles = await getStyles()

  const [categoriesData, stylesData]: [
    AxiosResponse<ICategories>,
    AxiosResponse<IWebsiteStyles>,
  ] = await Promise.all([categories, websiteStyles])

  return (
    <InspirationContent
      categories={categoriesData.data.docs}
      styles={stylesData.data.docs}
    />
  )
}
