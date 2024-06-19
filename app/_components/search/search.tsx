import { styled } from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { Modal } from '../../_shared/modal/modal'
import { useModal } from '../../_shared/modal/useModal'
import { useQuery } from '@tanstack/react-query'
import { Option } from './search-interface'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
const mockUp: Option[] = [
  {
    text: '리액트 훅스',
    _index: 'articles',
    _id: '1',
    _score: 0.98,
    _source: {
      title: '리액트 훅스 소개',
      content: '이 기사는 리액트 훅스를 소개하고 사용법을 설명합니다.',
    },
  },
  {
    text: '타입스크립트 기초',
    _index: 'articles',
    _id: '2',
    _score: 0.95,
    _source: {
      title: '타입스크립트 기초 이해하기',
      content: '타입스크립트 프로그래밍 언어의 기초를 배웁니다.',
    },
  },
  {
    text: '노드제이에스 REST API',
    _index: 'articles',
    _id: '3',
    _score: 0.92,
    _source: {
      title: '노드제이에스로 RESTful API 만들기',
      content: '노드제이에스를 사용하여 RESTful API를 만드는 포괄적인 가이드입니다.',
    },
  },
  {
    text: '그래프큐엘 서버',
    _index: 'articles',
    _id: '4',
    _score: 0.89,
    _source: {
      title: '그래프큐엘 서버 만들기',
      content: 'Apollo Server로 그래프큐엘 서버를 만드는 단계별 튜토리얼입니다.',
    },
  },
  {
    text: '파이썬 데이터 분석',
    _index: 'articles',
    _id: '5',
    _score: 0.85,
    _source: {
      title: '파이썬을 이용한 데이터 분석',
      content: '판다스 라이브러리를 사용하여 데이터 분석 기법을 탐색합니다.',
    },
  },
]

export function Search() {
  const [searchResult, setSearchResult] = useState<Option[]>(mockUp)
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { data, error } = useQuery({
    queryKey: ['SearchWiki', keyword],
    queryFn: async () => {
      if (!keyword) return mockUp
      const res = await fetch(`https://devwiki.co.kr/wiki-api/search/autocomplete?q=${keyword}`)
      const json = await res.json()
      const options = json.body.suggest.autocomplete[0].options
      return options
    },
  })

  const SearchForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/post/${searchResult[0]._id}`)
    }
  }

  if (error) {
    return <StyledNotFound>{keyword}에 대한 검색결과가 없습니다.</StyledNotFound>
  }

  useEffect(() => {
    if (!data) return
    setSearchResult(data)
  }, [data])

  useEffect(() => {
    if (!isOpen) {
      setKeyword('')
      setSearchResult(mockUp)
    }
  }, [isOpen])

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
