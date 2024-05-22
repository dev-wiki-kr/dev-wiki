'use client'

import { styled } from 'styled-components'
import { H2 } from '../../_shared/heading'
import Link from 'next/link'
import { media } from '../../_styles/media'

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  padding: 18px 0;
  max-width: 768px;
  ${media.phone`
  height: 48px;
  padding : 18px 20px;
 `}
`

const StyledLink = styled(Link)`
  font-weight: 700;
  margin: 0;
  line-height: 33px;
  font-size: 24px;

  ${media.phone`
   font-size: 32px;
  `}
`

export function Header() {
  return (
    <StyledHeader>
      <StyledLink href={'/'}>DevWiki</StyledLink>
    </StyledHeader>
  )
}
