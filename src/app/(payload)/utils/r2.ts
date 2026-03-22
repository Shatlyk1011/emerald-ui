import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

// ─── R2 client setup ─────────────────────────────────────────────────────────

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

// Custom domain for serving public assets: https://<bucket>.emerald-ui.com/<filename>
const R2_CUSTOM_DOMAIN = (
  process.env.R2_CUSTOM_DOMAIN || 'emerald-ui.com'
).replace(/^\/+|\/+$/g, '')

const IMAGES_BUCKET = process.env.R2_IMAGES_BUCKET || 'images'
const FAVICONS_BUCKET = process.env.R2_FAVICONS_BUCKET || 'favicons'

if (!process.env.R2_ENDPOINT_URL || !process.env.R2_ACCESS_KEY_ID) {
  console.warn('R2 credentials not configured')
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildPublicUrl(bucket: string, filename: string): string {
  return `https://${bucket}.${R2_CUSTOM_DOMAIN}/${filename}`
}

async function putObject(
  bucket: string,
  filename: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: body,
      ContentType: contentType,
    })
  )

  return buildPublicUrl(bucket, filename)
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Upload screenshot to R2 storage (images bucket)
 */
export async function uploadScreenshot(
  imageBuffer: Buffer,
  filename: string
): Promise<string> {
  return putObject(IMAGES_BUCKET, filename, imageBuffer, 'image/webp')
}

/**
 * Upload favicon to R2 storage (favicons bucket)
 */
export async function uploadFavicon(
  imageBuffer: Buffer,
  filename: string,
  contentType: string = 'image/x-icon'
): Promise<string> {
  return putObject(FAVICONS_BUCKET, filename, imageBuffer, contentType)
}

/**
 * Upload image to R2 storage (images bucket)
 */
export async function uploadImage(
  imageBuffer: Buffer,
  filename: string,
  contentType: string = 'image/*'
): Promise<string> {
  return putObject(IMAGES_BUCKET, filename, imageBuffer, contentType)
}

/**
 * Upload media (image or video) to R2 storage
 */
export async function uploadMedia(
  fileBuffer: Buffer,
  filename: string,
  contentType: string,
  bucket: 'videos' | 'images' | 'favicons' = 'images'
): Promise<string> {
  const bucketName = process.env[`R2_${bucket.toUpperCase()}_BUCKET`] || bucket
  return putObject(bucketName, filename, fileBuffer, contentType)
}

/**
 * Delete a file from R2 storage given its public URL.
 * URL is expected to contain the bucket name as the first path segment after the base URL.
 * Example: https://cdn.example.com/images/file.webp  →  bucket=images, key=file.webp
 */
export async function deleteMediaFromUrl(
  publicUrl: string,
  bucket?: string
): Promise<void> {
  if (!publicUrl) return

  try {
    const url = new URL(publicUrl)
    // Custom domain format: https://<bucket>.emerald-ui.com/<filename>
    // The bucket name is the first subdomain label of the hostname.
    const pathParts = url.pathname.replace(/^\//, '').split('/')

    let resolvedBucket: string
    let key: string

    if (bucket) {
      // Caller knows the bucket explicitly
      resolvedBucket =
        process.env[`R2_${bucket.toUpperCase()}_BUCKET`] || bucket
      key = pathParts[pathParts.length - 1]
    } else {
      // Infer bucket from subdomain: e.g. images.emerald-ui.com → images
      const subdomainBucket = url.hostname.split('.')[0]
      resolvedBucket =
        process.env[`R2_${subdomainBucket.toUpperCase()}_BUCKET`] ||
        subdomainBucket
      key = pathParts.join('/')
    }

    if (!key) {
      console.warn('Could not extract key from URL:', publicUrl)
      return
    }

    await r2Client.send(
      new DeleteObjectCommand({ Bucket: resolvedBucket, Key: key })
    )

    console.log(`Deleted R2 object: ${resolvedBucket}/${key}`)
  } catch (error) {
    console.error('Error deleting R2 object from URL:', publicUrl, error)
    // Don't throw — we don't want to block document deletion if storage cleanup fails
  }
}

/**
 * Download media from a URL and return a buffer with metadata.
 * (This is pure HTTP — no storage SDK required.)
 */
export async function downloadMediaFromUrl(
  url: string,
  maxSize: number = 50 * 1024 * 1024
): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    throw new Error('Invalid URL format')
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Only HTTP and HTTPS protocols are supported')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60_000)

  const response = await fetch(url, {
    signal: controller.signal,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MediaUploader/1.0)' },
  })

  clearTimeout(timeout)

  if (!response.ok) {
    throw new Error(
      `Failed to download media: ${response.status} ${response.statusText}`
    )
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) {
    throw new Error(
      `Unsupported content type: ${contentType}. Only images and videos are allowed.`
    )
  }

  const contentLength = response.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > maxSize) {
    throw new Error(
      `File size (${parseInt(contentLength)} bytes) exceeds maximum allowed size (${maxSize} bytes)`
    )
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('Failed to read response body')

  const chunks: Uint8Array[] = []
  let downloadedSize = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    downloadedSize += value.length
    if (downloadedSize > maxSize) {
      reader.cancel()
      throw new Error(
        `File size exceeds maximum allowed size (${maxSize} bytes)`
      )
    }
    chunks.push(value)
  }

  const buffer = Buffer.concat(chunks)

  const pathParts = parsedUrl.pathname.split('/')
  let filename = pathParts[pathParts.length - 1] || 'download'
  filename = filename.split('?')[0]
  filename = filename.replace(/[^a-z0-9.-]/gi, '-').toLowerCase()

  if (!filename.includes('.')) {
    const ext = contentType.split('/')[1]?.split(';')[0] || 'bin'
    filename = `${filename}.${ext}`
  }

  return { buffer, contentType, filename }
}
