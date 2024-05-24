import Link from 'next/link'
import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'
import { Accordion, AccordionDescription, AccordionTitle } from '../../../_shared/accordion'
import { H1, H2, H3 } from '../../../_shared/heading'

export const mdxComponents: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      <Link {...props} href={props.href || ''}>
        {children}
      </Link>
    )
  },
  Accordion: ({ children }) => <Accordion>{children}</Accordion>,
  AccordionTitle: ({ children }) => <AccordionTitle>{children}</AccordionTitle>,
  AccordionDescription: ({ children }) => <AccordionDescription>{children}</AccordionDescription>,
  Img: ({ src, ...props }) => {
    if (!src) throw new Error('src is required')
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
      <Image
        {...props}
        src={src}
        alt={props.alt ?? ''}
        width={Number(props.width)}
        height={Number(props.height)}
      />
    )
  },
  H1: ({ children }) => <H1>{children}</H1>,
  H2: ({ children }) => <H2>{children}</H2>,
  H3: ({ children }) => <H3>{children}</H3>,
}
