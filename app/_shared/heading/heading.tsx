import styled, { css } from 'styled-components'
import { media } from '../../_styles/media'

const Heading = css`
  font-weight: 700;
  margin: 0;
  line-height: 33px;
  color: ${({ theme }) => theme.colors.neutral[900]};
  white-space: break-spaces;

  display: flex;
  align-items: center;
  gap: 8px;

  & > a.anchor {
    color: ${({ theme }) => theme.colors.blue[600]};

    &:hover,
    &:active {
      color: ${({ theme }) => theme.colors.blue[800]};
    }
  }

  transition: color 0.05s ease-in;
`

export const H1 = styled.h1`
  ${Heading};
  font-size: 48px;

  ${media.phone`
   font-size: 32px;
  `}
`
export const H2 = styled.h2`
  ${Heading};
  font-size: 24px;

  ${media.phone`
   font-size: 22px;
  `}
`
export const H3 = styled.h3`
  ${Heading};
  font-size: 20px;

  ${media.phone`
   font-size: 18px;
  `}
`
export const H4 = styled.h4`
  ${Heading};
  font-size: 20px;

  ${media.phone`
   font-size: 18px;
  `}
`
export const H5 = styled.h5`
  ${Heading}
  font-size: 20px;

  ${media.phone`
   font-size: 18px;
  `}
`
export const H6 = styled.h6`
  ${Heading}
  font-size: 20px;

  ${media.phone`
   font-size: 18px;
  `}
`

interface CustomHeadingProps {
  level: number
  children: React.ReactNode
}

export function CustomHeading({ level, children }: CustomHeadingProps) {
  switch (level) {
    case 1:
      return <H1>{children}</H1>
    case 2:
      return <H2>{children}</H2>
    case 3:
      return <H3>{children}</H3>
    case 4:
      return <H4>{children}</H4>
    case 5:
      return <H5>{children}</H5>
    case 6:
      return <H6>{children}</H6>
    default:
      return null
  }
}
