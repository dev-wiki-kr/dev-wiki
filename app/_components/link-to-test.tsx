'use client'

import Link from 'next/link'
import { styled } from 'styled-components'

const StyledLink = styled(Link)`
  font-size: 24px;
`

export function LinkToTest() {
  return <StyledLink href={'/wiki/Three.js'}>Three.js 위키로 이동하기</StyledLink>
}
