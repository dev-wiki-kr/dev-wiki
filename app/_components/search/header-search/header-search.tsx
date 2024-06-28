'use client'

import { styled } from 'styled-components'
import { useRef, useState } from 'react'
import { useModal } from '../../../_shared/modal/useModal'
import { useRouter } from 'next/dist/client/router'
import { HeaderSearchResult } from './header-search-result'

const Container = styled.div`
  position: relative;
`

const SearchCon = styled.div<{ $isOpen: boolean }>`
  width: 240px;
  height: 40px;
  border: #dddddd solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  align-items: center;
  display: flex;

  &:hover {
    border: #b5b5b5 solid;
  }
  ${(props) =>
    props.$isOpen &&
    `
    z-index: 100;
    border: #b5b5b5 solid;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px 8px 0px 0px;
  `}
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
const XIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  z-index: 10;
`

export function HeaderSearch() {
  const { isOpen, handleModal, openModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  // const router = useRouter()
  const searchConRef = useRef<HTMLDivElement>(null) // useRef 생성

  const getModalPosition = () => {
    if (!searchConRef.current) return { top: 0, left: 0 }
    const { top, left } = searchConRef.current.getBoundingClientRect()
    return { top: top + searchConRef.current.offsetHeight, left }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) {
      openModal()
    }
    setKeyword(e.target.value)
  }

  const SearchForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // router.push(`/post/${searchResult[0]._id}`)
    }
  }

  return (
    <Container>
      <SearchCon ref={searchConRef} onClick={handleModal} $isOpen={isOpen}>
        <SearchIcon src="images/search-icon.svg" />
        <Input
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={SearchForEnter}
          placeholder="검색어를 입력해 주세요."
          ref={inputRef}
        />
        {keyword && (
          <XIcon
            src="images/X-mark.svg"
            onClick={(e) => {
              e.stopPropagation()
              setKeyword('')
              if (inputRef.current) inputRef.current.focus()
            }}
          />
        )}
      </SearchCon>
      <HeaderSearchResult
        keyword={keyword}
        isOpen={isOpen}
        handleModal={handleModal}
        setKeyword={setKeyword}
        searchConRef={getModalPosition()}
      />
    </Container>
  )
}
