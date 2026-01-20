import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'
import { uploadScreenshot, uploadFavicon } from '../../utils/supabase'

const InspirationWebsites: CollectionConfig = {
  slug: 'inspiration-websites',
  access: {
    create: admins,
    update: admins,
    read: () => true,
    delete: admins,
  },
  admin: {
    defaultColumns: ['pageUrl', 'title', 'imgUrl', 'favicon'],
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
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

              const publicUrl = await uploadScreenshot(
                screenshotBuffer,
                filename
              )

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
        description: 'Original website URL (for screenshots)',
      },
    },

    {
      name: 'imgUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'Screenshot URL (auto-generated from pageUrl)',
        components: {
          afterInput: [
            {
              path: '@/app/(payload)/components/ImagePreviewField#ImagePreviewField',
              exportName: 'ImagePreviewField',
            },
          ],
        },
      },
    },
    {
      name: 'faviconUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'Original favicon URL',
      },
    },
    {
      name: 'favicon',
      type: 'text',
      required: false,
      admin: {
        description: 'Favicon URL (auto-generated from faviconUrl)',
        components: {
          afterInput: [
            {
              path: '@/app/(payload)/components/FaviconPreviewField#FaviconPreviewField',
              exportName: 'FaviconPreviewField',
            },
          ],
        },
      },
    },
    {
      name: 'videoUrl',
      label: 'Video',
      // te
      relationTo: 'media',
      required: false,
      type: 'relationship',
      admin: {
        description: 'Video',
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
      name: 'isVisible',
      type: 'checkbox',
      required: false,
      defaultValue: true,
    },
  ],
}

export default InspirationWebsites
