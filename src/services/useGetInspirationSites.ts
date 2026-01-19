import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query'
import { IWebsites } from '@/types/inspiration'
import { axios } from '@/lib/axios'
import { InspirationWebsite } from '../../payload-types'

export const useGetWebsites = () => {
  const getWebsite = async (id: string): Promise<InspirationWebsite> => {
    return (await axios(`/inspiration-websites/${id}`)).data
  }

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
