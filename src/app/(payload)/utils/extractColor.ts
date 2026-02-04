import { getAverageColor } from 'fast-average-color-node'

/**
 * Extracts the dominant color from an image buffer and returns a gradient string
 * @param imageBuffer - Buffer containing the image data
 * @returns A CSS gradient string or 'transparent' if extraction fails
 */
export async function extractGradientColor(imgUrl: string): Promise<string> {
  try {
    // Extract color using the same algorithm as the client-side implementation
    const { rgb } = await getAverageColor(imgUrl, {
      algorithm: 'dominant',
      mode: 'speed',
    })

    // Return the same gradient format used in SiteCard component
    const gradient = `linear-gradient(to right, ${rgb.replace(')', ', 0.12)')}, ${rgb.replace(')', ', 0.10)')})`

    return gradient
  } catch (error) {
    console.error('Error extracting color from image:', error)
    return 'transparent'
  }
}
