import { createContext, useContext } from 'react'

export const AccordionContext = createContext<{ expand: boolean } | null>(null)

interface AccordionProviderProps {
  expand: boolean
  children: React.ReactNode
}

export function AccordionProvider({ expand, children }: AccordionProviderProps) {
  return <AccordionContext.Provider value={{ expand }}>{children}</AccordionContext.Provider>
}

export function useAccordionContext() {
  const value = useContext(AccordionContext)

  if (!value) {
    throw new Error('Provider 초기화가 되지 않았습니다.')
  }

  return value
}
