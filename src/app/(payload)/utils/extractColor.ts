import { FastAverageColor } from 'fast-average-color'

/**
 * Extracts the dominant color from an image buffer and returns a gradient string
 * @param imageBuffer - Buffer containing the image data
 * @returns A CSS gradient string or 'transparent' if extraction fails
 */
export async function extractGradientColor(imageBuffer: Buffer): Promise<string> {
  const fac = new FastAverageColor()
  
  try {
    // Convert buffer to base64 data URL for fast-average-color
    const base64 = imageBuffer.toString('base64')
    const dataUrl = `data:image/webp;base64,${base64}`
    
    // Extract color using the same algorithm as the client-side implementation
    const color = await fac.getColorAsync(dataUrl, { 
      algorithm: 'simple', 
      mode: 'speed' 
    })
    
    // Return the same gradient format used in SiteCard component
    const gradient = `linear-gradient(to right, ${color.rgb.replace(')', ', 0.25)')}, ${color.rgb.replace(')', ', 0.12)')})`
    
    return gradient
  } catch (error) {
    console.error('Error extracting color from image:', error)
    return 'transparent'
  } finally {
    fac.destroy()
  }
}

/**
 * Extracts the dominant color from an image URL and returns a gradient string
 * @param imageUrl - URL of the image to extract color from
 * @returns A CSS gradient string or 'transparent' if extraction fails
 */
export async function extractGradientColorFromUrl(imageUrl: string): Promise<string> {
  const fac = new FastAverageColor()
  
  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Use the buffer extraction function
    return await extractGradientColor(buffer)
  } catch (error) {
    console.error('Error extracting color from URL:', error)
    return 'transparent'
  } finally {
    fac.destroy()
  }
}
