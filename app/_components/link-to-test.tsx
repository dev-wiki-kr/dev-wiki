'use client'

import Link from 'next/link'
import { styled } from 'styled-components'
import { Search } from './search/search'

const StyledLink = styled(Link)`
  font-size: 24px;
`

export function LinkToTest() {
  return (
    <div>
      <StyledLink href={'/wiki/Next.js'}>Next.js 위키로 이동하기</StyledLink>
      <Search />
    </div>
  )
}
