'use client'

import { styled } from 'styled-components'
import { useRef, useState } from 'react'
import { useModal } from '../../_shared/modal/useModal'
import { useRouter } from 'next/navigation'
import { SearchResult } from './search-result'

const Container = styled.div`
  position: relative;
`

const SearchCon = styled.div<{ $width?: number; $height?: number }>`
  width: ${(props) => props.$width || 420}px;
  height: ${(props) => props.$height || 40}px;
  border: #dddddd solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  align-items: center;

  display: flex;
  &:hover {
    border: #b5b5b5 solid;
  }
  &:focus-within {
    border: #b5b5b5 solid;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px 8px 0px 0px;
  }
`

const Input = styled.input`
  width: 356px;
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
  z-index: 1;
`
interface SearchProps {
  width?: number
  height?: number
}

export function Search({ width = 420, height = 40 }: SearchProps) {
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchConRef = useRef<HTMLDivElement>(null) // useRef 생성

  const getModalPosition = () => {
    if (!searchConRef.current) return { top: 0, left: 0 }
    const { top, left } = searchConRef.current.getBoundingClientRect()
    return { top: top + searchConRef.current.offsetHeight, left }
  }

  const SearchForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // router.push(`/post/${searchResult[0]._id}`)
    }
  }

  return (
    <Container>
      <SearchCon ref={searchConRef} onClick={handleModal} $width={width} $height={height}>
        <SearchIcon src="images/search-icon.svg" />
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
      <SearchResult
        keyword={keyword}
        isOpen={isOpen}
        handleModal={handleModal}
        dimColor="rgba(255, 255, 255, 0.8)"
        position={{ top: 136, left: 0 }}
        searchConRef={getModalPosition()}
        resultWidth={width}
      >
        <StyledSearchResultCon>
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((data) => (
              <StyledResultCon href={`/post/${data._id}`} key={data._id}>
                <DocumentIcon src="images/document-icon.svg" />
                {data.text}
              </StyledResultCon>
            ))
          ) : (
            <StyledNotFound>{keyword}에 대한 검색결과가 없습니다.</StyledNotFound>
          )}
        </StyledSearchResultCon>
      </Modal>
    </div>
  )
}
