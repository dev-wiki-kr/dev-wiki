import { parseMarkdown } from '../../../_engine/parse-accordion'
import { Container } from './container'
import { MarkdownMainContent } from './markdown-accoridion'

export function PostBody({ source }: { source: string }) {
  return <MarkdownMainContent headers={parseMarkdown(source)} />
}
