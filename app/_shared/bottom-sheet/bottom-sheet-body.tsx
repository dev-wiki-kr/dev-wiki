import { HTMLProps, forwardRef } from 'react'
import { styled } from 'styled-components'

const BodyWrapper = styled.div``

export const BottomSheetBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function BottomSheetBody(props, ref) {
    return (
      <BodyWrapper ref={ref} {...props}>
        {props.children}
      </BodyWrapper>
    )
  },
)
