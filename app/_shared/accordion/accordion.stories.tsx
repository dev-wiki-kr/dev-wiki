import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './accordion'
import { AccordionTitle } from './accordion-title'
import { AccordionDescription } from './accordion-description'
import { H2 } from '../heading'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared / Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Accordion>
      <AccordionTitle>
        <H2>1. 개요</H2>
      </AccordionTitle>
      <AccordionDescription>테스트입니다.</AccordionDescription>
    </Accordion>
  ),
  args: {
    children: <></>,
  },
}
