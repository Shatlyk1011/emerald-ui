import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins';
import { uploadScreenshot } from '../../utils/supabase';

const InspirationWebsites: CollectionConfig = {
  slug: 'inspiration-websites',
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
    beforeChange: [
      async ({ data }) => {
        if (data && data.pageUrl && !data.imgUrl) {
          try {
            const apiUrl = new URL('https://api.scrnify.com/capture')
            apiUrl.searchParams.set('key', process.env.SCRIFY_TOKEN || '')
            apiUrl.searchParams.set('url', data.pageUrl)
            apiUrl.searchParams.set('type', 'image')
            apiUrl.searchParams.set('format', 'jpeg')
            apiUrl.searchParams.set('quality', '75')
            apiUrl.searchParams.set('width', '1200')
            apiUrl.searchParams.set('height', '900')
            apiUrl.searchParams.set('waitUntil', 'firstImagePaint')
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
              console.log('Screenshot captured and uploaded:', publicUrl)
              return data
            } else {
              console.error('Scrnify API error:', res.status, res.statusText)
            }
          } catch (error) {
            console.error('Error processing screenshot:', error)
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
    {
      name: 'isVisible',
      type: 'checkbox',
      required: false,
      defaultValue: true,
    },
  ],
}

export default InspirationWebsites
