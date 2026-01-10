import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins';
import { uploadScreenshot } from '../../utils/supabase';






const InspirationWebsites: CollectionConfig = {
  slug: 'inpiration-websites',
  access: {
    create: admins,
    update: admins,
    read: () => true,
    delete: admins,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterOperation: [
      async ({ operation, result }) => {
        if (
          operation === 'create' &&
          result &&
          result.pageUrl &&
          !result.imgUrl
        ) {
          try {
            const apiUrl = new URL('https://api.scrnify.com/capture')
            apiUrl.searchParams.set('key', 'sLofaw2ETcujMegENZ8T0142bL_Kvt25')
            apiUrl.searchParams.set('url', result.pageUrl)
            apiUrl.searchParams.set('type', 'image')
            apiUrl.searchParams.set('format', 'jpeg')
            apiUrl.searchParams.set('quality', '75')
            apiUrl.searchParams.set('width', '1920')
            apiUrl.searchParams.set('height', '1080')
            apiUrl.searchParams.set('waitUntil', 'firstMeaningfulPaint')
            apiUrl.searchParams.set('blockCookieDefault', 'true')

            const res = await fetch(apiUrl.toString())

            if (res.ok) {
              const buffer = await res.arrayBuffer()
              const screenshotBuffer = Buffer.from(buffer)

              const urlSlug = result.pageUrl
                .replace(/^https?:\/\//, '')
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
              const filename = `${urlSlug}-${Date.now()}.jpeg`

              const publicUrl = await uploadScreenshot(
                screenshotBuffer,
                filename
              )

              result.imgUrl = publicUrl
            }
          } catch (error) {
            console.error('Error processing screenshot:', error)
          }
        }
        return result
      },
    ],
    afterChange: [
      async ({ data }) => {
        if (data && data.pageUrl && !data.imgUrl) {
          try {
            const apiUrl = new URL('https://api.scrnify.com/capture')
            apiUrl.searchParams.set('key', 'sLofaw2ETcujMegENZ8T0142bL_Kvt25')
            apiUrl.searchParams.set('url', data.pageUrl)
            apiUrl.searchParams.set('type', 'image')
            apiUrl.searchParams.set('format', 'jpeg')
            apiUrl.searchParams.set('quality', '75')
            apiUrl.searchParams.set('width', '1920')
            apiUrl.searchParams.set('height', '1080')
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
              const filename = `${urlSlug}-${Date.now()}.jpeg`

              const publicUrl = await uploadScreenshot(
                screenshotBuffer,
                filename
              )

              data.imgUrl = publicUrl
            }
          } catch (error) {
            console.error('Error 2 processing screenshot:', error)
          }
        }
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
