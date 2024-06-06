import { notFound } from 'next/navigation'
import { getAllPostTitle, getPostByTitle } from '../../_service/post'
import { PostBody } from './components/post-body'

export async function generateStaticParams() {
  const data = await getAllPostTitle()

  return data.map((datum) => ({
    topic: datum.title,
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

  return <PostBody source={post.content} />
}
