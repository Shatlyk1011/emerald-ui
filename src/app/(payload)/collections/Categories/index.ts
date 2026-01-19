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
    afterRead: [
      // does it work in production? (check requests)
      async ({ req }) => {
        // Get total count of categories
        const { totalDocs } = await req.payload.count({
          collection: 'categories',
        })

        // If there are 5 or fewer categories, return them all
        if (totalDocs <= 5) {
          const allDocs = await req.payload.find({
            collection: 'categories',
            limit: totalDocs,
          })
          return allDocs.docs
        }

        // Generate 5 random indices
        const randomIndices = new Set<number>()
        while (randomIndices.size < 5) {
          randomIndices.add(Math.floor(Math.random() * totalDocs))
        }

        // Fetch documents at random positions
        const randomDocs = await Promise.all(
          Array.from(randomIndices).map(async (index) => {
            const result = await req.payload.find({
              collection: 'categories',
              limit: 1,
              page: index + 1,
            })
            return result.docs[0]
          })
        )

        return randomDocs.filter(Boolean)
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
      unique: true,
    },
    {
      name: 'value',
      label: 'Value',
      required: true,
      type: 'text',
      unique: true,
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
