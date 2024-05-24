/** @type {import('next').NextConfig} */

import remarkGfm from 'remark-gfm'
import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // www to non-www redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.dewiki.vercel.app' }],
        destination: 'https://dewiki.vercel.app/:path*',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/wiki',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
    ]
  },
}

export default withMDX(nextConfig)
