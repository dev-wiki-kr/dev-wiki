import { styled } from 'styled-components'

interface InternalLinkProps {
  href: string
  children: React.ReactNode
}

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.blue[600]};
`

export function InternalLink({ href, children, ...props }: InternalLinkProps) {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </StyledLink>
  )
}
