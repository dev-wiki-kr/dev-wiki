'use client'

import styled from 'styled-components'

const Link = styled.a`
  font-size: 16px;
  color: #777;
  line-height: 1.5;
`

export function LoginLink() {
  return <Link href="https://devwiki.co.kr/api/oauth">로그인</Link>
}
