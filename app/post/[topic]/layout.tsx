import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Container } from './components/container'

type GenerateMetadataProps = {
  params: { topic: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  //TODO: 추후에 article의 기본형태를 mdx 형태로 변경해서 올릴 수 있도록 하자.

  return {
    title: `${params.topic} - 데브위키`,
    description: '테스트입니다.',
    alternates: {
      canonical: `https://devwiki.co.kr/post/${params.topic}`,
    },
  }
}

export default function PostLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
