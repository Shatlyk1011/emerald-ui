import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { source } from '@/lib/source'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const currentDate = new Date();
  const routes = ['', '/docs'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // does koko uses this strategy?
  const docsUrls: MetadataRoute.Sitemap = source
    .generateParams()
    .map(({ slug }) => ({
      url: `${siteConfig.url}/docs/${slug?.join("/") || ""}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...routes, ...docsUrls]
}
