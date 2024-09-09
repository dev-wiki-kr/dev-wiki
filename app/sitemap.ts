import { MetadataRoute } from 'next'
import { getAllPostTitle, getPostByTitle } from './_service/post'

export default async function sitemap() {
  //TODO: https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps

  const titles = await getAllPostTitle()

  const parsedSitemap = await Promise.all(
    titles.map(async ({ shortTitle }) => {
      const post = await getPostByTitle(shortTitle)

      return {
        url: `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/post/${shortTitle}`,
        lastModified: post?.updatedAt || post?.createdAt,
      }
    }),
  )

  console.log(parsedSitemap)

  return parsedSitemap
}
