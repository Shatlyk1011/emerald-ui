import type {
  CollectionBeforeDeleteHook,
  CollectionBeforeChangeHook,
} from 'payload'
import { extractGradientColor } from '../../utils/extractColor'
import {
  deleteMediaFromUrl,
  uploadScreenshot,
  uploadFavicon,
  downloadMediaFromUrl,
  uploadMedia,
} from '../../utils/r2'
import { createUrlSlug, getFaviconExtension } from './utils'

export const beforeDeleteHook: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
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
        process.env.R2_FAVICONS_BUCKET || 'favicons'
      )
    }

    // Delete related media document if it exists
    if (doc.additionalMedia) {
      const mediaId =
        typeof doc.additionalMedia === 'string'
          ? doc.additionalMedia
          : doc.additionalMedia.id

      await req.payload.delete({
        collection: 'media',
        id: mediaId,
      })

      console.log(`Deleted related media document: ${mediaId}`)
    }

    console.log(`Deleted images for inspiration website: ${id}`)
  } catch (error) {
    console.error('Error deleting images during beforeDelete:', error)
    // Don't throw - we still want to delete the document even if image cleanup fails
  }
}

export const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  // Only auto-fetch images and favicons on creation, not on updates
  // This prevents re-fetching when users manually delete media
  const isCreating = operation === 'create' || !originalDoc
  let isExtracted = false

  // Handle screenshot capture
  if (data && data.pageUrl && !data.imgUrl && isCreating) {
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

        // Extract gradient color from the screenshot buffer
        try {
          const gradientColor = await extractGradientColor(publicUrl)
          data.gradientColor = gradientColor
          console.log('Gradient color extracted:', gradientColor)
          isExtracted = true
        } catch (error) {
          console.error('Error extracting gradient color:', error)
        }
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
      const res = await fetch(data.faviconUrl)
      if (!res.ok) {
        console.error('Favicon download error:', res.status, res.statusText)
        return
      }

      const buffer = Buffer.from(await res.arrayBuffer())
      const contentType = res.headers.get('content-type') ?? 'image/x-icon'

      const extension = getFaviconExtension(contentType, data.faviconUrl)
      const filename = `${createUrlSlug(data.pageUrl ?? data.faviconUrl)}.${extension}`

      const publicUrl = await uploadFavicon(buffer, filename, contentType)

      data.favicon = publicUrl
      console.log(
        'Favicon downloaded and uploaded:',
        publicUrl,
        'as',
        contentType
      )
    } catch (error) {
      console.error('Error processing favicon:', error)
    }
  }

  // Handle manual image URL changes - extract color from the new URL
  if (
    data &&
    data.imgUrl &&
    originalDoc &&
    data.imgUrl !== originalDoc.imgUrl &&
    !isExtracted
  ) {
    try {
      const gradientColor = await extractGradientColor(data.imgUrl)
      data.gradientColor = gradientColor
      console.log('Gradient color extracted from manual URL:', gradientColor)
    } catch (error) {
      console.error('Error extracting gradient color from URL:', error)
    }
  }

  // Handle videoUrl downloading and Media collection creation
  if (data && data.videoUrl) {
    const isNewVideoUrl =
      isCreating || (originalDoc && data.videoUrl !== originalDoc.videoUrl)

    if (isNewVideoUrl) {
      try {
        console.log(`Downloading video from: ${data.videoUrl}`)
        const { buffer, contentType, filename } = await downloadMediaFromUrl(
          data.videoUrl
        )

        const publicUrl = await uploadMedia(
          buffer,
          filename,
          contentType,
          'videos'
        )
        console.log(`Video downloaded and uploaded to R2: ${publicUrl}`)

        const newMedia = await req.payload.create({
          collection: 'media',
          data: {
            pageUrl: data.pageUrl || '',
            type: 'video',
            mediaUrl: publicUrl,
            altText: data.title
              ? `${data.title} video preview`
              : 'Video Preview',
          },
        })
        console.log(`Created new media document: ${newMedia.id}`)

        // Attach the new media to the inspiration website if not already present
        if (!data.additionalMedia) {
          data.additionalMedia = newMedia.id
        }
      } catch (error) {
        console.error('Error processing videoUrl:', error)
      }
    }
  }

  return data
}
