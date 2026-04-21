import config from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import type { CollectionSlug } from 'payload';







/**
 * Generic API endpoint to fetch any collection document by ID
 * Usage: /api/collections/{collection-slug}/{document-id}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const [payload, { collection, id }] = await Promise.all([
      getPayload({ config }),
      params,
    ])

    const document = await payload.findByID({
      collection: collection as CollectionSlug,
      id,
    })

    if (!document) {
      return NextResponse.json(
        { error: `${collection} document not found` },
        { status: 404 }
      )
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error(`Error fetching ${(await params).collection}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    )
  }
}
