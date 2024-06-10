import { styled } from 'styled-components'
import { media } from '../../_styles/media'

const Icon = styled.img`
  ${media.phone`
    height: 250px;
  `}
`

export function Search() {
  return (
    <form>
      <Icon src="images/search-icon.svg" />
      <input />
      <button />
    </form>
  )
}
