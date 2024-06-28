import { MetadataRoute } from 'next'
import { getAllPostTitle, getPostByTitle } from './_service/post'

export default async function sitemap() {
  //TODO: https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps

  const titles = await getAllPostTitle()

  return titles.map(async ({ shortTitle }) => {
    const post = await getPostByTitle(shortTitle)

    return {
      url: `https://devwiki.co.kr/post/${shortTitle}`,
      lastModified: post?.updatedAt || post?.createdAt,
    }
  })
}
