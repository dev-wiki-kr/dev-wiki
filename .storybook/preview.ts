import type { Preview } from '@storybook/react'
import { globalStyleDecortor } from './decorator'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [globalStyleDecortor],
}

export default preview
