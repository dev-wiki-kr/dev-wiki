import { useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const handleModal = () => {
    setIsOpen((prevState) => !prevState)
  }
  const OpenModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  return { isOpen, handleModal, OpenModal, closeModal }
}
