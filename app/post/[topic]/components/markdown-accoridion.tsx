'use client'

import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { MarkdownSection, parseMarkdown } from '../../../_engine/parse-accordion'
import {
  Accordion,
  AccordionDescription,
  AccordionProvider,
  AccordionTitle,
} from '../../../_shared/accordion'
import Markdown, { type Components } from 'react-markdown'
import { CodeBlock, InlineCode } from './markdown-code-syntax'
import { CustomHeading } from '../../../_shared/heading'
import { ExternalLink } from '../../../_shared/link/external-link'
import { InternalLink } from '../../../_shared/link/internal-link'

const components = {
  code({
    inline,
    className,
    children,
    ...props
  }: {
    inline: boolean
    className: string
    children: string
  }) {
    console.log({ inline, className, children, props })
    const match = /language-(\w+)/.exec(className || '')

    return !inline && match ? (
      <CodeBlock {...props} language={match[1]} value={String(children).replace(/\n$/, '')} />
    ) : (
      <InlineCode {...props}>{children}</InlineCode>
    )
  },
  a({ href, children }: { href: string; children: React.ReactNode }) {
    if (href.includes('https://devwiki.co.kr')) {
      return <InternalLink href={href}>{children}</InternalLink>
    }

    return <ExternalLink href={href}>{children}</ExternalLink>
  },
}

export function MarkdownMainContent({ headers }: { headers: MarkdownSection[] }) {
  return (
    <>
      {headers.map((header) => (
        <AccordionProvider key={header.id}>
          <Accordion key={header.id} id={header.id}>
            <AccordionTitle>
              <CustomHeading level={header.level}>
                <Markdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={components as Components}
                >
                  {header.text}
                </Markdown>
              </CustomHeading>
            </AccordionTitle>
            <AccordionDescription>
              <Markdown
                children={header.content}
                components={components as Components}
                remarkPlugins={[remarkGfm, remarkBreaks]}
              />
            </AccordionDescription>
          </Accordion>
          {header.children.length > 0 ? <MarkdownMainContent headers={header.children} /> : ''}
        </AccordionProvider>
      ))}
    </>
  )
}
