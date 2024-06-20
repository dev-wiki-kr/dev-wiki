'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AccordionContextValue {
  expand: Record<string, boolean>
  toggle: (key: string) => void
  initialize: (key: string) => void
}

export const AccordionContext = createContext<AccordionContextValue | null>(null)

interface AccordionProviderProps {
  children: ReactNode
}

export function AccordionProvider({ children }: AccordionProviderProps) {
  const [expand, setExpand] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setExpand((prevState) => {
      const isOpen = !prevState[key]
      const newState = { ...prevState, [key]: isOpen }

      if (isOpen) {
        // 하위 아코디언 열기
        Object.keys(prevState).forEach((childKey) => {
          if (childKey.startsWith(key + '.') && childKey !== key) {
            newState[childKey] = true
          }
        })
      } else {
        // 하위 아코디언 닫기
        Object.keys(prevState).forEach((childKey) => {
          if (childKey.startsWith(key + '.') && childKey !== key) {
            newState[childKey] = false
          }
        })
      }

      return newState
    })
  }

  const initialize = (key: string) => {
    setExpand((prevState) => ({
      ...prevState,
      [key]: prevState[key] || true,
    }))
  }

  return (
    <AccordionContext.Provider value={{ expand, toggle, initialize }}>
      {children}
    </AccordionContext.Provider>
  )
}

export function useAccordionContext() {
  const value = useContext(AccordionContext)

  if (!value) {
    throw new Error('Provider 초기화가 되지 않았습니다.')
  }

  return value
}
