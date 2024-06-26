import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { H1 } from '../../../_shared/heading'

const components = {
  h1({ children }: { children: React.ReactNode }) {
    return <H1>{children}</H1>
  },
}

export function MarkdownTitle({ title }: { title: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components as Components}>
      {title}
    </Markdown>
  )
}
