import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
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
  padding-left: ${({ level }) => (level > 1 ? `${(level - 1) * 8}px` : '0')};

  &.active {
    font-weight: 600;
    color: #007cee;
  }

  &:hover {
    font-weight: 600;
    color: #222222;
  }

  transition:
    color 0.125s ease-in 0s,
    font-weight 0.125s ease-in 0s;
`

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
`

interface TocSideProps {
  tableOfContents: Toc[]
}

export const TocSide = ({ tableOfContents }: TocSideProps) => {
  const headingTops = useHeadingPositions(tableOfContents)
  const [activeToc, setActiveToc] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop()
      if (!headingTops || headingTops.length === 0) return

      // 첫 번째 헤딩의 top 위치를 기준으로 활성화 여부 결정
      const firstHeadingTop = headingTops[0].top

      if (scrollTop < firstHeadingTop) {
        // 스크롤 위치가 첫 번째 헤딩의 top 보다 작거나 같으면 첫 번째 헤딩 활성화
        setActiveToc(headingTops[0].slug)
      } else {
        // 그 외의 경우, 가장 가까운 헤딩 찾기
        const currentHeading = headingTops
          .slice()
          .reverse()
          .find((headingTop) => scrollTop >= headingTop.top - 4)

        if (currentHeading) {
          setActiveToc(currentHeading.slug)
        } else {
          setActiveToc('')
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll)

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
                  data-level={toc.level}
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

export default TocSide

const getScrollTop = () => {
  if (!document.body) return 0
  return document.documentElement?.scrollTop || document.body.scrollTop
}

interface IHeadingTops {
  slug: string
  top: number
}

const useHeadingPositions = (tableOfContents: Toc[]) => {
  const [headingTops, setHeadingTops] = useState<null | IHeadingTops[]>([])

  const settingHeadingTops = useCallback(() => {
    const scrollTop = getScrollTop()
    const tops = tableOfContents.map(({ slug }) => {
      const element = document.getElementById(slug)
      const top = element ? element.getBoundingClientRect().top + scrollTop : Infinity
      return { slug, top }
    })
    setHeadingTops(tops)
  }, [tableOfContents])

  useEffect(() => {
    settingHeadingTops()
    let prevScrollHeight = document.body.scrollHeight
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const trackScrollHeight = () => {
      const scrollHeight = document.body.scrollHeight
      if (prevScrollHeight !== scrollHeight) {
        settingHeadingTops()
      }
      prevScrollHeight = scrollHeight
      timeoutId = setTimeout(trackScrollHeight, 250)
    }

    timeoutId = setTimeout(trackScrollHeight, 250)

    return () => {
      timeoutId && clearTimeout(timeoutId)
    }
  }, [settingHeadingTops])

  return headingTops
}
