import styled from 'styled-components'

interface AccordionDescriptionProps {
  children: React.ReactNode
}

const AccordionDescriptionRoot = styled.div`
  line-height: 1.5;
`

export function AccordionDescription({ children }: AccordionDescriptionProps) {
  return <AccordionDescriptionRoot>{children}</AccordionDescriptionRoot>
}
