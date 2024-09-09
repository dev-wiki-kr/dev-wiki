import { parseMarkdown, parseMarkdownTitle } from '../../../_engine/parse-accordion'
import { MarkdownMainContent } from './markdown-main-content'
import { MarkdownTitle } from './markdown-title'

export function PostBody({ source }: { source: string }) {
  return (
    <>
      <MarkdownTitle title={parseMarkdownTitle(source)} />
      <MarkdownMainContent headers={parseMarkdown(source)} />
    </>
  )
}
