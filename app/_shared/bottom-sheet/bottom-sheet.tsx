import { BottomSheetOptions } from './useBottomSheet'
import { BottomSheetProvider } from './context'
import { type PropsWithChildren } from 'react'

export const BottomSheet = ({ children, ...options }: PropsWithChildren<BottomSheetOptions>) => {
  return <BottomSheetProvider {...options}>{children}</BottomSheetProvider>
}
