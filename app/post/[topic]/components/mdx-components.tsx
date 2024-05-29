import type { MDXComponents } from 'mdx/types'
import { Accordion, AccordionDescription, AccordionTitle } from '../../../_shared/accordion'
import { H1, H2, H3 } from '../../../_shared/heading'
import NextLink from './next-link'
import NextImage from './next-image'

export const mdxComponents: MDXComponents = {
  a: NextLink,
  img: NextImage,
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  Accordion: ({ children }) => <Accordion>{children}</Accordion>,
  AccordionTitle: ({ children }) => <AccordionTitle>{children}</AccordionTitle>,
  AccordionDescription: ({ children }) => <AccordionDescription>{children}</AccordionDescription>,
}
