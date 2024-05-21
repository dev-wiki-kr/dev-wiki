import { Metadata, ResolvingMetadata } from 'next'

interface LayoutProps {
  children: React.ReactNode
}

type GenerateMetadataProps = {
  params: { topic: string }
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  // read route params
  const topic = params.topic

  return {
    title: `${topic} - 데브위키`,
    // api에서 topic에 대한 description도 같이 받아야함.
    description: `테스트입니다. - ${topic}`,
    alternates: {
      canonical: `https://dewiki.vercel.app/wiki/${topic}`,
    },
  }
}

//QUESTION: 위키피디아 형식에서는 어떤 json-ld 구조화형식이 맞을지..? 아니면 안해도 될지

export default function TopicLayout({ children }: LayoutProps) {
  return <div>{children}</div>
}
