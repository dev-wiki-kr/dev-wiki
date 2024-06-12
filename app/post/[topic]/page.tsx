import { notFound } from 'next/navigation'
import { getAllPostTitle, getPostByTitle } from '../../_service/post'
import { parseHeadersForTOC } from '../../lib/get-toc'
import { TocSide } from '../../_shared/toc'
import { Container } from './components/container'
import { getPostBySlug, getPostSlugs } from '../../lib/get-posts'
import { PostBody } from './components/post-body'
import { getUserInfoByUserName } from '../../_service/auth'

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

  const tableOfContents = parseHeadersForTOC(post.content)

  return (
    <Container>
      <article style={{ position: 'relative' }}>
        <TocSide tableOfContents={tableOfContents} />
        <PostBody source={post.content} />
      </article>
    </Container>
  )
}
