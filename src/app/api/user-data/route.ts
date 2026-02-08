import { NextResponse } from 'next/server';
import { getClientByUserId, getUserCreditHistory } from '@/lib/credit-helpers'
import { Client, CreditHistory } from '@/payload-types';

export interface UserDataResponse {
  currentPlan: Client['currentPlan'],
  history :{
    id: string;
    source: CreditHistory['source'];
    creditAmount: number;
    createdAt: string;
  }[];
}

export async function GET(req: Request) {
  try {
    // Get userId from query params or default to logged-in user
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')!

    // Fetch client data and credit history
    const [client,history] = await Promise.all([
      getClientByUserId(userId),
      getUserCreditHistory(userId)
    ])

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    if (client.isBlocked) {
      return NextResponse.json({ error: 'User is blocked' }, { status: 403 })
    }
    console.log('ROUTE', client)


    return NextResponse.json<UserDataResponse>({
      currentPlan: client.currentPlan,
      history: history.map(h => ({
        id: h.id,
        source: h.source,
        creditAmount: h.creditAmount,
        createdAt: h.createdAt,
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
