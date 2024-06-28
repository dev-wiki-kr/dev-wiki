export interface LatestArticleResponse {
  title: string
  url: string
}

export async function getLatestArticle() {
  try {
    const res = await fetch(`https://devwiki.co.kr/wiki-api/post/latest?count=10`, {
      next: { revalidate: 6000 },
    })

    const data = await res.json()

    return data as LatestArticleResponse[]
  } catch (error) {
    console.log(error)
    return null
  }
}
