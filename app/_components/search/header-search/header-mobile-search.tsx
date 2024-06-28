import styled from 'styled-components'

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 8px 12px;
`

const Container = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: #dddddd solid;
`

interface HeaderMobileSearchProps {
  onClick: () => void
}

export function HeaderMobileSearch({ onClick }: HeaderMobileSearchProps) {
  return (
    <Container onClick={onClick}>
      <SearchIcon src="/images/search-icon.svg" />
    </Container>
  )
}
