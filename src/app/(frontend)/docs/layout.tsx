import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { Metadata } from 'next'
import { plainSource, gsapSource } from '@/lib/source'
import { baseOptions } from '../layout.config'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  title: {
    template: '%s | Emerald UI',
    default: 'components',
  },
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <>
      <DocsLayout
        tree={plainSource.pageTree}
        {...baseOptions()}
        sidebar={{
          defaultOpenLevel: 1,
          tabs: [
            {
              title: 'Motion Components',
              description: 'Motion, jsx, tailwind ',
              url: '/docs',
              root: plainSource.pageTree,
            },
            {
              title: 'GSAP Components',
              description: 'Gsap, jsx, tailwind',
              url: '/docs/gsap',
              root: gsapSource.pageTree,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ] as any, // Type assertion needed - Fumadocs tabs API functional but types incomplete
        }}
      >
        {children}
      </DocsLayout>
      <Footer />
    </>
  )
}
