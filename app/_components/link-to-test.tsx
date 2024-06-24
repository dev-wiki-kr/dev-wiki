'use client'

import Link from 'next/link'
import { styled } from 'styled-components'
import { MainPage } from './main/main-page'

const StyledLink = styled(Link)`
  font-size: 24px;
`

export function LinkToTest() {
  return <MainPage></MainPage>
}
