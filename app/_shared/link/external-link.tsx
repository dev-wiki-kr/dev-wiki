import styled from 'styled-components'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
}

const StyledLink = styled.a`
  color: #007cee;
  display: inline-block;
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    margin-right: 0.25rem;
    background-image: url('https://github.com/hwangstar156/hwangstar156/assets/85891751/00975592-a06b-4d74-a624-0a6b34b957f2');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px 16px;
    position: absolute;
    left: 0; /* Adjust based on icon size and spacing preference */
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    width: 16px;
    height: 16px;
  }
`

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </StyledLink>
  )
}
