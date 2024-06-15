import { HTMLProps, forwardRef } from 'react'
import { styled } from 'styled-components'

const BodyWrapper = styled.div`
  padding: 0.5rem 0.75rem;
`

export const BottomSheetBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function BottomSheetBody(props, ref) {
    return (
      <BodyWrapper ref={ref} {...props}>
        {props.children}
      </BodyWrapper>
    )
  },
)
