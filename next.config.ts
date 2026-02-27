import { withPayload } from '@payloadcms/next/withPayload';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';











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
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/components',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/gsap',
        destination: '/docs/gsap/components/interactive-team',
        permanent: true,
      },
      {
        source: '/components/:path*',
        destination: '/docs/components/:path*',
        permanent: true,
      },

      {
        source: '/gsap',
        destination: '/docs/gsap',
        permanent: true,
      },
      {
        source: '/docs/gsap/components',
        destination: '/docs/gsap',
        permanent: true,
      },
      {
        source: '/r/:path([^.]*)',
        destination: '/r/:path.json',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/sign-in',
        permanent: true,
      },

      // temporary
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/node-inspiration',
        destination: '/',
        permanent: true,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
    minimumCacheTTL: 2_678_400,
    qualities: [75, 90],
  },
  reactStrictMode: true,
  cacheComponents: true,
  serverExternalPackages: ['twoslash', 'typescript'],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default withPayload(withMDX(nextConfig))
