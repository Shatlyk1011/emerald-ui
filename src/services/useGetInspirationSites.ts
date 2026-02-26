import { useInfiniteQuery } from '@tanstack/react-query'
import { IWebsites } from '@/types/inspiration'
import { Where } from 'payload'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'

// Infinite Query for Inspiration Sites
export const useInfiniteInspirationSites = (
  initialData: IWebsites,
  query?: Where
) => {
  return useInfiniteQuery<IWebsites>({
    queryKey: ['inspiration-sites', query],
    queryFn: async ({ pageParam = 1 }) => {
      const stringifiedQuery = stringify(
        {
          where: query || { isVisible: { equals: true } },
          depth: 1,
          limit: 12,
          page: pageParam,
        },
        { addQueryPrefix: true }
      )
      const response = await axios(`/inspiration-websites${stringifiedQuery}`)
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  })
}
