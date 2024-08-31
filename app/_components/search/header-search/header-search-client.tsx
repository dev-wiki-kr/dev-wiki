'use client'

import { useModal } from '../../../_shared/modal/useModal'
import { useIsMobileQuery } from '../../../hooks/use-media-query'
import { useSearchContainerPosition } from '../context'
import { HeaderDesktopSearch } from './header-desktop-search'
import { HeaderMobileSearch } from './header-mobile-search'

interface HeaderSearchClientProps {
  isMobileAgent: boolean
}

export function HeaderSearchClient({ isMobileAgent }: HeaderSearchClientProps) {
  const { isMobile } = useIsMobileQuery()
  const { handleClickSearch, isOpen: isModalOpen, handleModal: onToggleModal } = useHeaderSearch()

  if (isMobile || isMobileAgent) {
    return (
      <HeaderMobileSearch
        onClick={handleClickSearch}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModal}
      />
    )
  }

  return <HeaderDesktopSearch onClick={handleClickSearch} />
}

export function useHeaderSearch() {
  const { searchNode } = useSearchContainerPosition()
  const { isOpen, handleModal } = useModal()

  const handleClickSearch = () => {
    if (searchNode) {
      searchNode.click()
      searchNode.querySelector('input')?.focus()
    } else {
      handleModal()
    }
  }

  return { handleClickSearch, isOpen, handleModal }
}
