import GithubSlugger from 'github-slugger'

export interface Toc {
  level: number
  text: string
  slug: string
}

export const parseHeadersForTOC = (raw: string) => {
  const calculateHeaderLevels = (arr: Array<number>) => {
    const sorted = [...arr].sort((a, b) => a - b)
    const min = sorted[0]
    const adjusted = arr.map((value) => value - min + 1)
    return adjusted
  }

  const regex = /(?:^|\n)(?<flag>#{1,6})\s+(?<text>.+)/g
  const headerMatches = Array.from(raw.matchAll(regex))

  const headerLevels = calculateHeaderLevels(
    headerMatches.map((match) => match.groups?.flag.length!),
  ) as Array<1 | 2 | 3 | 4 | 5 | 6>

  const slugger = new GithubSlugger()

  const headers: Toc[] = headerMatches.map((header, i) => {
    const { text } = header.groups || { text: '' }
    const slug = slugger.slug(text)
    return { level: headerLevels[i], text, slug }
  })
  return headers
}
