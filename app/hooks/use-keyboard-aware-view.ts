import { useEffect, useState } from 'react'

interface KeyboardAwareViewInfo {
  isKeyboardOpen: boolean
  keyboardHeight: number
  viewportHeight: number
}

// FIXME: 더 다양한 기기에 대응할 수 있어야함
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

export function useKeyboardAwareView(): KeyboardAwareViewInfo {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardAwareViewInfo>({
    isKeyboardOpen: false,
    keyboardHeight: 0,
    viewportHeight: window.innerHeight,
  })

  useEffect(() => {
    if (!isMobile || !window.visualViewport) {
      return
    }

    const INITIAL_VIEWPORT_HEIGHT = window.innerHeight

    function handleResize() {
      const currentViewportHeight = window.visualViewport!.height
      const keyboardHeight = Math.max(0, INITIAL_VIEWPORT_HEIGHT - currentViewportHeight)

      setKeyboardInfo({
        isKeyboardOpen: keyboardHeight > 0,
        keyboardHeight,
        viewportHeight: currentViewportHeight,
      })
    }

    function handleScroll() {
      if (keyboardInfo.isKeyboardOpen) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }

        setKeyboardInfo((prevState) => ({
          ...prevState,
          isKeyboardOpen: false,
          keyboardHeight: 0,
          viewportHeight: window.innerHeight,
        }))
      }
    }

    window.visualViewport.addEventListener('resize', handleResize)

    if (isIOS) {
      window.addEventListener('scroll', handleScroll)
    } else {
      window.visualViewport.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.visualViewport!.removeEventListener('resize', handleResize)
      if (isIOS) {
        window.removeEventListener('scroll', handleScroll)
      } else {
        window.visualViewport!.removeEventListener('scroll', handleScroll)
      }
    }
  }, [keyboardInfo.isKeyboardOpen])

  return keyboardInfo
}
