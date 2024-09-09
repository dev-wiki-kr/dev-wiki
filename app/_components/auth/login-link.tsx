'use client'

import styled from 'styled-components'

const Link = styled.a`
  ${({ theme }) => theme.typo.body2_16};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-left: 8px;
  padding: 4px 8px;
`

export function LoginLink() {
  return <Link href="https://devwiki.co.kr/wiki-api/oauth">로그인</Link>
}
