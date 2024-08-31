import styled from 'styled-components'
import { SearchResultPopover } from '../search-result-popover/search-result-popover'
import { useState } from 'react'

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 8px 12px;
`

const Container = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px ${({ theme }) => theme.colors.neutral[100]} solid;
`

interface HeaderMobileSearchProps {
  onClick: () => void
  isModalOpen: boolean
  onToggleModal: () => void
}

export function HeaderMobileSearch({
  onClick,
  isModalOpen,
  onToggleModal,
}: HeaderMobileSearchProps) {
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <>
      <Container onClick={onClick}>
        <SearchIcon src="/images/search-icon.svg" />
      </Container>
      <SearchResultPopover
        isOpen={isModalOpen}
        handleModal={onToggleModal}
        keyword={keyword}
        onChangeKeyword={handleChangeKeyword}
      />
    </>
  )
}
