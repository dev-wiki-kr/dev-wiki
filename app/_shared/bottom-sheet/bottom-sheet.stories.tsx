import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BottomSheet } from './bottom-sheet'
import { BottomSheetHeader } from './bottom-sheet-header'
import { BottomSheetContent } from './bottom-sheet-content'
import { BottomSheetDescription } from './bottom-sheet-description'
import { BottomSheetClose } from './bottom-sheet-close'
import { BottomSheetTitle } from './bottom-sheet-title'
import { BottomSheetBody } from './bottom-sheet-body'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared / BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>열기</button>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheetContent>
            <BottomSheetHeader>
              <BottomSheetTitle>바텀시트 제목</BottomSheetTitle>
              <BottomSheetClose>닫기</BottomSheetClose>
            </BottomSheetHeader>
            <BottomSheetBody>
              <BottomSheetDescription>바텀시트 내용</BottomSheetDescription>
            </BottomSheetBody>
          </BottomSheetContent>
        </BottomSheet>
      </>
    )
  },
  args: {
    children: <></>,
    open: false,
    onOpenChange: () => {},
  },
}
