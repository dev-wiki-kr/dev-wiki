import { notFound } from 'next/navigation'
import { getAllPostTitle, getPostByTitle } from '../../_service/post'
import { TocSide } from '../../_shared/toc'
import { Container } from './components/container'
import { PostBody } from './components/post-body'
import { flattenMarkdown, parseMarkdown } from '../../_engine/parse-accordion'
import { Author } from './components/author'

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

  const author = post?.user.find((userInfo) => userInfo.role === 'author')
  const contributors = post?.user.filter((userInfo) => userInfo.role === 'editor')

  return (
    <Container>
      <article style={{ position: 'relative' }}>
        <TocSide tableOfContents={tableOfContents} />
        <PostBody source={post.content} />
      </article>
      {author && <Author authorData={author} contributorData={contributors} />}
    </Container>
  )
}
