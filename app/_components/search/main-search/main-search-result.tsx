import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled from 'styled-components'
import { Option, getSearchAutocomplete } from '../../../_service/search'
import { useEffect, useState } from 'react'
import { Modal } from '../../../_shared/modal/modal'

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
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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

interface SearchResultProps {
  keyword: string
  isOpen: boolean
  handleModal: () => void
  setKeyword: React.Dispatch<React.SetStateAction<string>>
  searchConRef: { top: number; left: number }
}

export function SearchResult({
  keyword,
  isOpen,
  handleModal,
  setKeyword,
  searchConRef,
}: SearchResultProps) {
  const [searchResult, setSearchResult] = useState<Option[]>([])

  const { data } = useQuery({
    queryKey: ['search-autocomplete', keyword],
    queryFn: () => getSearchAutocomplete(keyword),
  })

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

  return (
    <Modal
      isOpen={isOpen}
      handleModal={handleModal}
      dimColor="rgba(255, 255, 255, 0.8)"
      position={searchConRef}
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
  )
}
