import { MDXRemote } from 'next-mdx-remote/rsc'

import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { autoLinkHeadings } from '../../../lib/auto-link-headings'
import { mdxComponents } from './mdx-components'

export function PostBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [rehypePrettyCode, rehypeSlug, autoLinkHeadings],
        },
      }}
      components={mdxComponents}
    />
  )
}
