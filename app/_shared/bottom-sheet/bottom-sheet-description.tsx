import { useId } from '@floating-ui/react'
import { HTMLProps, forwardRef, useLayoutEffect } from 'react'
import { useBottomSheetContext } from './context'

export const BottomSheetDescription = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement>
>(function BottomSheetDescription(props, ref) {
  const { setDescriptionId } = useBottomSheetContext()
  const id = useId()

  useLayoutEffect(() => {
    setDescriptionId(id)
    return () => setDescriptionId(undefined)
  }, [id, setDescriptionId])

  return (
    <p {...props} ref={ref} id={id}>
      {props.children}
    </p>
  )
})
