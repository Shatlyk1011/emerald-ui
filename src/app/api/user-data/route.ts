import { Client, CreditHistory } from '@/payload-types'
import { NextResponse } from 'next/server'
import { getClientByUserId } from '@/lib/credit-helpers'

export interface UserDataResponse {
  currentPlan: Client['currentPlan']
  history: {
    id: string
    source: CreditHistory['source']
    creditAmount: number
    createdAt: string
    expirationDate: string | null | undefined
    status: CreditHistory['status']
    creditsSpent: CreditHistory['creditsSpent']
  }[]
}

export async function GET(req: Request) {
  try {
    // Get userId from query params or default to logged-in user
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')!

    // Fetch client data and credit history
    // Fetch client data which now includes credit history via join field
    const client = await getClientByUserId(userId)

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    if (client.isBlocked) {
      return NextResponse.json({ error: 'User is blocked' }, { status: 403 })
    }

    // When depth is sufficient, join field returns { docs: [...] } structure
    const joinedData = client.creditHistory as unknown as
      | { docs: CreditHistory[] }
      | undefined
    const creditHistory = joinedData?.docs || []

    return NextResponse.json<UserDataResponse>({
      currentPlan: client.currentPlan,
      history: creditHistory.map((h) => ({
        id: h.id,
        source: h.source,
        creditAmount: h.creditAmount,
        createdAt: h.createdAt,
        expirationDate: h.expirationDate,
        creditsSpent: h.creditsSpent,
        status: h.status,
      })),
    })
  } catch (error) {
    console.error('Error fetching credit history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch credit history' },
      { status: 500 }
    )
  }
}
