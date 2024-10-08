'use client'

import styled from 'styled-components'
import { LatestArticleResponse } from '../../_service/post/recent-documents'
import Link from 'next/link'
import { media } from '../../_styles/media'

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;

  ${media.phone`
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`

const StyledDocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`

const StyledDocumentLink = styled(Link)`
  width: 198px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  ${media.phone`
    width: 320px;
  `}
`

const DocumentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

interface LatestArticleProps {
  data: LatestArticleResponse[] | null
}

export function LatestArticle({ data }: LatestArticleProps) {
  const firstDataCategory = data?.slice(0, 5)
  const secondDataCategory = data?.slice(5, 10)

  return (
    <Container>
      <StyledDocumentContainer>
        {firstDataCategory?.map((data, index) => (
          <StyledDocumentLink key={index} href={data.url}>
            <DocumentIcon src="images/document-icon.svg" alt="document icon" />
            {data.title}
          </StyledDocumentLink>
        ))}
      </StyledDocumentContainer>
      <StyledDocumentContainer>
        {secondDataCategory?.map((data, index) => (
          <StyledDocumentLink key={index} href={data.url}>
            <DocumentIcon src="images/document-icon.svg" alt="document icon" />
            {data.title}
          </StyledDocumentLink>
        ))}
      </StyledDocumentContainer>
    </Container>
  )
}
