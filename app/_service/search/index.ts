export interface SearchAutocompleteResponse {
  id: number
  shortTitle: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export async function getSearchAutocomplete(keyword: string) {
  try {
    if (!keyword) {
      return []
    }
    const res = await fetch(`https://devwiki.co.kr/wiki-api/search/autocomplete?q=${keyword}`)

    const data = (await res.json()) as SearchAutocompleteResponse[]

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
