import { useId } from '@floating-ui/react'
import { HTMLProps, forwardRef, useLayoutEffect } from 'react'
import { useBottomSheetContext } from './context'
import { H2 } from '../heading'

export const BottomSheetTitle = forwardRef<HTMLHeadingElement, HTMLProps<HTMLHeadingElement>>(
  function BottomSheetTitle(props, ref) {
    const { setLabelId } = useBottomSheetContext()
    const id = useId()

    useLayoutEffect(() => {
      setLabelId(id)
      return () => setLabelId(undefined)
    }, [id, setLabelId])

    return (
      <H2 id={id} ref={ref} {...props}>
        {props.children}
      </H2>
    )
  },
)
