import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleModal = () => {
    setIsOpen((prevState) => !prevState)
  }

  useEffect(() => {
    if (isOpen) {
      router.push(`${pathname}#modal`, { scroll: false })
    } else {
      router.push(`${pathname}`)
    }
  }, [isOpen])
  return { isOpen, handleModal }
}
