import { useRef, useState } from 'react'
import { useModal } from '../../../_shared/modal/useModal'

export function useHeaderSearch() {
  const { isOpen, handleModal } = useModal()
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  // const router = useRouter()
  const searchConRef = useRef<HTMLDivElement>(null) // useRef 생성

  const getModalPosition = () => {
    if (!searchConRef.current) return { top: 0, left: 0 }
    const { top, left } = searchConRef.current.getBoundingClientRect()
    return { top: top + searchConRef.current.offsetHeight, left }
  }

  const handleEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // router.push(`/post/${searchResult[0]._id}`)
    }
  }

  return {
    isOpen,
    handleModal,
    keyword,
    setKeyword,
    inputRef,
    searchConRef,
    getModalPosition,
    handleEnterKeydown,
  }
}

export function useMobileHeaderSearch() {
  return {}
}
