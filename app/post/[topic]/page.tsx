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

const meta = async () => {
  const topic = 'next-image'
  // const { frontMatter, content } = await getPostBySlug(topic)

  const post = await getPostByTitle(topic)

  // if (post) {
  //   const {} = await getUserInfoByUserName()
  // }

  const metadata = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    publisher: {
      '@type': 'Organization',
      name: 'devwiki org',
      url: 'https://devwiki.co.kr/',
      // logo: {
      //   '@type': 'ImageObject',
      //   url: 'https://www.zalgritte.com/content/images/size/w256h256/2023/07/Thinking2.png',
      // },
    },
    // author: {
    //   '@type': 'Person',
    //   name: 'Zalgritte',
    //   image: {
    //     '@type': 'ImageObject',
    //     url: 'https://www.zalgritte.com/content/images/size/w1200/2023/07/-------.webp',
    //     width: 1200,
    //     height: 1200,
    //   },
    //   url: 'https://www.zalgritte.com/author/zalgritte/',
    // },
    /** 배열로 했을때 문제없었음. */
    contributor: {},
    /** 이 부분을 누가 결정하게 할지 고민 필요 */
    // dependencies: '',
    // proficiencyLevel: 'Beginner',
    headline: `${post?.title}`,
    url: `https://devwiki.co.kr/wiki/${post?.shortTitle}`,
    datePublished: `${post?.createdAt}`,
    dateModified: `${post?.updatedAt}`,
    /** 글의 태그로 보이며 추후에 추가된 경우 살리기 */
    // keywords: 'Dev',
    /** api 속성에서 description을 받을 수 있게 추가 */
    description:
      '테오의 스프린트 17기에 참여한 디자이너의 시각에서 후기를 남깁니다. 스프린트가 무엇인지, 어떤 것들을 배우고 느꼈는지 간략하게 남겼습니다.',
    mainEntityOfPage: `https://devwiki.co.kr/wiki/${post?.shortTitle}`,
  }

  return (
    <>
      <PostBody source={content} />
      {/* JSON-LD for Tech Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            publisher: {
              '@type': 'Organization',
              name: 'Zalgritte&#x27;s Blog',
              url: 'https://www.zalgritte.com/',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.zalgritte.com/content/images/size/w256h256/2023/07/Thinking2.png',
              },
            },
            author: {
              '@type': 'Person',
              name: 'Zalgritte',
              image: {
                '@type': 'ImageObject',
                url: 'https://www.zalgritte.com/content/images/size/w1200/2023/07/-------.webp',
                width: 1200,
                height: 1200,
              },
              url: 'https://www.zalgritte.com/author/zalgritte/',
              sameAs: ['http://zalgritte.com'],
            },
            headline: '테오의 스프린트 17기 - 디자이너로써의 후기!',
            url: 'https://www.zalgritte.com/teo-sprint-17-review-designer/',
            datePublished: '2024-04-11T13:51:35.000Z',
            dateModified: '2024-04-12T02:30:25.000Z',
            image: {
              '@type': 'ImageObject',
              url: 'https://www.zalgritte.com/content/images/size/w1200/2024/04/OG-Image--1_1.9--1.png',
              width: 1200,
              height: 630,
            },
            keywords: 'Dev',
            description:
              '테오의 스프린트 17기에 참여한 디자이너의 시각에서 후기를 남깁니다. 스프린트가 무엇인지, 어떤 것들을 배우고 느꼈는지 간략하게 남겼습니다.',
            mainEntityOfPage: 'https://www.zalgritte.com/teo-sprint-17-review-designer/',
          }),
        }}
      />
    </>
  )
}
