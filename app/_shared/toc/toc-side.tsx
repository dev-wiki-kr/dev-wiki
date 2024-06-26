import Link from 'next/link'

import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { debounce, throttle } from 'lodash-es'

import { type Toc } from '../../lib/get-toc'

const TocContainer = styled.aside`
  max-width: 240px;
  min-width: 210px;
  position: absolute;
  height: 100%;
  right: 100%;
  margin-right: 2.5rem;
`

const TocWrapper = styled.div`
  position: sticky;
  top: 5.5rem;
`

const TocContent = styled.div`
  padding-block: 0.5rem;
  padding-inline: 1rem;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
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

  &.active {
    font-weight: 600;
    color: #007cee;
    transform: scale(1.05);
  }

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

interface TocSideProps {
  tableOfContents: Toc[]
}

export function TocSide({ tableOfContents }: TocSideProps) {
  const headingTops = useHeadingPositions(tableOfContents)
  const [activeToc, setActiveToc] = useState('')

  useEffect(() => {
    const onScroll = throttle(() => {
      const scrollTop = getScrollTop()

      if (!headingTops || headingTops.length === 0) {
        return
      }

      const firstHeadingTop = headingTops[0].top
      if (scrollTop < firstHeadingTop) {
        // 스크롤 위치가 첫 번째 헤딩의 스크롤 위치 보다 작거나 같으면 첫 번째 헤딩 활성화
        setActiveToc(headingTops[0].slug)
        return
      }

      const currentHeading = headingTops
        .slice()
        .reverse()
        .find((headingTop) => scrollTop >= headingTop.top - 10)

      setActiveToc(currentHeading ? currentHeading.slug : '')
    }, 300)

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [headingTops])

  return (
    <TocContainer>
      <TocWrapper>
        <TocContent>
          {tableOfContents.length ? (
            <TocList role="list">
              <Text>목차</Text>
              {tableOfContents.map((toc, i) => (
                <TocItem
                  key={i}
                  level={toc.level}
                  className={`${activeToc === toc.slug ? 'active' : ''}`}
                >
                  <Link href={`#${toc.slug}`}>{toc.text}</Link>
                </TocItem>
              ))}
            </TocList>
          ) : null}
        </TocContent>
      </TocWrapper>
    </TocContainer>
  )
}

const getScrollTop = () => {
  if (!document.body) {
    return 0
  }
  return document.documentElement?.scrollTop || document.body.scrollTop
}

interface HeadingTops {
  slug: string
  top: number
}

const useHeadingPositions = (tableOfContents: Toc[]) => {
  const [headings, setHeadings] = useState<null | HeadingTops[]>([])

  useEffect(() => {
    const setHeadingTops = debounce(() => {
      const scrollTop = getScrollTop()

      const tops = tableOfContents.map(({ slug }) => {
        const element = document.getElementById(slug)
        const top = element ? element.getBoundingClientRect().top + scrollTop : Infinity
        return { slug, top }
      })
      setHeadings(tops)
    }, 2000)

    setHeadingTops()

    window.addEventListener('resize', setHeadingTops)

    return () => {
      window.removeEventListener('resize', setHeadingTops)
    }
  }, [])

  return headings
}
