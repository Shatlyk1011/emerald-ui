'use server'

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '@/lib/constants'

const apiKey = process.env.OPENAI_API_KEY || ''

const openai = new OpenAI({
  apiKey,
})

export async function GET() {
  return NextResponse.json({ hello: 'world' })
}

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 502 }
    )
  }

  try {
    const body = await req.json()
    const { prompt } = body
    console.log('prompt', prompt)

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content

    if (!content) {
      return NextResponse.json(
        { error: 'No content received from OpenAI' },
        { status: 500 }
      )
    }

    try {
      const files = JSON.parse(content)
      return NextResponse.json({ success: true, files })
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse OpenAI response' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Generate UI Error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
