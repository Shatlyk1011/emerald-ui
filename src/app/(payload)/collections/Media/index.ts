import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'
import { beforeDeleteHook, afterChangeHook } from './hooks'

const Media: CollectionConfig = {
  slug: 'media',

  hooks: {
    beforeDelete: [beforeDeleteHook],
    afterChange: [afterChangeHook],
  },

  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  admin: {
    defaultColumns: ['pageUrl', 'mediaUrl', 'description'],
    useAsTitle: 'pageUrl',
    description:
      'Upload and manage additional media assets (images and videos) for inspiration websites. Media items are automatically linked to InspirationWebsites when pageUrl matches.',
  },

  fields: [
    {
      name: 'pageUrl',
      label: 'Site URL',
      required: true,
      type: 'text',
      admin: {
        description: "The original website's url",
        position: 'sidebar',
      },
    },

    {
      name: 'type',
      label: 'Media Type',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      required: false,
      admin: {
        description: 'Type of media (auto-detected from file)',
        position: 'sidebar',
      },
    },

    {
      name: 'mediaUrl',
      label: 'Media URL (Supabase)',
      required: false,
      type: 'text',
      admin: {
        description: 'Upload image or video directly to Supabase',
        components: {
          Field: {
            path: '@/app/(payload)/components/MediaUploadField#MediaUploadField',
            exportName: 'MediaUploadField',
          },
        },
      },
    },
    {
      name: 'altText',
      label: 'Alt Text',
      required: false,
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      label: 'Description',
      required: false,
      type: 'textarea',
    },
    {
      name: 'size',
      label: 'Size (bytes)',
      type: 'number',
      required: false,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'File size in bytes',
      },
    },
  ],
  labels: { plural: 'Media', singular: 'Media' },
  timestamps: true,
}

export default Media
