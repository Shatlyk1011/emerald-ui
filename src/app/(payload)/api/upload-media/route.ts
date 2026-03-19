import { uploadMedia } from '@/app/(payload)/utils/r2'
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
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed types: images (jpeg, png, gif, webp, svg) and videos (mp4, webm, mov, avi, mpeg)`,
        },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 50MB limit' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    let buffer = Buffer.from(arrayBuffer)

    // Generate unique filename
    const sanitizedName = file.name.replace(/[^a-z0-9.-]/gi, '-').toLowerCase()
    let filename = sanitizedName
    let contentType = file.type

    // Determine bucket and media type based on file type
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type)
    const bucket = isVideo ? 'videos' : 'images'
    const mediaType = isVideo ? 'video' : 'image'

    // Optimize images with Sharp (convert to WebP with quality reduction)
    if (!isVideo && ALLOWED_IMAGE_TYPES.includes(file.type)) {
      try {
        // Process image with Sharp: convert to WebP and reduce quality
        const optimizedBuffer = await sharp(buffer)
          .webp({ quality: 95 })
          .toBuffer()

        buffer = optimizedBuffer as Buffer<ArrayBuffer>

        // Update filename extension to .webp
        const nameWithoutExt = sanitizedName.replace(/\.[^.]+$/, '')
        filename = `${nameWithoutExt}.webp`

        // Update content type
        contentType = 'image/webp'

        console.log(`Image optimized: ${file.name} -> ${filename}`)
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
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    )
  }
}
