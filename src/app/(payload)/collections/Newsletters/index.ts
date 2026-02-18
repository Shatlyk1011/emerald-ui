import { CollectionConfig } from 'payload';
import { admins } from '../../utils/admins';













const Newsletters: CollectionConfig = {
  slug: 'newsletters',
  access: {
    // Only admins can manage newsletters
    create: admins,
    read: admins,
    update: admins,
    delete: admins,
  },
  admin: {
    defaultColumns: ['subject', 'status', 'sentDate', 'recipientCount'],
    useAsTitle: 'subject',
    description:
      'Create and send newsletters to subscribers. Email content is defined using React Email components.',
  },
  fields: [
    {
      name: 'subject',
      label: 'Subject Line',
      type: 'text',
      required: true,
      admin: {
        description: 'Email subject line',
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Email content (text only for now)',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
      ],
      admin: {
        description: 'Newsletter status',
        position: 'sidebar',
      },
    },
    {
      name: 'sentDate',
      label: 'Sent Date',
      type: 'date',
      required: false,
      admin: {
        description: 'Date and time when newsletter was sent',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'recipientCount',
      label: 'Recipient Count',
      type: 'number',
      required: false,
      admin: {
        description: 'Number of subscribers who received this newsletter',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'sendAction',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/app/(payload)/components/SendNewsletterButton#SendNewsletterButton',
            exportName: 'SendNewsletterButton',
          },
        },
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default Newsletters
