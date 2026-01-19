import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { unstable_cache } from '@/composables/unstable-cache'
import { IWebsites } from '@/types/inspiration'
import { axios } from '@/lib/axios'
import { siteConfig } from '@/lib/site-config'
import { InspirationWebsite } from '../../payload-types'

export const useGetWebsites = () => {
  const getWebsite = unstable_cache(
    async (id: string): Promise<InspirationWebsite> => {
      return (await axios(`/inspiration-websites/${id}`)).data
    },
    ['getJob'],
    { revalidate: siteConfig.revalidateTime }
  )

  const getWebsites = async (query?: string): Promise<IWebsites> => {
    const response: AxiosResponse<IWebsites> = await axios(
      `/inspiration-websites/${query || ''}`
    )

    return response.data
  }

  return { getWebsite, getWebsites }
}

//React Query
export const useWebsitesQuery = (initialData: InspirationWebsite[]) => {
  const { data, isLoading } = useQuery<InspirationWebsite[]>({
    queryFn: async () => {
      const { data: websites } = await axios({
        url: '/inspiration-websites',
      })

      return websites
    },
    initialData,
    staleTime: Infinity,
    queryKey: ['websites'],
  })

  return { websites: data, isLoading }
}
