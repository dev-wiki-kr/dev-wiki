import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { AccordionProvider } from './context'

interface AccordionProps {
  children: React.ReactNode
}

const SummaryContainer = styled.div`
  margin-bottom: 12px;
`

const Container = styled.div`
  margin-top: 40px;
`

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { children: accordionChildren },
  ref,
) {
  const [expanded, setExpanded] = useState(true)
  const [summary, ...children] = React.Children.toArray(accordionChildren)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Container ref={ref}>
      <AccordionProvider expand={!!expanded}>
        <SummaryContainer onClick={handleChange}>{summary}</SummaryContainer>
      </AccordionProvider>
      {expanded ? <div>{children}</div> : null}
    </Container>
  )
})
