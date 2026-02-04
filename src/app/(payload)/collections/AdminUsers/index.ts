import type { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'
import { checkRole } from '../../utils/checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

const AdminUsers: CollectionConfig = {
  slug: 'adminUsers',
  access: {
    admin: () => true,
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (checkRole(['admin', 'moderator'], req.user)) {
        return true
      }
      if (req.user?.isBlocked) {
        return false
      }

      return false
    },
    update: admins,
  },

  admin: {
    defaultColumns: ['name', 'phone', 'roles'],
    useAsTitle: 'name',
    description:
      'Manage admin panel users and their access permissions. Configure user roles (admin, moderator, guest) to control who can create, edit, and delete content.',
  },

  auth: {
    depth: 0,
    maxLoginAttempts: 20,
    tokenExpiration: 604800,
  },

  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Phone',
      required: false,
      type: 'text',
    },

    {
      name: 'isBlocked',
      access: {
        read: ({ req }) => checkRole(['admin'], req.user),
        update: ({ req }) => checkRole(['admin'], req.user),
      },
      defaultValue: false,
      label: 'Is blocked?',
      required: false,
      type: 'checkbox',
    },

    {
      name: 'roles',
      defaultValue: 'moderator',
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Moderator',
          value: 'moderator',
        },
        {
          label: 'Guest',
          value: 'guest',
        },
      ],
      type: 'select',
    },
  ],

  timestamps: true,
}

export default AdminUsers
