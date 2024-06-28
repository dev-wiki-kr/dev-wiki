import { useEffect, useState } from 'react'

export function useIsMobileQuery() {
  const isMobile = useMediaQuery(`(max-width: 768px)`)

  return {
    isMobile,
  } as const
}

export function useMediaQuery(query: string) {
  const mq = useMatchMedia(query)
  const matches = useMatches(mq)

  return matches
}

function useMatchMedia(query: string) {
  const [mq, setMq] = useState<MediaQueryList>()

  useEffect(() => {
    const media = window.matchMedia(query)
    setMq(media)
  }, [query])

  return mq
}

function useMatches(mediaQuery?: MediaQueryList) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (!mediaQuery) {
      return
    }

    const updateMedia = () => setMatches(mediaQuery.matches)
    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateMedia)

    return () => mediaQuery.removeEventListener('change', updateMedia)
  }, [mediaQuery])

  return matches
}
