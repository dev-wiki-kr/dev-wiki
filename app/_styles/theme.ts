import { type DefaultTheme } from 'styled-components'

const colors = {
  blue: {
    50: '#f0f3ffff',
    100: '#cfdbffff',
    200: '#acc5ffff',
    300: '#86aeffff',
    400: '#5d99ffff',
    500: '#2b85f7ff',
    600: '#007df0ff',
    700: '#005ec5ff',
    800: '#004ba4ff',
    900: '#00397dff',
  },
  neutral: {
    0: '#ffffffff',
    50: '#f3f3f3ff',
    100: '#ddddddff',
    200: '#c9c9c9ff',
    300: '#b5b5b5ff',
    400: '#969696ff',
    500: '#777777ff',
    600: '#666666ff',
    700: '#555555ff',
    800: '#3b3b3bff',
    900: '#222222ff',
  },
} as const

const typo = {
  caption_12: {
    fontSize: '12px',
    lineHeight: '16.8px',
    fontWeight: 600,
  },
  body3_14: {
    fontSize: '14px',
    lineHeight: '19.6px',
    fontWeight: 500,
  },
  body2_16: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
  },
  body1_18: {
    fontSize: '18px',
    lineHeight: '27px',
    fontWeight: 500,
  },
  h6: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
  },
  h5: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
  },
  h4: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
  },
  h3: {
    fontSize: '22px',
    lineHeight: '26.4px',
    fontWeight: 700,
  },
  h2: {
    fontSize: '24px',
    lineHeight: '28.8px',
    fontWeight: 700,
  },
  h1: {
    fontSize: '48px',
    lineHeight: '57.6px',
    fontWeight: 700,
  },
} as const

export const theme: DefaultTheme = {
  colors,
  typo,
} as const

export type Colors = typeof colors
export type ColorKeys = keyof typeof colors

export type Typo = typeof typo
export type TypoKeys = keyof typeof typo
