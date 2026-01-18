'use server'

import { generateComponentCode, generateProjectPlan } from '@/services/gemini'
import { NextResponse } from 'next/server'









const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini API key is not configured' },
      { status: 502 }
    )
  }

  try {
    const body = await req.json()
    const { prompt } = body
    console.log('User Prompt:', prompt)

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Step 1: Generate Project Plan
    console.log('Generating Project Plan...')
    const plan = await generateProjectPlan(prompt)

    if (!plan) {
      throw new Error('Failed to generate project plan')
    }
    console.log('Project Plan Generated:', plan.substring(0, 200) + '...') // Log summary

    // Step 2: Generate Component Code from Plan
    console.log('Generating Component Code...')
    const files = await generateComponentCode(plan)

    if (!files) {
      throw new Error('Failed to generate component code')
    }

    return NextResponse.json({ success: true, files, plan }) // Added plan to response for debugging/transparency
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
