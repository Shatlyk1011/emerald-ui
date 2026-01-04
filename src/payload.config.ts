import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import path from "path";
import { fileURLToPath } from "node:url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

// collections
import AdminUsers from "./app/(payload)/collections/AdminUsers";
import Users from "./app/(payload)/collections/Users";
import ApiKeys from "./app/(payload)/collections/ApiKeys";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor({}),

  admin: {
    user: AdminUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // endpoints: [
  //   {
  //     path: '/sync-user',
  //     method: 'post'
  //     handler: () => {},
  //   }
  // ],

  // Define and configure your collections in this array
  collections: [AdminUsers, Users, ApiKeys],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
});
