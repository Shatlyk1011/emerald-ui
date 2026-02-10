import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

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
      'Create and send newsletters to subscribers. Use the rich text editor to compose your newsletter content.',
    components: {
      beforeListTable: [
        {
          path: '@/app/(payload)/components/SendNewsletterButton#SendNewsletterButton',
          exportName: 'SendNewsletterButton',
        },
      ],
    },
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
      name: 'previewText',
      label: 'Preview Text',
      type: 'text',
      required: false,
      admin: {
        description: 'Short preview text shown in email clients (optional)',
      },
    },
    {
      name: 'content',
      label: 'Newsletter Content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main newsletter content (supports rich formatting)',
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
        readOnly: true,
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
  ],
  timestamps: true,
}

export default Newsletters
