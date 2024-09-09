'use client'

import { useIsMobileQuery } from '../../../hooks/use-media-query'
import { useSearchContainerPosition } from '../context'
import { HeaderDesktopSearch } from './header-desktop-search'
import { HeaderMobileSearch } from './header-mobile-search'

interface HeaderSearchClientProps {
  isMobileAgent: boolean
}

export function HeaderSearchClient({ isMobileAgent }: HeaderSearchClientProps) {
  const { isMobile } = useIsMobileQuery()
  const { handleClickSearch } = useHeaderSearch()

  if (isMobile || isMobileAgent) {
    return <HeaderMobileSearch onClick={handleClickSearch} />
  }

  return <HeaderDesktopSearch onClick={handleClickSearch} />
}

export function useHeaderSearch() {
  const { searchNode } = useSearchContainerPosition()

  const handleClickSearch = () => {
    searchNode?.click()
    searchNode?.querySelector('input')?.focus()
  }

  return { handleClickSearch }
}
