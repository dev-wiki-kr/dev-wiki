'use client'

import styled from 'styled-components'
import { H1 } from '../../../_shared/heading'
import { formatDate } from '../../../_util/format'

const HeaderWrapper = styled.div`
  margin-bottom: 40px;
`

const TitleWrapper = styled.div`
  margin-block-start: 20px;
  margin-block-end: 24px;
`

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: #777777;

  margin: 0;
`

export const PostHeader = ({ title, date }: { title: string; date: Date }) => {
  const updatedAt = formatDate(date.toString())
  return (
    <HeaderWrapper>
      <Text>최근 수정 시각</Text>
      <Text>{updatedAt}</Text>
      <TitleWrapper>
        <H1>{title}</H1>
      </TitleWrapper>
    </HeaderWrapper>
  )
}
