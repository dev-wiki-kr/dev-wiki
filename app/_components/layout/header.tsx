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

export function Header() {
  return (
    <StyledHeader>
      <Link href={'/'}>
        <H2>DevWiki</H2>
      </Link>
    </StyledHeader>
  )
}
