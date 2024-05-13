'use client'

import Link from 'next/link'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: blue;
`

export function Notfound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <StyledLink href="/">Return Home</StyledLink>
    </div>
  )
}
