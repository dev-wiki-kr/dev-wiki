import { HTMLProps, forwardRef } from 'react'
import { styled } from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
