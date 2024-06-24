'use client'

import { styled } from 'styled-components'
import { useRef, useState } from 'react'
import { useModal } from '../../_shared/modal/useModal'
import { useRouter } from 'next/navigation'
import { SearchResult } from './search-result'

const SearchCon = styled.div`
  width: 420px;
  height: 40px;
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

export function Search() {
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const SearchForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // router.push(`/post/${searchResult[0]._id}`)
    }
  }

  return (
    <div>
      <SearchCon onClick={handleModal}>
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
        dimColor="transparent"
        position={{ top: 357, left: 495.5 }}
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
