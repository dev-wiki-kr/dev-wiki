'use client'

import { styled } from 'styled-components'
import { useSearchContainerPosition } from '../context'

const Container = styled.div`
  position: relative;
`

const SearchContainer = styled.div`
  width: 240px;
  height: 40px;
  border: #dddddd solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  align-items: center;
  display: flex;
`

const Input = styled.input`
  width: 80%;
  height: 24px;
  margin: 8px 0px;
  margin-right: 16px;
  border: none;
  &:focus {
    outline: none;
  }
  font-size: 16px;
`

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 8px 12px;
`

export function HeaderSearch() {
  const { searchNode } = useSearchContainerPosition()

  const handleClickSearch = () => {
    searchNode?.click()
    searchNode?.querySelector('input')?.focus()
  }

  return (
    <Container>
      <SearchContainer onClick={handleClickSearch}>
        <SearchIcon src="images/search-icon.svg" />
        <Input placeholder="검색어를 입력해 주세요." />
      </SearchContainer>
    </Container>
  )
}
