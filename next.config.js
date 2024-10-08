/** @type {import('next').NextConfig} */

import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  compress: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // www to non-www redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.devwiki.co.kr' }],
        destination: 'https://devwiki.co.kr/:path*',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/post',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
    ]
  },
}

export default withMDX(nextConfig)
