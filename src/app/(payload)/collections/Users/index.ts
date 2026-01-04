import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: false, // Disable Payload's built-in auth since we're using Auth0
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'auth0Id',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'picture',
      type: 'text',
    },
    {
      name: 'provider',
      type: 'text', // 'google' or 'github'
    },
    {
      name: 'lastLogin',
      type: 'date',
    },
    {
      name: 'loginHistory',
      type: 'array',
      fields: [
        {
          name: 'timestamp',
          type: 'date',
        },
        {
          name: 'ip',
          type: 'text',
        },
      ],
    },
  ],
}

export default Users
