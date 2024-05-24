import { getPostBySlug, getPostSlugs } from '../../lib/get-posts'
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

  return <PostBody>{content}</PostBody>
}
