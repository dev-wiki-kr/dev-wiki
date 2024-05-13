import { ReadonlyURLSearchParams } from 'next/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ topic: 'Next.js' }, { topic: 'Typescript' }, { topic: 'react-query' }]
}

interface TopicProps {
  params: {
    topic: string
  }
  searchParams: ReadonlyURLSearchParams
}

export default function Topic({ params: { topic }, searchParams }: TopicProps) {
  console.log({ topic, searchParams })

  return <div>{topic}</div>
}
