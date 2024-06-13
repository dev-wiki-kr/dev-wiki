import { styled } from 'styled-components'
import { media } from '../../_styles/media'
import { useState } from 'react'
import { Modal } from '../../_shared/modal/modal'

const SearchCon = styled.div`
  width: 420px;
  height: 40px;
  border: #dddddd solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  align-items: center;

  display: flex;
  &:hover {
    border: #b5b5b5 solid;
  }
  ,
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
  const [searchData, setSearchData] = useState(mockup)
  const [handleModal, setHandleModal] = useState(false)
  const toggleModal = () => {
    setHandleModal(!handleModal)
  }

  return (
    <div>
      <SearchCon onClick={toggleModal}>
        <SearchIcon src="images/search-icon.svg" />
        <Input placeholder="검색어를 입력해 주세요." />
        <XIcon src="images/X-mark copy.svg" />
      </SearchCon>
      <Modal>
        <StyledSearchResultCon>
          {searchData.map((data, index) => (
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
