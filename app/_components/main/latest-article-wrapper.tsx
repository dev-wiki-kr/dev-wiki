import { getLatestArticle } from '../_service/recent-documents'
import { LatestArticle } from './latest-article'

export async function LatestArticleWrapper() {
  const data = await getLatestArticle()

  return <LatestArticle data={data} />
}
