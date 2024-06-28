import { useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const handleModal = () => {
    setIsOpen((prevState) => !prevState)
  }
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  return { isOpen, handleModal, openModal, closeModal }
}
