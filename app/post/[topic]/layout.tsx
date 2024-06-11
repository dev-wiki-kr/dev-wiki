import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { getPostBySlug } from '../../lib/posts'

type GenerateMetadataProps = {
  params: { topic: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const post = await getPostBySlug(params.topic)
  return {
    title: post.title,
    description: post.description,
  }
}

export default function PostLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
