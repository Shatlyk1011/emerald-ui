import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
// collections
import AdminUsers from './app/(payload)/collections/AdminUsers'
import InspirationWebsites from './app/(payload)/collections/InspirationWebsites'

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

  // Define and configure your collections in this array
  collections: [AdminUsers, InspirationWebsites],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
