import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''
const imagesBucket = process.env.SUPABASE_IMAGES_BUCKET || 'images'
const faviconsBucket = process.env.SUPABASE_FAVICONS_BUCKET || 'favicons'

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

/**
 * Upload screenshot to Supabase storage
 * @param imageBuffer - Buffer containing the image data
 * @param filename - Name for the uploaded file
 * @returns Public URL of the uploaded image
 */
export async function uploadScreenshot(
  imageBuffer: Buffer,
  filename: string
): Promise<string> {
  try {
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(imagesBucket)
      .upload(filename, imageBuffer, {
        contentType: 'image/webp',
        upsert: true,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Failed to upload screenshot: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(imagesBucket).getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error uploading screenshot:', error)
    throw error
  }
}

/**
 * Upload favicon to Supabase storage
 * @param imageBuffer - Buffer containing the favicon image data
 * @param filename - Name for the uploaded file
 * @param contentType - MIME type of the favicon (default: 'image/x-icon')
 * @returns Public URL of the uploaded favicon
 */
export async function uploadFavicon(
  imageBuffer: Buffer,
  filename: string,
  contentType: string = 'image/x-icon'
): Promise<string> {
  try {
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(faviconsBucket)
      .upload(filename, imageBuffer, {
        contentType,
        upsert: true,
      })

    if (error) {
      console.error('Supabase favicon upload error:', error)
      throw new Error(`Failed to upload favicon: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(faviconsBucket).getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error uploading favicon:', error)
    throw error
  }
}

/**
 * Upload image to Supabase storage (generic function for manual uploads)
 * @param imageBuffer - Buffer containing the image data
 * @param filename - Name for the uploaded file
 * @param contentType - MIME type of the image (default: 'image/*')
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  imageBuffer: Buffer,
  filename: string,
  contentType: string = 'image/*'
): Promise<string> {
  try {
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(imagesBucket)
      .upload(filename, imageBuffer, {
        contentType,
        upsert: true,
      })

    if (error) {
      console.error('Supabase image upload error:', error)
      throw new Error(`Failed to upload image: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(imagesBucket).getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

/**
 * Upload media (image or video) to Supabase storage
 * @param fileBuffer - Buffer containing the media data
 * @param filename - Name for the uploaded file
 * @param contentType - MIME type of the media
 * @returns Public URL of the uploaded media
 */
export async function uploadMedia(
  fileBuffer: Buffer,
  filename: string,
  contentType: string,
  bucket: 'videos' | 'images' | 'favicons' = 'images'
): Promise<string> {
  try {
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, fileBuffer, {
        contentType,
        upsert: true,
      })

    if (error) {
      console.error('Supabase media upload error:', error)
      throw new Error(`Failed to upload media: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error uploading media:', error)
    throw error
  }
}

/**
 * Delete image from Supabase storage
 * @param publicUrl - The public URL of the image to delete
 * @param bucket - The bucket name (default: 'images')
 * @returns Promise<void>
 */
export async function deleteMediaFromUrl(
  publicUrl: string,
  bucket: string = imagesBucket
): Promise<void> {
  if (!publicUrl) return

  try {
    // Extract filename from public URL
    // URL format: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{filename}
    const url = new URL(publicUrl)
    const pathParts = url.pathname.split('/')
    const filename = pathParts[pathParts.length - 1]

    if (!filename) {
      console.warn('Could not extract filename from URL:', publicUrl)
      return
    }

    // Delete from Supabase storage
    const { error } = await supabase.storage.from(bucket).remove([filename])

    if (error) {
      console.error('Supabase delete error:', error)
      throw new Error(`Failed to delete image: ${error.message}`)
    }

    console.log(
      `Successfully deleted image: ${filename} from bucket: ${bucket}`
    )
  } catch (error) {
    console.error('Error deleting image from URL:', publicUrl, error)
    // Don't throw - we don't want to block deletion if image cleanup fails
  }
}
