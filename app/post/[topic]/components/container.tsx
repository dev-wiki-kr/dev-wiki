'use client'

import { styled } from 'styled-components'

export function Container({ children }: { children: React.ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>
}

const StyledContainer = styled.article`
  width: 768px;
  margin: 100px auto;
`
