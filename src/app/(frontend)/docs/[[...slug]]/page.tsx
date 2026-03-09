import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { source } from '@/lib/source'
import { cn } from '@/lib/utils'
import Separator from '@/components/ui/separator'
import GridComponents from '@/components/mdx/grid-components'
import Preview from '@/components/mdx/preview'
import PreviewClient from '@/components/mdx/preview-client'

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    return notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage footer={{ enabled: false }}>
      <DocsTitle className='text-4xl font-semibold tracking-tighter'>
        {page.data.title}
      </DocsTitle>
      <DocsDescription className='text-xl tracking-tighter'>
        {page.data.description} <br />
      </DocsDescription>

      <DocsBody className={cn(page.data.full && 'min-w-full')}>
        <MDX
          components={{
            ...defaultMdxComponents,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            a: createRelativeLink(source as any, page as any),
            Preview,
            Separator,
            PreviewClient,
            GridComponents,
          }}
        />
      </DocsBody>

      {page.data.credits && (
        <h2 className='tracking-one text-base font-normal'>
          Credits:{' '}
          <span className='text-primary tracking-[initial]'>
            {page.data.credits}
          </span>
        </h2>
      )}
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return await source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    return notFound()
  }

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
