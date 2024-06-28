import { notFound } from 'next/navigation'
import { getAllPostTitle, getPostByTitle } from '../../_service/post'
import { TocSide, TocTop } from '../../_shared/toc'
import { Container } from './components/container'
import { PostBody } from './components/post-body'
import { flattenMarkdown, parseMarkdown } from '../../_engine/parse-accordion'
import { PostHeader } from './components/post-header'

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
      <PostHeader title={post.title} date={post.updatedAt} />
      <TocTop tableOfContents={tableOfContents} />
      <article style={{ position: 'relative' }}>
        <TocSide tableOfContents={tableOfContents} />
        <PostBody source={post.content} />
      </article>
    </Container>
  )
}
