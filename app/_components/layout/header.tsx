'use client'

import { styled } from 'styled-components'
import Link from 'next/link'
import { media } from '../../_styles/media'
import { UserAccountMenu } from '../auth/user-account-menu'
import { HeaderSearch } from '../search/header-search/header-search'

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  padding: 18px 0;
  max-width: 768px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.phone`
    height: 48px;
    padding : 18px 20px;
 `}
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;

  margin: 0;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

interface HeaderProps {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <StyledHeader>
      <StyledLink href={'/'}>DevWiki</StyledLink>
      <Container>
        {children}
        <UserAccountMenu />
      </Container>
    </StyledHeader>
  )
}
