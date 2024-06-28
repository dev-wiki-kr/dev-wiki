'use client'
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react'

interface SearchPosition {
  top: number
  left: number
}

interface SearchContainerPositionContextValue {
  value: HTMLDivElement | null
  handleRefChange: (node: HTMLDivElement) => void
}

export const SearchContainerPositionContext =
  createContext<SearchContainerPositionContextValue | null>(null)

interface SearchContainerPostionProviderProps {
  children: ReactNode
}

export function SearchContainerPostionProvider({ children }: SearchContainerPostionProviderProps) {
  const [searchNode, setSearchNode] = useState<HTMLDivElement | null>(null)

  const handleRefChange = (node: HTMLDivElement) => {
    setSearchNode(node)
  }

  return (
    <SearchContainerPositionContext.Provider value={{ value: searchNode, handleRefChange }}>
      {children}
    </SearchContainerPositionContext.Provider>
  )
}

export function useSearchContainerPosition() {
  const value = useContext(SearchContainerPositionContext)

  if (!value) {
    throw new Error('Provider 초기화가 되지 않았습니다.')
  }

  const getModalPosition = () => {
    if (!value.value) {
      return { top: 0, left: 0 }
    }

    const { top, left } = value.value.getBoundingClientRect()

    return { top: top + value.value.offsetHeight, left }
  }

  return { position: getModalPosition(), handleRefChange: value.handleRefChange }
}
