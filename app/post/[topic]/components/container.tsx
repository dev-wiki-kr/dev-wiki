'use client'

import { styled } from 'styled-components'
import { media } from '../../../_styles/media'

export function Container({ children }: { children: React.ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>
}

const StyledContainer = styled.article`
  max-width: 768px;
  margin: 5.5rem auto 0 auto;

  ${media.phone`
    padding: 0 12px;
  `}
`
