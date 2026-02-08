import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins';

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
      return !!req.user
    },
  },
  admin: {
    defaultColumns: ['userId', 'createdAt', 'creditAmount', 'type'],
    useAsTitle: 'userId',
    description:
      'Track user credit history including monthly free credits and purchased credits. Credits expire after 1 month.',
  },

  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data.userId) {
          try {
            const client = await req.payload.find({
              collection: 'clients',
              where: {
                userId: {
                  equals: data.userId,
                },
              },
            })

            if (client.docs.length > 0) {
              data.client = client.docs[0].id
            }
          } catch (error) {
            console.error('Error linking credit history to client:', error)
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
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
      defaultValue: 3,
      min: 0,
      admin: {
        description:
          'Number of credits (3 for monthly free, variable for purchased)',
      },
    },
    {
      name: 'source',
      label: 'Credit Source',
      type: 'select',
      required: true,
      defaultValue: 'monthly_free',
      options: [
        { label: 'Monthly Free Credits', value: 'monthly_free' },
        { label: 'Purchased Credits', value: 'purchased' },
        { label: 'Signup Bonus', value: 'signup_bonus' },
      ],
      admin: {
        description: 'Type of credit allocation',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Expired', value: 'expired' },
      ],
      admin: {
        description: 'Status of the credit',
      },
    },
    {
      name: 'creditsSpent',
      label: 'Credits Spent',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Amount of credits spent from this allocation',
      },
    },
    {
      name: 'expirationDate',
      label: 'Expiration Date',
      type: 'date',
      admin: {
        description: 'Date when these credits expire',
      },
    },
  ],
  timestamps: true,
}

export default CreditHistory
