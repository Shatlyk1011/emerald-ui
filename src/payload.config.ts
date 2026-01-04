import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
// collections
import AdminUsers from './app/(payload)/collections/AdminUsers'
import ApiKeys from './app/(payload)/collections/ApiKeys'
import Users from './app/(payload)/collections/Users';
import { syncUser } from './services/syncUser'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('dirname', dirname)

export default buildConfig({
  editor: lexicalEditor({}),

  admin: {
    user: AdminUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  endpoints: [
    {
      path: '/sync-user',
      method: 'post',
      handler: syncUser,
    },
  ],

  // Define and configure your collections in this array
  collections: [AdminUsers, Users, ApiKeys],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
