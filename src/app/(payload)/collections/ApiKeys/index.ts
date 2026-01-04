import { CollectionConfig } from 'payload'

const ApiKeys: CollectionConfig = {
  slug: 'api-keys',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

export default ApiKeys
