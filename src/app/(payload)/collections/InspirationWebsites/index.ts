import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins';
import { beforeDeleteHook, beforeChangeHook } from './hooks';


























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
    useAsTitle: 'pageUrl',
    description:
      'Main collection for storing website inspiration entries. Automatically captures screenshots and favicons from provided URLs. Supports categorization, styling tags, and additional media attachments.',
  },
  hooks: {
    beforeDelete: [beforeDeleteHook],
    beforeChange: [beforeChangeHook],
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
      label: 'Site URL',
      type: 'text',
      required: false,
      admin: {
        description: 'Original website URL (for screenshots)',
        position: 'sidebar',
      },
      // @ts-expect-error - Payload validation types are complex, but this function works correctly
      validate: async (value: string, options) => {
        if (!value) return true

        const { req, id } = options

        // Normalize URL for comparison
        const normalizeUrl = (url: string) => {
          return url
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/\/$/, '')
            .toLowerCase()
        }

        const normalizedValue = normalizeUrl(value)

        // Query for existing documents with the same URL
        const existingDocs = await req.payload.find({
          collection: 'inspiration-websites',
          where: {
            pageUrl: {
              exists: true,
            },
          },
          limit: 100,
        })

        // Check if any existing document has the same normalized URL
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const duplicate = existingDocs.docs.find((doc: any) => {
          // Skip the current document when updating
          if (id && doc.id === id) return false

          if (doc.pageUrl) {
            const existingNormalized = normalizeUrl(doc.pageUrl)
            return existingNormalized === normalizedValue
          }
          return false
        })

        if (duplicate) {
          return `This website URL already exists: ${duplicate.pageUrl}`
        }

        return true
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
        position: 'sidebar',
      },
    },
    {
      name: 'favicon',
      type: 'text',
      required: false,
      admin: {
        description: 'Favicon URL (auto-generated from faviconUrl)',
        position: 'sidebar',
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
      name: 'additionalMedia',
      label: 'Additonal Media',
      relationTo: 'media',
      required: false,
      type: 'relationship',
      admin: {
        description: 'Additional media (video or image)',
        components: {
          afterInput: [
            {
              path: '@/app/(payload)/components/AdditionalMediaPreviewField#AdditionalMediaPreviewField',
              exportName: 'AdditionalMediaPreviewField',
            },
          ],
        },
      },
    },
    
    {
      name: 'isVisible',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default InspirationWebsites
