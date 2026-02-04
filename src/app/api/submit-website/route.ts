import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, websiteUrl, message } = body

    // Validate required fields
    if (!websiteUrl) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      )
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Create submission
    const submission = await payload.create({
      collection: 'website-submissions',
      data: {
        name: name || undefined,
        email: email || undefined,
        websiteUrl,
        message: message || undefined,
        status: 'pending',
      },
    })

    return NextResponse.json({
      success: true,
      id: submission.id,
    })
  } catch (error) {
    console.error('Submit Website Error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to submit website',
      },
      { status: 500 }
    )
  }
}
