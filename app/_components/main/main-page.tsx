import styled from 'styled-components'
import { Search } from '../search/search'
import { RecentDocuments } from './recent-document'
import { PopualrArticels } from './popular-articles'

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTitleCon = styled.div`
  height: 43px;
  display: flex;
  font-size: 36px;
  margin-top: 183px;
  margin-bottom: 31px;
  font-weight: 600;
`

const StyledLogo = styled.div`
  color: #007cee;
  margin-left: 5px;
`

const StyledContentCon = styled.div`
  display: flex;
  width: 420px;
  margin-top: 90px;
  justify-content: space-between;
`

export function MainPage() {
  return (
    <Container>
      <StyledTitleCon>
        개발자를 위한 위키,
        <StyledLogo>DevWiki</StyledLogo>
      </StyledTitleCon>
      <Search />
      <StyledContentCon>
        <RecentDocuments />
        <PopualrArticels />
      </StyledContentCon>
    </Container>
  )
}
