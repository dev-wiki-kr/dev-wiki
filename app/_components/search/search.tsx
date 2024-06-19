'use client'

import { styled } from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { Modal } from '../../_shared/modal/modal'
import { useModal } from '../../_shared/modal/useModal'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Option, getSearchAutocomplete } from '../_service/search'

const SearchCon = styled.div`
  width: 420px;
  height: 40px;
  border: #dddddd solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
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

const DocumentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const StyledSearchResultCon = styled.div`
  width: 420px;
  height: fit-content;
  max-height: 240px;
  padding: 12px;
  background: white;
  border: #b5b5b5 solid;
  border-top: none;
  border-radius: 0px 0px 8px 8px;
`

const StyledResultCon = styled(Link)`
  width: 396px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  font-size: 16px;
  align-items: center;
  background: white;

  &:hover {
    background: #f2f2f2;
    border-radius: 6px;
  }
`
const StyledNotFound = styled.div`
  width: 392px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  font-size: 16px;
  color: #777777;
  align-items: center;
  background: white;
`

export function Search() {
  const [searchResult, setSearchResult] = useState<Option[]>([])
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { data, error } = useQuery({
    queryKey: ['search-autocomplete', keyword],
    queryFn: () => getSearchAutocomplete(keyword),
  })

  const SearchForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/post/${searchResult[0]._id}`)
    }
  }

  useEffect(() => {
    if (!data) {
      return
    }
    setSearchResult(data)
  }, [data])

  useEffect(() => {
    if (!isOpen) {
      setKeyword('')
      setSearchResult([])
    }
  }, [isOpen])

  if (error) {
    return <StyledNotFound>{keyword}에 대한 검색결과를 찾을 수 없습니다.</StyledNotFound>
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
      <Modal
        isOpen={isOpen}
        handleModal={handleModal}
        dimColor="transparent"
        position={{ top: 136, left: 0 }}
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
