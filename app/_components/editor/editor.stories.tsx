import type { Meta, StoryObj } from '@storybook/react'
import { Tiptap } from './tiptap-editor'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components / Tiptap',
  component: Tiptap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tiptap>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => <Tiptap />,
}
