import { CollectionConfig } from 'payload'
import { OPEN_SOURCE_FILTER_OPTIONS } from '../../../../constants/open-source'
import { admins } from '../../utils/admins'

const OpenSourceProjects: CollectionConfig = {
  slug: 'open-source-projects',
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  admin: {
    useAsTitle: 'title',
    description:
      'Manage open source components to be featured on the open-source page.',
  },

  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
    },
    {
      name: 'linkToRepo',
      label: 'Link to Repo',
      type: 'text',
      required: true,
    },
    {
      name: 'linkToProject',
      label: 'Link to Project',
      type: 'text',
      required: false,
    },
    {
      name: 'imgUrl',
      label: 'Banner image (R2)',
      type: 'text',
      required: false,
      admin: {
        components: {
          afterInput: [
            {
              path: '@/app/(payload)/components/R2ImageUploadField#R2ImageUploadField',
              exportName: 'R2ImageUploadField',
            },
          ],
        },
      },
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: false,
      options: OPEN_SOURCE_FILTER_OPTIONS.type,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ui',
      label: 'UI',
      type: 'select',
      required: false,
      options: OPEN_SOURCE_FILTER_OPTIONS.ui,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'css',
      label: 'CSS',
      type: 'select',
      required: false,
      options: OPEN_SOURCE_FILTER_OPTIONS.css,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'cms',
      label: 'CMS / Database',
      type: 'select',
      required: false,
      options: OPEN_SOURCE_FILTER_OPTIONS.cms,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      label: 'Order',
      required: false,
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  labels: {
    plural: 'Open Source Components',
    singular: 'Open Source Component',
  },
  timestamps: false,
}

export default OpenSourceProjects
