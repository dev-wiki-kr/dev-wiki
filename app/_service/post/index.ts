interface User {
  id: number
  githubId: string
  username: string
  displayName: string
  profileUrl: string
  avartarUrl: string
  role: 'author' | 'editor'
}

interface Post {
  id: number
  shortTitle: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  user: User[]
}

interface PostError {
  message: string
  error: string
  statusCode: number
}

type PostResponse = Post | PostError

function isPostGetError(postResponse: PostResponse): postResponse is PostError {
  return (
    'error' in postResponse || ('statusCode' in postResponse && postResponse.statusCode !== 200)
  )
}

export async function getPostByTitle(title: string) {
  try {
    //TODO: env 처리 추가
    const res = await fetch(`https://devwiki.co.kr/wiki-api/post/${title}`, {
      next: { revalidate: 86400 },
    })

    const data = (await res.json()) as PostResponse

    if (isPostGetError(data)) {
      throw new Error('게시물을 찾지 못했습니다.')
    }

    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

type AllTitleResponse = { shortTitle: string }[]

export async function getAllPostTitle() {
  try {
    //TODO: env 처리 추가
    const res = await fetch(`https://devwiki.co.kr/wiki-api/post/titles`, {
      next: { revalidate: 86400 },
    })

    const data = (await res.json()) as AllTitleResponse

    return data
  } catch (err) {
    console.log(err)
    return []
  }
}
