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
      name: 'additionalMediaType',
      label: 'Additional Media Type',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      required: false,
      admin: {
        description:
          'Specify whether the additional media is an image or video',
        condition: (data) => !!data.additionalMedia,
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
