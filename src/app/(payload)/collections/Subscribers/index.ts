import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  access: {
    // Public can create (subscribe)
    create: () => true,
    // Only admins can read, update, delete
    read: admins,
    update: admins,
    delete: admins,
  },
  admin: {
    defaultColumns: ['email', 'status', 'source', 'createdAt'],
    useAsTitle: 'email',
    description:
      'Manage newsletter subscribers. Users can subscribe publicly, but only admins can view and manage subscriptions.',
  },
  fields: [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Subscriber email address (must be unique)',
      },
    },
    {
      name: 'status',
      label: 'Subscription Status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      admin: {
        description: 'Current subscription status',
      },
    },
    {
      name: 'source',
      label: 'Subscription Source',
      type: 'text',
      required: false,
      defaultValue: 'website',
      admin: {
        description: 'Where the subscriber signed up (e.g., hero)',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default Subscribers
