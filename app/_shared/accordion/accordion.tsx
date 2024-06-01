import React, { forwardRef, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { useAccordionContext } from './context'

interface AccordionChildProps {
  id: string
  isExpand: boolean
}

interface AccordionProps {
  children: ReactNode
  id: string
}

const Container = styled.div`
  margin-top: 40px;
`

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { children, id },
  ref,
) {
  const { expand, initialize } = useAccordionContext()

  useEffect(() => {
    initialize(id)
  }, [id])

  return (
    <Container ref={ref}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<AccordionChildProps>(child)) {
          return React.cloneElement(child, {
            id,
            isExpand: expand[id],
          })
        }
        return child
      })}
    </Container>
  )
})
