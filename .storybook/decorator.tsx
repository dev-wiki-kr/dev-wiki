import React from 'react'
import { StoryFn } from '@storybook/react/*'
import { GlobalStyle } from '../app/_styles/global-style'

export function globalStyleDecortor(Story: StoryFn) {
  return (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
}
