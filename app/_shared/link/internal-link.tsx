import { styled } from 'styled-components'

interface InternalLinkProps {
  href: string
  children: React.ReactNode
}

const StyledLink = styled.a`
  color: #007cee;
`

export function InternalLink({ href, children, ...props }: InternalLinkProps) {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </StyledLink>
  )
}
