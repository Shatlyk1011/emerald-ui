import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import { cn } from '@/lib/utils';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import Preview from '@/components/mdx/preview';
import PreviewClient from '@/components/mdx/preview-client';
import WhatIncluded from '@/components/mdx/what-included';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    return notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage footer={{ enabled: false }}>
      <DocsTitle className='ml-8 text-4xl font-semibold tracking-tighter'>
        {page.data.title}
      </DocsTitle>
      <DocsDescription className='ml-8 text-xl tracking-tighter'>
        {page.data.description}
      </DocsDescription>
      <DocsBody className={cn('ml-8', page.data.docsBodyClasses)}>
        <MDX
          components={{
            ...defaultMdxComponents,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            a: createRelativeLink(source as any, page as any),
            Preview,
            PreviewClient,
            WhatIncluded,
          }}
        />
      </DocsBody>
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
