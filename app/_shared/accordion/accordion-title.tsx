'use client'

import styled, { css } from 'styled-components'
import { useAccordionContext } from './context'

interface AccordionTitleProps {
  children: React.ReactNode
}

const AccordionRoot = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AccordionTitleContainer = styled.div`
  height: 30px;
  line-height: 1.5;
  margin-left: 3px;
`

const Icon = styled.img<{ expand: boolean }>`
  ${({ expand }) =>
    !expand &&
    css`
      transform: rotate(-90deg);
    `}
`

export function AccordionTitle({ children }: AccordionTitleProps) {
  const { expand } = useAccordionContext()

  return (
    <AccordionRoot>
      <Icon src="/icons/caret-down.svg" expand={expand} />
      <AccordionTitleContainer>{children}</AccordionTitleContainer>
    </AccordionRoot>
  )
}
