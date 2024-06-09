import type { MDXComponents } from 'mdx/types'
import {
  Accordion,
  AccordionDescription,
  AccordionProvider,
  AccordionTitle,
} from '../../../_shared/accordion'
import { H1, H2, H3, H4, H5, H6 } from '../../../_shared/heading'
import { NextLink } from './next-link'

export const mdxComponents: MDXComponents = {
  a: NextLink,
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  h4: (props) => <H4 {...props} />,
  h5: (props) => <H5 {...props} />,
  h6: (props) => <H6 {...props} />,
  Accordion: (props) => <Accordion {...props} />,
  AccordionProvider: (props) => <AccordionProvider {...props} />,
  AccordionTitle: (props) => <AccordionTitle {...props} />,
  AccordionDescription: (props) => <AccordionDescription {...props} />,
}
