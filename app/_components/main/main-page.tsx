import styled from 'styled-components'
import { MainSearch } from '../search/main-search/main-search'
import { RecentDocuments } from './recent-document'
import { PopualrArticels } from './popular-articles'
import { media } from '../../_styles/media'

const Container = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTitleContainer = styled.div`
  height: 43px;
  display: flex;
  font-size: 36px;
  margin-top: 183px;
  margin-bottom: 31px;
  font-weight: 600;

  ${media.phone`
      font-size: 28px;
  `}
`

const StyledLogo = styled.div`
  color: #007cee;
  margin-left: 5px;
`

const StyledContentContainer = styled.div`
  display: flex;
  width: 420px;
  margin-top: 90px;
  justify-content: space-between;

  ${media.phone`
    margin-top: 40px;
  `}
`

export function MainPage() {
  return (
    <Container>
      <StyledTitleContainer>
        개발자를 위한 위키,
        <StyledLogo>DevWiki</StyledLogo>
      </StyledTitleContainer>
      <MainSearch />
      <StyledContentContainer>
        <RecentDocuments />
        <PopualrArticels />
      </StyledContentContainer>
    </Container>
  )
}
