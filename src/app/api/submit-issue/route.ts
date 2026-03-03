import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    // Validate required fields
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Create submission
    const issueData = {
      name: name || null,
      email: email || null,
      message,
      status: 'open',
    }

    const issue = await payload.create({
      collection: 'reports',
      // @ts-expect-error payload dynamic types
      data: issueData,
    })

    return NextResponse.json({
      success: true,
      id: issue.id,
    })
  } catch (error) {
    console.error('Submit Issue Error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to submit issue',
      },
      { status: 500 }
    )
  }
}
