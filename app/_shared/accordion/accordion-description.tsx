import styled, { css } from 'styled-components'

interface AccordionDescriptionProps {
  children: React.ReactNode
  isExpand?: boolean
}

const AccordionDescriptionRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'expand',
})<{ expand?: boolean }>`
  line-height: 1.5;
  max-height: 100%;

  ${({ expand }) =>
    !expand &&
    css`
      max-height: 0;
      overflow: hidden;
    `};
`

export function AccordionDescription({ children, isExpand }: AccordionDescriptionProps) {
  return <AccordionDescriptionRoot expand={isExpand ?? true}>{children}</AccordionDescriptionRoot>
}
