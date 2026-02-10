import { sendNewsletter } from '@/lib/helpers/send-newsletter'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { newsletterId } = body

    if (!newsletterId) {
      return NextResponse.json(
        { error: 'Newsletter ID is required' },
        { status: 400 }
      )
    }

    // Send the newsletter
    const result = await sendNewsletter(newsletterId)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send newsletter' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      recipientCount: result.recipientCount,
      message: `Newsletter sent successfully to ${result.recipientCount} subscribers`,
    })
  } catch (error) {
    console.error('Newsletter send error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
