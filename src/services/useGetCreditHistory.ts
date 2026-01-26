import { useQuery } from '@tanstack/react-query';
import { CreditHistory } from '@/payload-types';
import { axios } from '@/lib/axios';






export interface CreditHistoryResponse {
  client: {
    userId: string
    email?: string
    currentPlan: string
    isBlocked: boolean
    provider?: string
    isVerified?: boolean
  }
  history: CreditHistory[]
}

/**
 * Fetch user's credit history using TanStack Query
 */
export const useGetCreditHistory = () => {
  return useQuery<CreditHistoryResponse>({
    queryKey: ['credit-history'],
    queryFn: async () => {
      const response = await axios.get('/credit-history')
      return response.data
    },
  })
}
