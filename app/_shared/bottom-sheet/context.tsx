import { PropsWithChildren, createContext, useContext } from 'react'
import { useBottomSheet, type BottomSheetOptions } from './useBottomSheet'

export type ContextType = ReturnType<typeof useBottomSheet> | null

export const BottomSheetContext = createContext<ContextType>(null)

export const BottomSheetProvider = ({
  children,
  ...options
}: PropsWithChildren<BottomSheetOptions>) => {
  const bottomSheet = useBottomSheet(options)
  return <BottomSheetContext.Provider value={bottomSheet}>{children}</BottomSheetContext.Provider>
}

export const useBottomSheetContext = () => {
  const value = useContext(BottomSheetContext)
  if (value === null) {
    throw new Error('Provider 초기화가 되지 않았습니다.')
  }
  return value
}
