import type { PropsWithChildren } from 'react'
import { Container } from './components/container'
import { Metadata } from 'next'
import { getPostByTitle } from '../../_service/post'
import { parseMarkdown, parseMarkdownTitle } from '../../_engine/parse-accordion'

type GenerateMetadataProps = {
  params: { topic: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  //TODO: 추후에 article의 기본형태를 mdx 형태로 변경해서 올릴 수 있도록 하자.

  const post = await getPostByTitle(params.topic)

  const title = parseMarkdownTitle(post?.content || '').replace('# ', '')

  const firstContent = parseMarkdown(post?.content || '')[0]?.content

  return {
    title: `${title} - 데브위키`,
    description: firstContent,
    openGraph: {
      title: `${params.topic} - 데브위키`,
      description: firstContent,
      type: 'website',
      locale: 'ko_KR',
      siteName: 'Devwiki',
      images: [
        {
          url: 'https://devwiki.co.kr/images/opengraph-image.jpg',
          width: 800,
          height: 600,
          alt: 'Devwiki',
        },
      ],
    },
    alternates: {
      canonical: `https://devwiki.co.kr/post/${params.topic}`,
    },
  }
}

interface TopicProps {
  params: {
    topic: string
  }
}

export default async function PostLayout({
  children,
  params: { topic },
}: PropsWithChildren<TopicProps>) {
  const post = await getPostByTitle(topic)

  const author = post?.user.find((userInfo) => userInfo.role === 'author')
  const contributors = post?.user.filter((userInfo) => userInfo.role === 'editor')

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    publisher: {
      '@type': 'Organization',
      name: 'devwiki org',
      url: 'https://devwiki.co.kr/',
    },
    author: {
      '@type': 'Person',
      name: author?.username,
      image: {
        '@type': 'ImageObject',
        url: author?.avartarUrl,
        width: 100,
        height: 100,
      },
      url: author?.profileUrl,
    },
    /** 배열로 했을때 문제없었음. */
    contributor: contributors?.map((contributor) => ({
      '@type': 'Person',
      name: contributor?.username,
      image: {
        '@type': 'ImageObject',
        url: contributor?.avartarUrl,
        width: 100,
        height: 100,
      },
      url: contributor?.profileUrl,
    })),
    /** 이 부분을 누가 결정하게 할지 고민 필요 */
    // dependencies: '',
    proficiencyLevel: 'Beginner',
    headline: `${post?.title}`,
    url: `https://devwiki.co.kr/post/${post?.shortTitle}`,
    datePublished: `${post?.createdAt}`,
    dateModified: `${post?.updatedAt}`,
    /** 글의 태그로 보이며 추후에 추가된 경우 살리기 */
    // keywords: 'Dev',
    /** api 속성에서 description을 받을 수 있게 추가 */
    description: `${post?.content.slice(0, 70)}`,
    mainEntityOfPage: `https://devwiki.co.kr/post/${post?.shortTitle}`,
  }

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </Container>
  )
}
