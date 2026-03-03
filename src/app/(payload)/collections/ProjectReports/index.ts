import { CollectionConfig } from 'payload'
import { admins } from '../../utils/admins'

const ProjectReports: CollectionConfig = {
  slug: 'reports',
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' && doc.email) {
          try {
            const existingSubscriber = await req.payload.find({
              collection: 'subscribers',
              where: {
                email: {
                  equals: doc.email,
                },
              },
            })

            if (existingSubscriber.totalDocs === 0) {
              await req.payload.create({
                collection: 'subscribers',
                req,
                data: {
                  email: doc.email,
                  source: 'project issue form',
                  status: 'active',
                },
              })
            }
          } catch (error) {
            req.payload.logger.error(
              `Error adding project issue email to subscribers: ${error}`
            )
          }
        }
        return doc
      },
    ],
  },
  access: {
    create: () => true, // Public can create issues
    read: admins,
    update: admins,
    delete: admins,
  },

  admin: {
    defaultColumns: ['createdAt', 'status', "description", 'email'],
    useAsTitle: 'email',
    description:
      'User-reported issues or bugs from the website. Details and email provided by the user.',
  },

  fields: [

    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: false,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Current status of the issue reported',
      },
    },
  ],
}

export default ProjectReports
