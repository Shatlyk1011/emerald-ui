import { CreditHistory } from "@/payload-types"

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

