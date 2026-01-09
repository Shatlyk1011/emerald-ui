import { CollectionConfig } from 'payload'

const InspirationWebsites: CollectionConfig = {
  slug: 'inpiration-websites',
  admin: {
    useAsTitle: 'Title',
  },
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: false,
    },
    {
      name: 'style',
      type: 'text',
      hasMany: true,
      required: true,
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
      required: false,
    },
    {
      name: 'imgUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'faviconUrl',
      type: 'text',
      required: false,
    },
  ],
}

export default InspirationWebsites
