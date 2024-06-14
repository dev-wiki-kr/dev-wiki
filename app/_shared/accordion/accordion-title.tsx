import styled, { css } from 'styled-components'
import { useAccordionContext } from './context'

interface AccordionTitleProps {
  children: React.ReactNode
  id?: string
  isExpand?: boolean
}

const AccordionRoot = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AccordionTitleContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'expand',
})<{ expand?: boolean }>`
  height: 30px;
  line-height: 1.5;
  margin-left: 3px;

  ${({ expand }) =>
    !expand &&
    css`
      opacity: 0.5;
    `}
`

const Icon = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== 'expand',
})<{ expand?: boolean }>`
  ${({ expand }) =>
    !expand &&
    css`
      transform: rotate(-90deg);
    `}
`

export function AccordionTitle({ children, id, isExpand }: AccordionTitleProps) {
  const { toggle } = useAccordionContext()

  const handleAccordionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 앵커 태그가 클릭된 경우, 아코디언 토글 방지
    const target = event.target as HTMLElement
    if (target.dataset.id === 'accordionAnchor') {
      return
    }

    toggle(id ?? '')
  }

  return (
    <AccordionRoot onClick={handleAccordionClick}>
      <Icon src="/icons/caret-down.svg" expand={isExpand} />
      <AccordionTitleContainer expand={isExpand ?? true}>{children}</AccordionTitleContainer>
    </AccordionRoot>
  )
}
