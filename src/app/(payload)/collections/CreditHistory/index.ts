import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const CreditHistory: CollectionConfig = {
  slug: 'credit-history',
  access: {
    // Only admins can create via admin panel
    // INVESTIGATE
    create: ({ req }) => {
      // Allow if user is authenticated through Supabase and has userId
      if (req.user && req.context?.userId) {
        return true
      }
      // Allow admins
      return !!req.user
    },
    update: admins,
    delete: admins,
    read: ({ req }) => {
      // Allow users to read only their own credit history
      if (req.user && req.context?.userId) {
        return {
          userId: {
            equals: req.context.userId,
          },
        }
      }
      // Admins can read all
      if (req.user) {
        return true
      }
      return false
    },
  },
  admin: {
    defaultColumns: [
      'userId',
      'createdAt',
      'creditAmount',
      'type',
    ],
    useAsTitle: 'userId',
    description:
      'Track user credit history including monthly free credits and purchased credits. Credits expire after 1 month.',
  },

  fields: [
    {
      name: 'userId',
      label: 'User ID',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Supabase user ID',
      },
    },
    {
      name: 'creditAmount',
      label: 'Credit Amount',
      type: 'number',
      required: true,
      defaultValue: 5,
      min: 0,
      admin: {
        description:
          'Number of credits (5 for monthly free, variable for purchased)',
      },
    },
    {
      name: 'type',
      label: 'Credit Type',
      type: 'select',
      required: true,
      defaultValue: 'monthly_free',
      options: [
        { label: 'Monthly Free Credits', value: 'monthly_free' },
        { label: 'Purchased Credits', value: 'purchased' },
      ],
      admin: {
        description: 'Type of credit allocation',
      },
    },
  
  ],
  timestamps: true,
}

export default CreditHistory
