import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const WebsiteStyle: CollectionConfig = {
  slug: 'website-style',
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Run on both create and update operations
        if ((operation === 'create' || operation === 'update') && doc.value) {
          try {
            // Find all documents with the same value
            const duplicates = await req.payload.find({
              collection: 'website-style',
              where: {
                value: { equals: doc.value },
                id: { not_equals: doc.id },
              },
            })

            // Delete all duplicates
            if (duplicates.docs.length > 0) {
              for (const duplicate of duplicates.docs) {
                await req.payload.delete({
                  collection: 'website-style',
                  id: duplicate.id,
                  req,
                })
              }
              console.log(
                `Removed ${duplicates.docs.length} duplicate(s) for value: ${doc.value}`
              )
            }
          } catch (error) {
            console.error('Error removing duplicates:', error)
          }
        }

        return doc
      },
    ],
  },
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  admin: {
    defaultColumns: ['style', 'value'],

    useAsTitle: 'style',
  },

  fields: [
    {
      name: 'style',
      label: 'Website Style',
      required: true,
      type: 'text',
      unique: false,
    },
    {
      name: 'value',
      label: 'Value',
      required: true,
      type: 'text',
      unique: false,
    },
    {
      name: 'order',
      label: 'Order',
      required: false,
      type: 'number',
    },
  ],
  labels: { plural: 'Website Style', singular: 'Website Style' },
  timestamps: false,
}

export default WebsiteStyle
