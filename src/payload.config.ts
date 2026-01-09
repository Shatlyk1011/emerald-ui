import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
// collections
import AdminUsers from './app/(payload)/collections/AdminUsers'
import ApiKeys from './app/(payload)/collections/ApiKeys'
import Users from './app/(payload)/collections/Users'

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

  collections: [AdminUsers, Users, ApiKeys],
  plugins: [payloadCloudPlugin()],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
