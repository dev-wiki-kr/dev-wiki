'use client'

import { styled } from 'styled-components'

const Container = styled.a`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

interface UserProfileProps {
  avartarUrl: string
  profileUrl: string
}

export function UserProfile({ avartarUrl, profileUrl }: UserProfileProps) {
  return (
    <Container href={profileUrl}>
      <img src={avartarUrl} />
    </Container>
  )
}
