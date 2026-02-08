import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import { UserDataResponse } from '@/app/api/user-data/route'

export const useUserCreditsQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-credits', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required')
      }
      const { data } = await axios.get<UserDataResponse>(
        `/user-data?userId=${userId}`
      )
      return data
    },
    enabled: !!userId,
  })
}
