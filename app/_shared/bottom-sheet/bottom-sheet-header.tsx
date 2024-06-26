import { HTMLProps, forwardRef } from 'react'
import { styled } from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem 1rem 0.5rem 0.75rem;
`

export const BottomSheetHeader = forwardRef<HTMLHeadingElement, HTMLProps<HTMLHeadingElement>>(
  function BottomSheetHeader(props, ref) {
    return (
      <HeaderWrapper ref={ref} {...props}>
        {props.children}
      </HeaderWrapper>
    )
  },
)
