import { deleteMediaFromUrl } from '@/app/(payload)/utils/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url, bucket } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    // Delete the media file from Supabase storage
    await deleteMediaFromUrl(url, bucket)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Delete failed',
      },
      { status: 500 }
    )
  }
}
