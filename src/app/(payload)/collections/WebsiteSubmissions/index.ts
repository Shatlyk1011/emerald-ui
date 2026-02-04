import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const WebsiteSubmissions: CollectionConfig = {
  slug: 'website-submissions',
  access: {
    create: () => true, // Public can create submissions
    read: admins,
    update: admins,
    delete: admins,
  },

  admin: {
    defaultColumns: ['websiteUrl', 'name', 'email', 'status', 'createdAt'],
    useAsTitle: 'websiteUrl',
    description:
      'User-submitted website requests for the inspiration gallery. Review and approve submissions to add them to the main collection.',
  },

  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: false,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: false,
    },
    {
      name: 'websiteUrl',
      label: 'Website URL',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'URL of the website being submitted',
      },
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: false,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Review status of the submission',
      },
    },
  ],
}

export default WebsiteSubmissions
