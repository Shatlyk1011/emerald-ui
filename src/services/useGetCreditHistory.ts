import { useQuery } from '@tanstack/react-query'
import { CreditHistoryResponse } from '@/types/auth'
import { axios } from '@/lib/axios'

export const useGetCreditHistory = () => {
  return useQuery<CreditHistoryResponse>({
    queryKey: ['credit-history'],
    queryFn: async () => {
      const response = await axios.get('/credit-history')
      return response.data
    },
  })
}
