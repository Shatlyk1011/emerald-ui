import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins'
import { beforeChangeHook, afterChangeHook } from './hooks'

const WebsiteStyle: CollectionConfig = {
  slug: 'website-style',
  hooks: {
    beforeChange: [beforeChangeHook],
    afterChange: [afterChangeHook],
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
