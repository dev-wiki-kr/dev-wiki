import { LinkToTest } from './_components/link-to-test'
import { Accordion, AccordionDescription, AccordionTitle } from './_shared/accordion'
import { H2 } from './_shared/heading'

export default function Home() {
  return (
    <Accordion>
      <AccordionTitle>
        <H2>1. 개요</H2>
      </AccordionTitle>
      <AccordionDescription>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam illum similique expedita
        tempore rerum, doloremque aut ducimus dolor asperiores eum fugit, ad voluptatum quam beatae
        iste reiciendis officia, aspernatur enim.
      </AccordionDescription>
    </Accordion>
  )
}
