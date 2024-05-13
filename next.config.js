/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      //www to non www redirect
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
