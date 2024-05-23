'use client'

import { styled } from 'styled-components'
import { H2 } from '../../_shared/heading'
import Link from 'next/link'

const StyledHeader = styled.header`
  width: 768px;
  height: 60px;
  margin: 0 auto;
  padding: 18px 0;
`

const StyledLink = styled(Link)`
  font-weight: 700;
  margin: 0;
  line-height: 33px;
  font-size: 24px;
`

export function Header() {
  return (
    <StyledHeader>
      <StyledLink href={'/'}>DevWiki</StyledLink>
    </StyledHeader>
  )
}