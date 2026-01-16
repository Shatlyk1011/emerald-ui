import { CollectionConfig } from "payload";
import { admins } from "../../utils/admins";









const WebsiteStyle: CollectionConfig = {
  slug: 'website-style',
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Only run on create operations
        if (operation === 'create' && data.style) {
          const styleValue = data.style.trim()

          if (styleValue.includes(',')) {
            // Split the string by comma
            const styles: string[] =
              styleValue
                .split(',')
                .map((style: string) => style.trim())
                .filter((style: string) => style.length > 0) || []

            if (styles.length > 0) {
              // Create the first style with the current data
              data.style = styles[0]
              data.value = styles[0]
            }

            // Create additional styles for the remaining items
            for (let i = 1; i < styles.length; i++) {
              await req.payload.create({
                collection: 'website-style',
                data: {
                  style: styles[i],
                  value: styles[i],
                  // Copy other fields from data if needed
                },
                req,
              })
            }
          }
        }

        return data
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
  labels: { plural: 'Website Style', singular: 'Website Style' },
  timestamps: false,
}

export default WebsiteStyle
