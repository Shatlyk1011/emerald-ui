import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import AdminUsers from './app/(payload)/collections/AdminUsers';
// collections
import Categories from './app/(payload)/collections/Categories';
import CreditHistory from './app/(payload)/collections/CreditHistory';
import InspirationWebsites from './app/(payload)/collections/InspirationWebsites';
import Media from './app/(payload)/collections/Media';
import WebsiteStyle from './app/(payload)/collections/WebsiteStyle';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({}),

  typescript: {
    outputFile: path.resolve(dirname, '../src/payload-types.ts'),
  },

  admin: {
    user: AdminUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Define and configure your collections in this array
  collections: [
    InspirationWebsites,
    Media,
    CreditHistory,
    Categories,
    WebsiteStyle,
    AdminUsers,
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
