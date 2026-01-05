import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import Preview from "@/components/mdx/preview";
import PreviewClient from "@/components/mdx/preview-client";
import PreviewTemplate from "@/components/mdx/preview-template";
import WhatIncluded from "@/components/mdx/what-included";
import { source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage footer={{ enabled: false }}>
      <DocsTitle className="ml-8 font-semibold text-4xl tracking-tighter">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="ml-8 text-xl tracking-tighter">
        {page.data.description}
      </DocsDescription>
      <DocsBody className="ml-8">
        <MDX
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(source, page),
            Preview,
            PreviewClient,
            PreviewTemplate,
            WhatIncluded,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return await source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
