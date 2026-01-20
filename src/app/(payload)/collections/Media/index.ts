import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins';
import { beforeDeleteHook } from './hooks'

const Media: CollectionConfig = {
  slug: 'media',

  hooks: {
    beforeDelete: [beforeDeleteHook],
  },

  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  admin: {
    defaultColumns: ['siteUrl', 'mediaUrl', 'description'],
    useAsTitle: 'siteUrl',
  },

  fields: [
    {
      name: 'siteUrl',
      label: 'Site URL',
      required: true,
      type: 'text',
      admin: {
        description: "The original website's url",
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
  ],
  labels: { plural: 'Media', singular: 'Media' },
  timestamps: true,
}

export default Media
