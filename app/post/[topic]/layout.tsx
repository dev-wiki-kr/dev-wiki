import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { getPostBySlug } from '../../lib/get-posts'
import { Container } from './components/container'

type GenerateMetadataProps = {
  params: { topic: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { frontMatter } = await getPostBySlug(params.topic)
  return {
    title: frontMatter.title,
    description: frontMatter.description,
  }
}

export default function PostLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
