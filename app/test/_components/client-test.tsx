'use client'

import { styled } from 'styled-components'

const Container = styled.div`
  width: 300px;
  height: 300px;
  color: white;
  background-color: blue;
`

interface ClientTestProps {
  children: React.ReactNode
}

export function ClientTest({ children }: ClientTestProps) {
  return <Container>children: {children}</Container>
}
