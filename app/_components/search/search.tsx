import { styled } from 'styled-components'
import { media } from '../../_styles/media'

const SearchCon = styled.div`
  width: 420px;
  height: 40px;
  border: #dddddd solid;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  &:hover,
  &:focus-within,
  &:active {
    border: #b5b5b5 solid;
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
`

const Icon = styled.img`
  margin: 8px 12px;
  font-size: 16px;
`

export function Search() {
  return (
    <SearchCon>
      <Icon src="images/search-icon.svg" />
      <Input placeholder="검색어를 입력해 주세요." />
      <div></div>
    </SearchCon>
  )
}
