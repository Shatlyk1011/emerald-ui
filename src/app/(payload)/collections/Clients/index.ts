import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const Clients: CollectionConfig = {
  slug: 'clients',
  access: {
    // Only server-side can create (via auth callback)
    create: admins,
    update: admins,
    delete: admins,
    read: ({ req }) => {
      // Allow users to read only their own client record
      if (req.user && req.context?.userId) {
        return {
          userId: {
            equals: req.context.userId,
          },
        }
      }
      // Admins can read all
      return admins({ req })
    },
  },
  admin: {
    defaultColumns: [
      'userId',
      'createdAt',
      'email',
      'currentPlan',
      'provider',
      'isVerified',
      'isBlocked',
    ],
    useAsTitle: 'userId',
    description:
      'Manage client accounts and their subscription plans. Each client is linked to their credit history.',
  },
  fields: [
    {
      name: 'userId',
      label: 'User ID',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Supabase user ID (unique identifier)',
        readOnly: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: false,
      admin: {
        description: 'User email address (optional, can be provided by user)',
        readOnly: true,
      },
    },
    {
      name: 'currentPlan',
      label: 'Current Plan',
      type: 'select',
      required: false,
      defaultValue: 'free',
      options: [
        { label: 'Free Plan', value: 'free' },
        { label: 'Pro Plan', value: 'pro' },
        { label: 'Enterprise Plan', value: 'enterprise' },
      ],
      admin: {
        description: 'User subscription plan',
      },
    },
    {
      name: 'isBlocked',
      label: 'Is Blocked',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Block this user from using credits and accessing services',
        position: 'sidebar',
      },
    },
    {
      name: 'provider',
      label: 'Auth Provider',
      type: 'select',
      required: false,
      defaultValue: 'n/a',
      options: [
        { label: 'N/A', value: 'n/a' },
        { label: 'Email (Magic Link)', value: 'email' },
        { label: 'Google', value: 'google' },
        { label: 'GitHub', value: 'github' },
      ],
      admin: {
        description: 'Authentication provider used during registration',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'isVerified',
      label: 'Email Verified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether the user has verified their email address',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'creditHistory',
      label: 'Credit History',
      type: 'relationship',
      relationTo: 'credit-history',
      hasMany: true,
      admin: {
        description: 'All credit transactions for this user',
      },
    },
  ],
  timestamps: true,
}

export default Clients
