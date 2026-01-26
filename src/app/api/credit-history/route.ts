import { NextResponse } from 'next/server';
import { getClientByUserId, getUserCreditHistory } from '@/lib/credit-helpers'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch client data and credit history
    const client = await getClientByUserId(user.id)
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const history = await getUserCreditHistory(user.id)

    return NextResponse.json({
      client: {
        userId: client.userId,
        email: client.email,
        currentPlan: client.currentPlan,
        isBlocked: client.isBlocked,
        provider: client.provider,
        isVerified: client.isVerified,
      },
      history,
    })
  } catch (error) {
    console.error('Error fetching credit history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch credit history' },
      { status: 500 }
    )
  }
}
