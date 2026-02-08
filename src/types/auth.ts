import { Client, CreditHistory } from '@/payload-types'

export interface CreditHistoryResponse {
  client: Client
  history: CreditHistory[]
}
