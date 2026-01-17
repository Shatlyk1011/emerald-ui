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
