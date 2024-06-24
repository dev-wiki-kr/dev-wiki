export async function getRecentDocuments() {
  try {
    // TODO : API 개발시 주소 변경에정
    // const res = await fetch(`https://devwiki.co.kr/wiki-api/recent`)

    // const data = await res.json()

    // return data

    return threeJS_Topics
  } catch (error) {
    console.log(error)
    return null
  }
}

const threeJS_Topics = [
  'Three.js',
  'Three.js 장단점',
  'Three.js 전망',
  'Three.js 예제',
  'Three.js 강의목록',
  'React Three Fiber',
]
