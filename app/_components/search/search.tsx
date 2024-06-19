import { styled } from 'styled-components'
import { useState } from 'react'
import { Modal } from '../../_shared/modal/modal'
import { useModal } from '../../_shared/modal/useModal'
import { useQuery } from '@tanstack/react-query'

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
`

const DocumentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const StyledSearchResultCon = styled.div`
  width: 420px;
  height: 240px;
  padding: 12px;
  background: white;
  border: #b5b5b5 solid;
  border-top: none;
  border-radius: 0px 0px 8px 8px;
`

const StyledResultCon = styled.div`
  width: 396px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  font-size: 16px;
  align-items: center;
  background: white;
`

const mockup = [
  'TypeScript1',
  'TypeScript2',
  'TypeScript3',
  'TypeScript4',
  'TypeScript5',
  'TypeScript6',
]

export function Search() {
  const [searchResult, setSearchResult] = useState(mockup)
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')

  const { data } = useQuery({
    queryKey: ['SearchWiki', keyword],
    queryFn: async () => {
      const res = await fetch(`https://devwiki.co.kr/wiki-api/search/autocomplete?q=${keyword}`)
      return res
    },
    enabled: !!keyword,
  })

  return (
    <div>
      <SearchCon onClick={handleModal}>
        <SearchIcon src="images/search-icon.svg" />
        <Input
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          placeholder="검색어를 입력해 주세요."
        />
        <XIcon src="images/X-mark copy.svg" />
      </SearchCon>
      <Modal
        isOpen={isOpen}
        handleModal={handleModal}
        dimColor="none"
        position={{ top: 136, left: 0 }}
      >
        <StyledSearchResultCon>
          {searchResult.map((data, index) => (
            <StyledResultCon key={index}>
              <DocumentIcon src="images/document-icon.svg" />
              {data}
            </StyledResultCon>
          ))}
        </StyledSearchResultCon>
      </Modal>
    </div>
  )
}
