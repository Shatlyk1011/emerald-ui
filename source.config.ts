import z from 'zod'
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config'

const extendedSchema = frontmatterSchema.extend({
  docsBodyClasses: z.string().optional(),
})

export const docs = defineDocs({
  dir: './src/content/docs',
  docs: {
    schema: extendedSchema,
  },
})

export default defineConfig()
