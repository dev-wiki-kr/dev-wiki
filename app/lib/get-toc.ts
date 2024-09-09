import GithubSlugger from 'github-slugger'

export interface Toc {
  level: number
  text: string
  slug: string
}

export const parseHeadersForTOC = (raw: string) => {
  const calculateHeaderLevels = (arr: number[]) => {
    const min = Math.min(...arr)
    const adjusted = arr.map((value) => value - min + 1)
    return adjusted
  }

  const regex = /(?:^|\n)(?<flag>#{1,6})\s+(?<text>.+)/g
  const headerMatches = Array.from(raw.matchAll(regex))

  const headerLevels: number[] = calculateHeaderLevels(
    headerMatches
      .map((match) => match.groups?.flag.length)
      .filter((flag): flag is number => flag !== undefined),
  )

  const slugger = new GithubSlugger()

  const headers: Toc[] = headerMatches.map((header, i) => {
    const { text } = header.groups || { text: '' }
    const slug = slugger.slug(text)
    return { level: headerLevels[i], text, slug }
  })
  return headers
}
