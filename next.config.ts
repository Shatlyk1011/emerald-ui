import { withPayload } from '@payloadcms/next/withPayload'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const withMDX = createMDX()

const nextConfig: NextConfig = {
  /* config options here */

  async headers() {
    return [
      {
        source: '/r/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/components',
        destination: '/docs/components/',
        permanent: true,
      },
      {
        source: '/components/:path*',
        destination: '/docs/components/:path*',
        permanent: true,
      },
      {
        source: '/r/:path([^.]*)',
        destination: '/r/:path.json',
        permanent: true,
      },
    ]
  },

  reactStrictMode: true,
  // cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default withPayload(withMDX(nextConfig))
