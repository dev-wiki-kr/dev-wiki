import Image from 'next/image'
import type { HTMLProps } from 'react'

export default function NextImage(props: HTMLProps<HTMLImageElement>) {
  const { src } = props
  const width = Number(props.width)
  const height = Number(props.height)

  if (!src) throw new Error('src is required')

  return <Image src={src} alt={props.alt ?? ''} width={width} height={height} />
}
