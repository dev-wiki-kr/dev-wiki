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
import { autoLinkHeadings } from '../../../lib/auto-link-headings'
import Link from 'next/link'

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

const headersComponents = {
  ...components,
  ol({ children, start = 1 }: { children: React.ReactNode; start: number }) {
    return (
      <>
        {start}.{children}
      </>
    )
  },
  p({ children, start }: { children: React.ReactNode; start: number }) {
    return <>{children}</>
  },
  li({ children, start }: { children: React.ReactNode; start: number }) {
    return <>{children}</>
  },
}

export function MarkdownMainContent({ headers }: { headers: MarkdownSection[] }) {
  return (
    <>
      {headers.map((header) => {
        const { section, title } = splitMarkdownTitle(header.text)

        return (
          <AccordionProvider key={header.id}>
            <Accordion key={header.id} id={header.id}>
              <AccordionTitle>
                <CustomHeading level={header.level}>
                  <Link
                    href={`#${header.id}`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="anchor"
                  >
                    {section}
                  </Link>{' '}
                  <Markdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[autoLinkHeadings]}
                    components={headersComponents as Components}
                  >
                    {title}
                  </Markdown>
                </CustomHeading>
              </AccordionTitle>
              <AccordionDescription>
                <Markdown
                  children={header.content}
                  components={components as Components}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[autoLinkHeadings]}
                />
              </AccordionDescription>
            </Accordion>
            {header.children.length > 0 ? <MarkdownMainContent headers={header.children} /> : ''}
          </AccordionProvider>
        )
      })}
    </>
  )
}

function splitMarkdownTitle(text: string) {
  const section = text.split(' ')[0].replace(/[^0-9.]/g, '')
  const title = text.split(' ').slice(1).join(' ')

  return { section, title }
}
