/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
}
