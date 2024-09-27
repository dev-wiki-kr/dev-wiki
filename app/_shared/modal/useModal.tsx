import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleModal = () => {
    setIsOpen((prevState) => !prevState)
    if (!isOpen) {
      router.push(`${pathname}#open`, { scroll: false })
    } else {
      router.push(`${pathname}`, { scroll: true })
    }
  }

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#open') {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [pathname])

  return { isOpen, handleModal }
}
