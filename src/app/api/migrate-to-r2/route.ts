import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as nextHeaders } from 'next/headers'
import {
  uploadScreenshot,
  uploadFavicon,
  uploadMedia,
  downloadMediaFromUrl,
} from '@/app/(payload)/utils/r2'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isSupabaseUrl(url: string): boolean {
  return url.includes('supabase.co/storage')
}

function getFilenameFromUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const parts = parsed.pathname.split('/')
    return parts[parts.length - 1] || 'file'
  } catch {
    return 'file'
  }
}

// ─── POST /api/migrate-to-r2 ─────────────────────────────────────────────────

export async function POST(req: Request) {
  const payload = await getPayload({ config })

  // Authenticate via Payload's own cookie session (same as admin UI)
  const incomingHeaders = await nextHeaders()
  const { user } = await payload.auth({ headers: incomingHeaders })
  if (!user) {
    return Response.json({ error: 'Unauthorized — must be logged in as admin' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get('limit')
  const limit = limitParam ? Math.max(1, parseInt(limitParam, 10)) : 9999

  const results: {
    id: string
    pageUrl?: string | null
    actions: string[]
    errors: string[]
  }[] = []

  let processed = 0
  let migrated = 0
  let totalErrors = 0

  try {
    // Paginate through all inspiration-websites docs up to `limit`
    let page = 1
    let hasMore = true
    const pageSize = Math.min(limit, 80)

    outer: while (hasMore) {
      const { docs, totalPages } = await payload.find({
        collection: 'inspiration-websites',
        limit: pageSize,
        page,
        depth: 1, // populate additionalMedia
      })

      for (const doc of docs) {
        if (processed >= limit) {
          hasMore = false
          break outer
        }
        processed++

        const entry: (typeof results)[0] = {
          id: doc.id,
          pageUrl: doc.pageUrl,
          actions: [],
          errors: [],
        }

        const updates: Record<string, unknown> = {}

        // ── 1. Screenshot (imgUrl) ────────────────────────────────────────
        if (doc.imgUrl && isSupabaseUrl(doc.imgUrl)) {
          try {
            const filename = getFilenameFromUrl(doc.imgUrl)
            const { buffer } = await downloadMediaFromUrl(doc.imgUrl)
            const newUrl = await uploadScreenshot(buffer, filename)
            updates.imgUrl = newUrl
            entry.actions.push(`imgUrl → ${newUrl}`)
          } catch (err) {
            const msg = `imgUrl migration failed: ${err instanceof Error ? err.message : String(err)}`
            entry.errors.push(msg)
            totalErrors++
          }
        }

        // ── 2. Favicon ────────────────────────────────────────────────────
        if (doc.favicon && isSupabaseUrl(doc.favicon)) {
          try {
            const filename = getFilenameFromUrl(doc.favicon)
            const { buffer, contentType } = await downloadMediaFromUrl(doc.favicon)
            const newUrl = await uploadFavicon(buffer, filename, contentType)
            updates.favicon = newUrl
            entry.actions.push(`favicon → ${newUrl}`)
          } catch (err) {
            const msg = `favicon migration failed: ${err instanceof Error ? err.message : String(err)}`
            entry.errors.push(msg)
            totalErrors++
          }
        }

        // Persist inspiration-website updates
        if (Object.keys(updates).length > 0) {
          await payload.update({
            collection: 'inspiration-websites',
            id: doc.id,
            data: updates,
          })
          migrated++
        }

        // ── 3. Additional Media (video / image) ───────────────────────────
        const additionalMedia = doc.additionalMedia
        if (additionalMedia && typeof additionalMedia === 'object') {
          const mediaDoc = additionalMedia as {
            id: string
            mediaUrl?: string | null
          }

          if (mediaDoc.mediaUrl && isSupabaseUrl(mediaDoc.mediaUrl)) {
            try {
              const filename = getFilenameFromUrl(mediaDoc.mediaUrl)
              const { buffer, contentType } = await downloadMediaFromUrl(mediaDoc.mediaUrl)
              const isVideo = contentType.startsWith('video/')
              const bucket = isVideo ? 'videos' : 'images'
              const newUrl = await uploadMedia(buffer, filename, contentType, bucket)

              await payload.update({
                collection: 'media',
                id: mediaDoc.id,
                data: { mediaUrl: newUrl },
              })

              entry.actions.push(`additionalMedia.mediaUrl → ${newUrl}`)
              migrated++
            } catch (err) {
              const msg = `additionalMedia migration failed: ${err instanceof Error ? err.message : String(err)}`
              entry.errors.push(msg)
              totalErrors++
            }
          }
        }

        results.push(entry)
      }

      hasMore = page < totalPages
      page++
    }
  } catch (err) {
    return Response.json(
      {
        error: 'Migration failed',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    )
  }

  return Response.json({
    processed,
    migrated,
    errors: totalErrors,
    details: results,
  })
}
