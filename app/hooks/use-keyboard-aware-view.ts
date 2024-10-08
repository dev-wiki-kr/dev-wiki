import { useEffect, useState } from 'react'
import { isIOSClient, isMobileClient } from '../_util/platform'

interface KeyboardAwareViewInfo {
  isKeyboardOpen: boolean
  keyboardHeight: number
  viewportHeight: number
}

export function useKeyboardAwareView(): KeyboardAwareViewInfo {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardAwareViewInfo>({
    isKeyboardOpen: false,
    keyboardHeight: 0,
    viewportHeight: window.innerHeight,
  })

  useEffect(() => {
    if (!isMobileClient() || !window.visualViewport) {
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

    if (isIOSClient()) {
      window.addEventListener('scroll', handleScroll)
    } else {
      window.visualViewport.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.visualViewport!.removeEventListener('resize', handleResize)
      if (isIOSClient()) {
        window.removeEventListener('scroll', handleScroll)
      } else {
        window.visualViewport!.removeEventListener('scroll', handleScroll)
      }
    }
  }, [keyboardInfo.isKeyboardOpen])

  return keyboardInfo
}
