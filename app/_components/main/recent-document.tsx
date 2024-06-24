import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { getRecentDocuments } from '../_service/recent-documents'

const StyledDocumentCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`

const StyledDocument = styled.div`
  width: 198px;
  height: 24px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`

const DocumentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

export function RecentDocuments() {
  const { data } = useQuery({ queryKey: ['recent'], queryFn: () => getRecentDocuments() })
  return (
    <StyledDocumentCon>
      {data?.map((data, index) => (
        <StyledDocument key={index}>
          <DocumentIcon src="images/document-icon.svg" alt="document icon" />
          {data}
        </StyledDocument>
      ))}
    </StyledDocumentCon>
  )
}
