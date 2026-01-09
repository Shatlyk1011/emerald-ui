import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''
const bucketName = process.env.SUPABASE_IMAGES_BUCKET || 'screenshots'

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
        contentType: 'image/jpeg',
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
