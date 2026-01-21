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
      type: 'text',
      required: false,
      admin: {
        description: 'Original website URL (for screenshots)',
        position: 'sidebar',
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
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
      required: false,
      admin: {
        position: 'sidebar',
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
