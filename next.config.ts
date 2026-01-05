import { withPayload } from '@payloadcms/next/withPayload';
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const withMDX = createMDX()

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  // cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default withPayload(withMDX(nextConfig))
