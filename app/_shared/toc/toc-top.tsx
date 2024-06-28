import Link from 'next/link'

import styled from 'styled-components'
import { media } from '../../_styles/media'
import type { ParsedMarkdown } from '../../_engine/parse-accordion'

const TocWrapper = styled.div`
  display: none; // 기본적으로 숨김

  ${media.laptop`
    display: block;
     margin-bottom: 20px;
  `}
`

const TocList = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const TocItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'level',
})<{ level: number }>`
  font-size: 14px;
  font-weight: 500;
  color: #777777;
  transform: scale(1);
  padding-left: ${({ level }) => (level > 1 ? `${(level - 1) * 8}px` : '0')};

  &:hover {
    font-weight: 600;
    color: #222222;
  }

  transition: all 0.125s ease-in-out 0s;
`

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
`

interface TocTopProps {
  tableOfContents: ParsedMarkdown[]
}

export function TocTop({ tableOfContents }: TocTopProps) {
  if (tableOfContents.length === 0) {
    return null
  }

  return (
    <TocWrapper>
      <TocList role="list">
        <Text>목차</Text>
        {tableOfContents.map((toc, i) => (
          <TocItem key={i} level={toc.level} data-level={toc.level}>
            <Link href={`#${toc.id}`}>{toc.text}</Link>
          </TocItem>
        ))}
      </TocList>
    </TocWrapper>
  )
}
