import { useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const handleModal = () => {
    setIsOpen((prevState) => !prevState)
  }
  return { isOpen, handleModal }
}
