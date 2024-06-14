'use client'

import { styled } from 'styled-components'

export function Container({ children }: { children: React.ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>
}

const StyledContainer = styled.div`
  max-width: 768px;
  margin: 5.5rem auto 0 auto;
`
