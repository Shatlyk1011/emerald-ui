import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { Metadata } from 'next'
import { plainSource, gsapSource } from '@/lib/source'
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
      tree={plainSource.pageTree}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
        tabs: [
          {
            title: 'Motion Components',
            description: 'Framer Motion, JSX, Tailwind ',
            url: '/docs',
            root: plainSource.pageTree,
          },
          {
            title: 'GSAP Components',
            description: 'GSAP, JSX, Tailwind',
            url: '/docs/gsap',
            root: gsapSource.pageTree,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ] as any, // Type assertion needed - Fumadocs tabs API functional but types incomplete
      }}
    >
      {children}
    </DocsLayout>
  )
}

