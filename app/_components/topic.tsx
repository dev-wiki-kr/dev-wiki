'use client'

import { H1, H2, H3, H4, H5, H6 } from '../_shared/heading/heading'

interface TopicInterface {
  topic: string
}

export function TopicClient({ topic }: TopicInterface) {
  return (
    <>
      <H1>{topic}</H1>
      <H2>{topic}</H2>
      <H3>{topic}</H3>
      <H4>{topic}</H4>
      <H5>{topic}</H5>
      <H6>{topic}</H6>
    </>
  )
}
