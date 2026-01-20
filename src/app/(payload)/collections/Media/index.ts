import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'
import { uploadImage } from '../../utils/supabase'

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: './public/uploads',
    mimeTypes: ['image/*', 'video/*'],
  },
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Only process when a new file is uploaded
        if (data && !data.imgUrl) {
          try {
            // Get the file path
            const fs = await import('fs/promises')
            const path = await import('path')
            const urlSlug = data.siteUrl
              .replace(/^https?:\/\//, '')
              .replace(/[^a-z0-9]/gi, '-')
              .toLowerCase()
            const filename = `${urlSlug}-${Date.now()}`

            // Construct the file path
            const filePath = path.join(
              process.cwd(),
              'public',
              'uploads',
              filename
            )

            console.log('filePath', filePath)

            const fileBuffer = await fs.readFile(filePath)

            const contentType = 'image/webp'

            const publicUrl = await uploadImage(
              fileBuffer,
              filename,
              contentType
            )
            console.log('publicUrl', publicUrl)

            // Update the document with the Supabase URL
            await req.payload.update({
              collection: 'media',
              id: data.id,
              data: {
                imgUrl: publicUrl,
              },
              req,
            })

            console.log('Image uploaded to Supabase:', publicUrl)
          } catch (error) {
            console.error('Error uploading image to Supabase:', error)
          }
        }

        return data
      },
    ],
  },

  admin: {
    defaultColumns: ['siteUrl', 'description', 'mediaUrl', 'imgUrl'],
    useAsTitle: 'siteUrl',
  },

  fields: [
    {
      name: 'siteUrl',
      label: 'Site URL',
      required: true,
      type: 'text',
    },
    {
      name: 'imgUrl',
      label: 'Image URL (Supabase)',
      required: false,
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Public URL of the image stored in Supabase',
      },
    },
    {
      name: 'mediaUrl',
      label: 'Media URL (Custom Upload)',
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
    },
    {
      name: 'description',
      label: 'Description',
      required: false,
      type: 'textarea',
    },
  ],
  labels: { plural: 'Media', singular: 'Image' },
  timestamps: true,
}

export default Media
