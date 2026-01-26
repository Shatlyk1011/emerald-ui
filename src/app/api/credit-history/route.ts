import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import { getUserCreditHistory } from '@/lib/credit-helpers'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch credit history and available credits
    const history = await getUserCreditHistory(user.id)

    return NextResponse.json({history})
  } catch (error) {
    console.error('Error fetching credit history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch credit history' },
      { status: 500 }
    )
  }
}
