import { useInfiniteQuery } from '@tanstack/react-query'
import { IOpenSourceComponents } from '@/types/open-source'
import { Where } from 'payload'
import { stringify } from 'qs-esm'
import { axios } from '@/lib/axios'

export const useInfiniteOpenSourceComponents = (
  initialData: IOpenSourceComponents,
  query?: Where
) => {
  return useInfiniteQuery<IOpenSourceComponents>({
    queryKey: ['open-source-components', query],
    queryFn: async ({ pageParam = 1 }) => {
      const stringifiedQuery = stringify(
        {
          where: query || {},
          depth: 1,
          limit: 12,
          page: pageParam,
        },
        { addQueryPrefix: true }
      )
      const response = await axios(`/open-source-components${stringifiedQuery}`)
      return response.data
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    placeholderData: {
      pages: [initialData],
      pageParams: [1],
    },
  })
}
