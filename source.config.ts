import z from 'zod';
import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';









const extendedSchema = frontmatterSchema.extend({
  docsBodyClasses: z.string().optional(),
})

// Plain components (Framer Motion, CSS animations, etc.)
export const plainDocs = defineDocs({
  dir: './src/content/docs',
  docs: {
    schema: extendedSchema,
  },
})

// GSAP components
export const gsapDocs = defineDocs({
  dir: './src/content/docs/gsap',
  docs: {
    schema: extendedSchema,
  },
})

// Keep legacy export for backwards compatibility
export const docs = plainDocs

export default defineConfig()
