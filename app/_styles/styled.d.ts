import { CSSProp } from 'styled-components'
import type { Colors, Typo } from './theme'
import 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
    typo: Typo
  }
}
