import { createClient } from '@supabase/supabase-js'




// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''
const bucketName = process.env.SUPABASE_IMAGES_BUCKET || 'images'

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
      .from(bucketName)
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Failed to upload screenshot: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(data.path)

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
 * @returns Public URL of the uploaded favicon
 */
export async function uploadFavicon(
  imageBuffer: Buffer,
  filename: string
): Promise<string> {
  const faviconBucket = process.env.SUPABASE_FAVICONS_BUCKET || 'favicons'

  try {
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(faviconBucket)
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      })

    if (error) {
      console.error('Supabase favicon upload error:', error)
      throw new Error(`Failed to upload favicon: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(faviconBucket).getPublicUrl(data.path)

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
      .from(bucketName)
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
    } = supabase.storage.from(bucketName).getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
