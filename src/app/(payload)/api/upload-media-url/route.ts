import { downloadMediaFromUrl, uploadMedia } from '@/app/(payload)/utils/r2'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

// Allowed file types
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
  'video/mpeg',
]

const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES]

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    // Download media from URL
    let downloadResult
    try {
      downloadResult = await downloadMediaFromUrl(url, MAX_FILE_SIZE)
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : 'Failed to download media from URL',
        },
        { status: 400 }
      )
    }

    let { buffer, contentType, filename } = downloadResult

    // Validate content type
    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${contentType}. Allowed types: images (jpeg, png, gif, webp, svg) and videos (mp4, webm, mov, avi, mpeg)`,
        },
        { status: 400 }
      )
    }

    // Determine bucket and media type based on content type
    const isVideo = ALLOWED_VIDEO_TYPES.includes(contentType)
    const bucket = isVideo ? 'videos' : 'images'
    const mediaType = isVideo ? 'video' : 'image'

    // Optimize images with Sharp (convert to WebP with quality reduction)
    if (!isVideo && ALLOWED_IMAGE_TYPES.includes(contentType)) {
      try {
        // Process image with Sharp: convert to WebP and reduce quality
        const optimizedBuffer = await sharp(buffer)
          .webp({ quality: 95 })
          .toBuffer()

        buffer = optimizedBuffer as Buffer<ArrayBuffer>

        // Update filename extension to .webp
        const nameWithoutExt = filename.replace(/\.[^.]+$/, '')
        filename = `${nameWithoutExt}.webp`

        // Update content type
        contentType = 'image/webp'

        console.log(`Image optimized from URL: ${url} -> ${filename}`)
      } catch (error) {
        console.error('Sharp optimization error:', error)
        // If optimization fails, continue with original buffer
        console.warn('Falling back to original image without optimization')
      }
    }

    // Upload to Supabase
    const publicUrl = await uploadMedia(buffer, filename, contentType, bucket)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      mediaType,
      filename,
      contentType,
      size: buffer.length,
    })
  } catch (error) {
    console.error('Upload from URL error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    )
  }
}
