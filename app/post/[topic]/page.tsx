import { TocSide } from '../../_shared/toc'
import { getPostBySlug, getPostSlugs } from '../../lib/get-posts'
import { parseHeadersForTOC } from '../../lib/get-toc'
import { Container } from './components/container'
import { PostBody } from './components/post-body'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    topic: slug.replace('.mdx', ''),
  }))
}

interface TopicProps {
  params: {
    topic: string
  }
}

export default async function Post({ params: { topic } }: TopicProps) {
  const { content } = await getPostBySlug(topic)
  const tableOfContents = parseHeadersForTOC(content)

  return (
    <Container>
      <article style={{ position: 'relative' }}>
        <TocSide tableOfContents={tableOfContents} />
        <PostBody source={content} />
      </article>
    </Container>
  )
}
