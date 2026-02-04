import { addMonthlyCredits } from '@/app/(payload)/cron/monthly-credits'
import { NextResponse } from 'next/server'

/**
 * Vercel Cron Job endpoint for adding monthly credits
 * Runs every hour for demo purposes
 *
 * Security: Vercel Cron Jobs are automatically authenticated
 * For additional security, you can check the Authorization header
 */
export async function GET(request: Request) {
  try {
    // Optional: Verify cron secret for additional security
    const authHeader = request.headers.get('authorization')

    if (process.env.CRON_SECRET) {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.error('Unauthorized cron job attempt')
        return new NextResponse('Unauthorized', { status: 401 })
      }
    }

    console.log('Cron job triggered: Adding monthly credits...')

    const result = await addMonthlyCredits()

    return NextResponse.json({
      ...result,
      message: 'Monthly credits added successfully',
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cron job error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
