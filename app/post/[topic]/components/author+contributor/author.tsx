'use client'

import styled from 'styled-components'
import { AuthorInfo } from './author-info'
import { ContributorInfo } from './contributor-info'
import { useState } from 'react'

const Container = styled.div`
  width: 1024px;
  padding-top: 20px;
`

const InfoMessage = styled.p`
  font-size: 18px;
  margin-bottom: 12px;
`

const AuthorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const ShowMore = styled.div`
  display: flex;
  color: #007df0;
  font-size: 18px;
  cursor: pointer;
  justify-content: center;
`

interface AuthorInterface {
  authorData: { username: string; avartarUrl: string }
  contributorData: ContributorInfoInterface[]
}
interface ContributorInfoInterface {
  avartarUrl: string
  username: string
}

export function Author({ authorData, contributorData }: AuthorInterface) {
  const showAll = contributorData.length > 6
  const displayedContributors = showAll ? contributorData.slice(0, 5) : contributorData
  const showAllContrubutors = showAll ? contributorData.slice(5) : null

  const [isOpen, setOpen] = useState(false)
  function handleOpen() {
    setOpen(!isOpen)
  }
  return (
    <Container>
      <hr />
      <InfoMessage>작성자 및 기여자</InfoMessage>
      <AuthorContainer>
        <AuthorInfo src={authorData!.avartarUrl!} username={authorData.username!} />
        {displayedContributors.map((contributor, index) => (
          <ContributorInfo
            src={contributor.avartarUrl}
            username={contributor.username}
            key={index}
          />
        ))}
      </AuthorContainer>
      {isOpen && (
        <AuthorContainer>
          {showAllContrubutors?.map((contributor, index) => (
            <ContributorInfo
              src={contributor.avartarUrl}
              username={contributor.username}
              key={index}
            />
          ))}
        </AuthorContainer>
      )}
      {showAll && <ShowMore onClick={handleOpen}>더 보기 ↓</ShowMore>}
    </Container>
  )
}
