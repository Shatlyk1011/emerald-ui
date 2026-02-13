import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/temp/'],
      },
      // OpenAI ChatGPT crawler
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 2,
      },
      // Anthropic Claude crawler
      {
        userAgent: ['ClaudeBot', 'anthropic-ai'],
        allow: '/',
        crawlDelay: 2,
      },
      // Perplexity AI crawler
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        crawlDelay: 2,
      },
      // Google's AI training crawler
      {
        userAgent: 'Google-Extended',
        allow: '/',
        crawlDelay: 2,
      },
      // Common Crawl (used by many AI models)
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 2,
      },
      // Meta AI crawler
      {
        userAgent: 'FacebookBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/(payload)'],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
