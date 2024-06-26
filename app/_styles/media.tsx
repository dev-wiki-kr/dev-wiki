import { css, CSSObject, Interpolation } from 'styled-components'

type DeviceType = 'phone'

const sizes: Record<DeviceType, number> = {
  phone: 768,
}

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: Interpolation<any>[]
    ) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  }
}, {}) as Record<DeviceType, any>

export { media }
