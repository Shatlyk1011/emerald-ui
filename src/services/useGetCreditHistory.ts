import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import { CreditHistory } from '@/payload-types'

export interface CreditHistoryResponse {
  history: CreditHistory[]
}

/**
 * Fetch user's credit history using TanStack Query
 */
export const useGetCreditHistory = () => {
  return useQuery<CreditHistoryResponse>({
    queryKey: ['credit-history'],
    queryFn: async () => {
      const response = await axios.get('/api/credit-history')
      return response.data
    },
  })
}
