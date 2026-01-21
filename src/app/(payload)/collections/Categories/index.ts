import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'
import { afterChangeHook } from './hooks'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  hooks: {
    afterChange: [afterChangeHook],
  },

  admin: {
    defaultColumns: ['category', 'value'],
    useAsTitle: 'category',
    description:
      'Manage website categories for organizing inspiration entries. Categories provide taxonomical classification to help filter and group websites by type or purpose.',
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
      admin: {
        position: 'sidebar',
      },
    },
  ],
  labels: { plural: 'Categories', singular: 'Category' },
  timestamps: false,
}

export default Categories
