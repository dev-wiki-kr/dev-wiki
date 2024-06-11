import { TocSide, TocTop } from '../../_shared/toc'
import { getPostBySlug, getPostSlugs } from '../../lib/posts'
import { parseHeadersForTOC } from '../../lib/get-toc'
import { Container } from './components/container'
import { PostBody } from './components/post-body'
import { PostHeader } from './components/post-header'

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
  const post = await getPostBySlug(topic)
  const tableOfContents = parseHeadersForTOC(post.content)

  return (
    <Container>
      <PostHeader title={post.title} />
      <TocTop tableOfContents={tableOfContents} />
      <article style={{ position: 'relative' }}>
        <TocSide tableOfContents={tableOfContents} />
        <PostBody source={post.content} />
      </article>
    </Container>
  )
}
