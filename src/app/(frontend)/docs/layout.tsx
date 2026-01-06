import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { Metadata } from 'next'
import { source } from '@/lib/source'
import { baseOptions } from '../layout.config'

export const metadata: Metadata = {
  title: {
    template: '%s | Node UI',
    default: 'components',
  },
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  )
}
