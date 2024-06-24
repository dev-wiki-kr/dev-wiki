export async function getPopularArticles() {
  try {
    // TODO : API 개발시 주소 변경에정
    // const res = await fetch(`https://devwiki.co.kr/wiki-api/popualr`)

    // const data = await res.json()

    // return data

    return Typescript_Topics
  } catch (error) {
    console.log(error)
    return null
  }
}

const Typescript_Topics = [
  'Typescript',
  'Typescript playground',
  'Typescript enum',
  'Typescript omit',
  'Typescript interface',
  'Typescript generic',
]
