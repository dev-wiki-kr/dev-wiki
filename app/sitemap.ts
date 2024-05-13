import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  //TODO: https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
  return [
    {
      url: 'https://dewiki.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://dewiki.vercel.app/wiki/Next.js',
      lastModified: new Date(),
    },
    {
      url: 'https://dewiki.vercel.app/wiki/Typescript',
      lastModified: new Date(),
    },
    {
      url: 'https://dewiki.vercel.app/wiki/react-query',
      lastModified: new Date(),
    },
  ]
}
