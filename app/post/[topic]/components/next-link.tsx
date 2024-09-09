import Link from 'next/link'
import type { HTMLProps } from 'react'

export const NextLink = (props: HTMLProps<HTMLAnchorElement>) => {
  const { href } = props
  if (!href) {
    return null
  }

  return (
    <Link {...props} href={href}>
      {props.children}
    </Link>
  )
}
