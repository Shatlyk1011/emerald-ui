import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Run on both create and update operations
        if ((operation === 'create' || operation === 'update') && doc.value) {
          try {
            // Find all documents with the same value
            const duplicates = await req.payload.find({
              collection: 'categories',
              where: {
                value: { equals: doc.value },
                id: { not_equals: doc.id },
              },
            })

            // Delete all duplicates
            if (duplicates.docs.length > 0) {
              for (const duplicate of duplicates.docs) {
                await req.payload.delete({
                  collection: 'categories',
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

  admin: {
    defaultColumns: ['category', 'value'],
    useAsTitle: 'category',
  },

  fields: [
    {
      name: 'category',
      label: 'Categories',
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
  labels: { plural: 'Categories', singular: 'Category' },
  timestamps: false,
}

export default Categories
