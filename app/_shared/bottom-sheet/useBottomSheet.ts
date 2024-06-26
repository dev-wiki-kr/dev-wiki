import { useFloating, useClick, useDismiss, useRole, useInteractions } from '@floating-ui/react'
import { useMemo, useState } from 'react'

export interface BottomSheetOptions {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function useBottomSheet({ open, onOpenChange }: BottomSheetOptions) {
  const [labelId, setLabelId] = useState<string | undefined>()
  const [descriptionId, setDescriptionId] = useState<string | undefined>()

  const data = useFloating({
    open,
    onOpenChange,
  })

  const context = data.context

  const click = useClick(context)
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen: onOpenChange,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, onOpenChange, interactions, data, labelId, descriptionId],
  )
}
