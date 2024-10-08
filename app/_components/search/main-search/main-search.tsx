'use client'

import { css, styled } from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { useModal } from '../../../_shared/modal/useModal'
import { media } from '../../../_styles/media'
import { useSearchContainerPosition } from '../context'
import { SearchResultPopover } from '../search-result-popover/search-result-popover'

const Container = styled.div`
  position: relative;
`

const SearchCon = styled.div<{ $isOpen: boolean }>`
  width: 420px;
  height: 40px;
  border: 1px ${({ theme }) => theme.colors.neutral[100]} solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  align-items: center;
  display: flex;

  ${media.phone`
    width: 330px;
  `}

  &:hover {
    border: 1px ${({ theme }) => theme.colors.neutral[300]} solid;
  }
  ${(props) =>
    props.$isOpen &&
    css`
      border: 1px ${({ theme }) => theme.colors.neutral[300]} solid;
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

  ${({ theme }) => theme.typo.body2_16};
  color: ${({ theme }) => theme.colors.neutral[900]};

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
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
  z-index: 1;
`

export function MainSearch() {
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleRefChange } = useSearchContainerPosition()

  const SearchForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // router.push(`/post/${searchResult[0]._id}`)
    }
  }

  const handleChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.blur()
    }
  }, [isOpen])

  return (
    <Container>
      <SearchCon ref={handleRefChange} onClick={handleModal} $isOpen={isOpen}>
        <SearchIcon src="/images/search-icon.svg" />
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
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
      <SearchResultPopover
        isOpen={isOpen}
        handleModal={handleModal}
        keyword={keyword}
        onChangeKeyword={handleChangeKeyword}
      />
    </Container>
  )
}
