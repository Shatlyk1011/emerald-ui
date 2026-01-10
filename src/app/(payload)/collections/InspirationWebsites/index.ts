import { CollectionConfig } from 'payload';
import { uploadScreenshot } from '../../utils/supabase';





const InspirationWebsites: CollectionConfig = {
  slug: 'inpiration-websites',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        // If we have a pageUrl but no imgUrl, fetch screenshot and upload
        console.log('DOC', doc)

        if (doc.pageUrl && !doc.imgUrl) {
          try {
            // Build Scrnify API URL with proper parameters
            const apiUrl = new URL('https://api.scrnify.com/capture')
            apiUrl.searchParams.set('key', 'sLofaw2ETcujMegENZ8T0142bL_Kvt25')
            apiUrl.searchParams.set('url', doc.pageUrl)
            apiUrl.searchParams.set('type', 'image')
            apiUrl.searchParams.set('format', 'jpeg')
            apiUrl.searchParams.set('quality', '75')
            apiUrl.searchParams.set('width', '1920')
            apiUrl.searchParams.set('height', '1080')
            apiUrl.searchParams.set('waitUntil', 'firstMeaningfulPaint')
            apiUrl.searchParams.set('blockCookieDefault', 'true')

            console.log('Fetching screenshot from:', apiUrl.toString())
            const res = await fetch(apiUrl.toString())
            console.log('res', res)

            if (res.ok) {
              const buffer = await res.arrayBuffer()
              const screenshotBuffer = Buffer.from(buffer)

              console.log('doc.pageUrl', doc.pageUrl)
              if (screenshotBuffer) {
                // Generate filename from URL
                const urlSlug = doc.pageUrl
                  .replace(/^https?:\/\//, '')
                  .replace(/[^a-z0-9]/gi, '-')
                  .toLowerCase()
                const filename = `${urlSlug}-${Date.now()}.jpeg`

                // Upload to Supabase
                const publicUrl = await uploadScreenshot(
                  screenshotBuffer,
                  filename
                )
                // Attach the URL to the document
                doc.imgUrl = publicUrl
              }
            }
          } catch (error) {
            console.error('Error processing screenshot:', error)
            // Don't throw - allow the read to continue even if screenshot fails
          }
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: false,
    },
    {
      name: 'style',
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      name: 'pageUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'URL of the website to capture screenshot from',
      },
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
      required: false,
    },
    {
      name: 'imgUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'faviconUrl',
      type: 'text',
      required: false,
    },
  ],
}

export default InspirationWebsites
