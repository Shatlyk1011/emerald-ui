import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const CreditHistory: CollectionConfig = {
  slug: 'credit-history',
  access: {
    // Only admins can create via admin panel
    // Users get credits via cron job or Stripe webhook
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
    defaultColumns: ['userId', 'creditAmount', 'type', 'createdDate', 'expiredDate'],
    useAsTitle: 'userId',
    description:
      'Track user credit history including monthly free credits and purchased credits. Credits expire after 1 month.',
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Auto-set createdDate if not provided
          if (!data.createdDate) {
            data.createdDate = new Date().toISOString()
          }

          // Auto-calculate expiration date (1 month from creation)
          if (!data.expiredDate) {
            const createdDate = new Date(data.createdDate)
            const expiredDate = new Date(createdDate)
            expiredDate.setMonth(expiredDate.getMonth() + 1)
            data.expiredDate = expiredDate.toISOString()
          }
        }
        return data
      },
    ],
    beforeRead: [
      async ({ doc }) => {
        // Auto-update isExpired status based on current date
        if (doc.expiredDate) {
          const now = new Date()
          const expiredDate = new Date(doc.expiredDate)
          doc.isExpired = now > expiredDate
        }
        return doc
      },
    ],
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
        description: 'Number of credits (5 for monthly free, variable for purchased)',
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
    {
      name: 'createdDate',
      label: 'Created Date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date when credits were allocated',
      },
    },
    {
      name: 'expiredDate',
      label: 'Expiration Date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date when credits expire (1 month from creation)',
      },
    },
    {
      name: 'isExpired',
      label: 'Is Expired',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Auto-calculated based on expiration date',
        position: 'sidebar',
      },
    },
    {
      name: 'isBlocked',
      label: 'Is Blocked',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Block these credits from being used',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default CreditHistory
