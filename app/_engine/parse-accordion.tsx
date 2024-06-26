export interface MarkdownSection {
  id: string
  level: number
  text: string
  content: string
  children: MarkdownSection[]
}

export type ParsedMarkdown = Omit<MarkdownSection, 'children'>

export function parseMarkdown(markdownText: string) {
  const lines = markdownText.split('\n')
  const sections: MarkdownSection[] = []
  const headerRegex = /^(#{2,6}) (.+)/

  let currentSection: MarkdownSection | null = null

  lines.forEach((line) => {
    const match = line.match(headerRegex)

    /** ## 개요 등 h2~h6인 경우 match */
    if (match) {
      /** currentSection이 존재하면 sections에 추가 */
      if (currentSection) {
        sections.push(currentSection)
      }

      /** currentSection 초기화 */
      currentSection = { id: '', level: match[1].length, text: match[2], content: '', children: [] }

      return
    }

    /** match 아닌것 (contents)를 line별로 추가 */
    if (currentSection) {
      currentSection.content += (currentSection.content ? '\n' : '') + line
    }
  })

  /** 마지막 currentSection이 존재하면 sections에 추가 */
  if (currentSection) {
    sections.push(currentSection)
  }

  const root: MarkdownSection[] = []
  const stack: MarkdownSection[] = []
  const idCounter = { count: 0 }

  sections.forEach((section) => {
    while (stack.length && stack[stack.length - 1].level >= section.level) {
      stack.pop()
    }

    if (stack.length) {
      const parent = stack[stack.length - 1]
      section.id = `${parent.id}.${parent.children.length + 1}`
      parent.children.push(section)
    } else {
      idCounter.count += 1
      section.id = `${idCounter.count}`
      root.push(section)
    }
    stack.push(section)
  })

  return root
}

export function parseMarkdownTitle(markdownText: string) {
  const lines = markdownText.split('\n')
  const headerRegex = /^(#{1}) (.+)/

  let title = ''

  lines.forEach((line) => {
    const match = line.match(headerRegex)

    if (match && match[1] === '#') {
      title = line
    }
  })

  return title
}

export function flattenMarkdown(markdownSections: MarkdownSection[]) {
  const result: ParsedMarkdown[] = []

  function flatten(markdown: MarkdownSection) {
    if (markdown.text) {
      result.push({
        id: markdown.id,
        level: markdown.level,
        text: markdown.text,
        content: markdown.content,
      })
    }
    if (markdown.children) {
      markdown.children.forEach((child) => flatten(child))
    }
  }

  markdownSections.forEach((markdown) => flatten(markdown))

  return result
}
