'use client'

import styled from 'styled-components'
import { AuthorInfo } from './author-info'

const Container = styled.div`
  width: 1024px;
  height: 250px;
  padding-top: 20px;
`

const InfoMessage = styled.p`
  font-size: 18px;
  margin-bottom: 12px;
`

const AuthorContainer = styled.div`
  display: flex;
`

const ShowMore = styled.div`
  color: #007df0;
  font-size: 18px;
  cursor: pointer;
`

interface AuthorInterface {
  authorData: { username: string; avartarUrl: string }
  contributorData: ContributorInfoInterface[]
}
interface ContributorInfoInterface {
  avartarUrl: string
  username: string
}

export function Author({ authorData }: AuthorInterface) {
  return (
    <Container>
      <hr />
      <InfoMessage>작성자 및 기여자</InfoMessage>
      <AuthorContainer>
        <AuthorInfo src={authorData!.avartarUrl!} username={authorData.username!} />
      </AuthorContainer>
      <ShowMore>더 보기 ↓</ShowMore>
    </Container>
  )
}
