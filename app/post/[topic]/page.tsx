import { notFound } from 'next/navigation'
import { getAllPostTitle, getPostByTitle } from '../../_service/post'
import { TocSide, TocTop } from '../../_shared/toc'
import { parseHeadersForTOC } from '../../lib/get-toc'
import { Container } from './components/container'
import { PostBody } from './components/post-body'
import { flattenMarkdown, parseMarkdown } from '../../_engine/parse-accordion'

export async function generateStaticParams() {
  const data = await getAllPostTitle()

  return data.map((datum) => ({
    topic: datum.shortTitle,
  }))
}

interface TopicProps {
  params: {
    topic: string
  }
}

export default async function Post({ params: { topic } }: TopicProps) {
  const post = await getPostByTitle(topic)

  if (!post) {
    notFound()
  }

  const tableOfContents = flattenMarkdown(parseMarkdown(post.content))

  return (
    <Container>
      <article style={{ position: 'relative' }}>
        <TocSide tableOfContents={tableOfContents} />
        <PostBody source={post.content} />
      </article>
    </Container>
  )
}
