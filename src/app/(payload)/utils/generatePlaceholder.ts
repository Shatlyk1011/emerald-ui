import sharp from 'sharp'

/**
 * Generates a tiny blurred base64-encoded placeholder from an image URL
 * @param imageUrl - URL of the image to generate placeholder from
 * @returns Base64-encoded data URI of the blurred placeholder
 */
export async function generatePlaceholder(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.error('Failed to fetch image for placeholder:', response.status)
      return ''
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate a tiny 20px wide blurred image for fast loading
    const placeholder = await sharp(buffer)
      .resize(20, null, { fit: 'inside' })
      .blur(10)
      .webp({ quality: 20 })
      .toBuffer()

    return `data:image/webp;base64,${placeholder.toString('base64')}`
  } catch (error) {
    console.error('Error generating placeholder:', error)
    return ''
  }
}
