import { ButtonHTMLAttributes, forwardRef } from 'react'
import { useBottomSheetContext } from './context'
import { styled } from 'styled-components'

const Button = styled.button`
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
`

export const BottomSheetClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function BottomSheetClose(props, ref) {
  const { setOpen } = useBottomSheetContext()
  return (
    <Button type="button" {...props} ref={ref} onClick={() => setOpen(false)}>
      <img src="/icons/close.svg" />
    </Button>
  )
})
