import type { Meta, StoryObj } from '@storybook/react'
import { AuthorInfo } from './author-info'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components / Author',
  component: AuthorInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthorInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => <AuthorInfo tag="author" src="chduhwan" username="chaduhwan" />,
  args: {
    tag: 'author',
    src: 'chaduhwan',
    username: 'chadhwan',
  },
}
