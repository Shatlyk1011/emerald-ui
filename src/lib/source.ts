import { createElement } from 'react'
import { plainDocs, gsapDocs } from '@/.source'
import { loader } from 'fumadocs-core/source'
import { icons } from 'lucide-react'

// Create separate sources for each component type
export const plainSource = loader({
  baseUrl: '/docs',
  source: plainDocs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons])
    }
  },
})

export const gsapSource = loader({
  baseUrl: '/docs',
  source: gsapDocs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons])
    }
  },
})

// Default export for backwards compatibility
export const source = plainSource
