interface Post {
  id: number
  shortTitle: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export async function getPostByTitle(title: string) {
  try {
    //TODO: env 처리 추가
    const res = await fetch(`https://devwiki.co.kr/api/post/${title}`, {
      next: { revalidate: 100 },
    })

    const data = (await res.json()) as Post

    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

type AllTitleResponse = { title: string }[]

export async function getAllPostTitle() {
  try {
    //TODO: env 처리 추가
    const res = await fetch(`https://devwiki.co.kr/api/post/titles`, { next: { revalidate: 100 } })

    const data = (await res.json()) as AllTitleResponse

    return data
  } catch (err) {
    console.log(err)
    return []
  }
}
