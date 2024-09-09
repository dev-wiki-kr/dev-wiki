'use client'

import { styled } from 'styled-components'
import Link from 'next/link'
import { media } from '../../_styles/media'

const StyledFooter = styled.footer`
  width: 100%;
  min-height: 400px;
  max-width: 768px;
  margin: 0 auto;
  padding: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  ${media.phone`
    flex-direction: column;
    align-items: flex-start;
    padding : 40px 20px;
  `}
`

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutral[900]};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 32px;

  ${media.phone`
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  `}
`

const BaseText = styled.p`
  ${({ theme }) => theme.typo.caption_12};
  color: ${({ theme }) => theme.colors.neutral[700]};
`
const Text = styled(BaseText)`
  flex: 1;
  text-underline-offset: 2px;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
`

const GithubIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`

const StyledLicenseLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  text-decoration: underline;
`

export function Footer() {
  return (
    <StyledFooter>
      <StyledLink href={'/'}>DevWiki</StyledLink>
      <TextContainer>
        <Text>
          모든 문서는&nbsp;
          <StyledLicenseLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko">
            크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 (CC BY-NC-SA 4.0)
          </StyledLicenseLink>
          &nbsp;에 따라 사용할 수 있으며, 추가적인 조건이 적용될 수 있습니다. 작성한 문서의 저작권은
          작성자에게 있습니다. 기여자는 기여하신 부분의 저작권을 갖습니다.
        </Text>
        <Text>
          데브위키는 정확하고 신뢰할 수 있는 정보를 제공하기 위해 최선을 다하고 있습니다. 그러나
          오류가 있을 수 있으며, 최신 정보가 반영되지 않을 수도 있습니다.
        </Text>
      </TextContainer>
      <SocialLink href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
        <GithubIcon src="/icons/github.svg" alt="GitHub" />
        <BaseText>Github</BaseText>
      </SocialLink>
    </StyledFooter>
  )
}
