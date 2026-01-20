import type { CollectionBeforeDeleteHook, CollectionBeforeChangeHook } from 'payload'
import { deleteMediaFromUrl, uploadScreenshot, uploadFavicon } from '../../utils/supabase'

export const beforeDeleteHook: CollectionBeforeDeleteHook = async ({ id, req }) => {
  try {
    // Fetch the document to get image URLs
    const doc = await req.payload.findByID({
      collection: 'inspiration-websites',
      id,
    })

    // Delete screenshot from images bucket
    if (doc.imgUrl) {
      await deleteMediaFromUrl(doc.imgUrl)
    }

    // Delete favicon from favicons bucket
    if (doc.favicon) {
      await deleteMediaFromUrl(
        doc.favicon,
        process.env.SUPABASE_FAVICONS_BUCKET || 'favicons'
      )
    }

    console.log(`Deleted images for inspiration website: ${id}`)
  } catch (error) {
    console.error('Error deleting images during beforeDelete:', error)
    // Don't throw - we still want to delete the document even if image cleanup fails
  }
}

export const beforeChangeHook: CollectionBeforeChangeHook = async ({ data }) => {
  // Handle screenshot capture
  if (data && data.pageUrl && !data.imgUrl) {
    try {
      // make screenshot
      const apiUrl = new URL('https://api.scrnify.com/capture')
      apiUrl.searchParams.set('key', process.env.SCRIFY_TOKEN || '')
      apiUrl.searchParams.set('url', data.pageUrl)
      apiUrl.searchParams.set('type', 'image')
      apiUrl.searchParams.set('format', 'webp')
      apiUrl.searchParams.set('quality', '70')
      apiUrl.searchParams.set('width', '1200')
      apiUrl.searchParams.set('height', '900')
      apiUrl.searchParams.set('waitUntil', 'firstMeaningfulPaint')
      apiUrl.searchParams.set('blockCookieDefault', 'true')

      const res = await fetch(apiUrl.toString())

      if (res.ok) {
        const buffer = await res.arrayBuffer()
        const screenshotBuffer = Buffer.from(buffer)

        const urlSlug = data.pageUrl
          .replace(/^https?:\/\//, '')
          .replace(/[^a-z0-9]/gi, '-')
          .toLowerCase()
        const filename = `${urlSlug}.webp`

        const publicUrl = await uploadScreenshot(screenshotBuffer, filename)

        data.imgUrl = publicUrl
        console.log('Screenshot captured and uploaded:', publicUrl)
      } else {
        console.error('Scrnify API error:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('Error processing screenshot:', error)
    }
  }

  // Handle favicon download and upload
  if (data && data.faviconUrl && !data.favicon) {
    try {
      const faviconRes = await fetch(data.faviconUrl)

      if (faviconRes.ok) {
        const buffer = await faviconRes.arrayBuffer()
        const faviconBuffer = Buffer.from(buffer)

        // Create filename from the URL
        const urlSlug = data.pageUrl
          ? data.pageUrl
              .replace(/^https?:\/\//, '')
              .replace(/[^a-z0-9]/gi, '-')
              .toLowerCase()
          : data.faviconUrl
              .replace(/^https?:\/\//, '')
              .replace(/[^a-z0-9]/gi, '-')
              .toLowerCase()

        const filename = `${urlSlug}.webp`

        const publicUrl = await uploadFavicon(faviconBuffer, filename)

        data.favicon = publicUrl
        console.log('Favicon downloaded and uploaded:', publicUrl)
      } else {
        console.error(
          'Favicon download error:',
          faviconRes.status,
          faviconRes.statusText
        )
      }
    } catch (error) {
      console.error('Error processing favicon:', error)
    }
  }

  return data
}
