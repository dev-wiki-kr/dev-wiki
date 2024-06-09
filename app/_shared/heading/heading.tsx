import styled, { css } from 'styled-components'
import { media } from '../../_styles/media'

const Heading = css`
  font-weight: 700;
  margin: 0;
  line-height: 33px;
  color: #222;

  & > a.anchor {
    color: #007cee;

    &:hover {
      color: #0056b3;
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
