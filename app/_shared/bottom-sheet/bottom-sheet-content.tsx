import {
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  useMergeRefs,
} from '@floating-ui/react'
import { HTMLProps, forwardRef, useEffect, useRef, useState } from 'react'
import { useBottomSheetContext } from './context'
import { styled, keyframes } from 'styled-components'

const enter = keyframes`
  0% {
  opacity: 1;
  }
`

const exit = keyframes`
  to {
    opacity: 0;
  }
`

const slideIn = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`

const slideOut = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 120%, 0);
  }
`

const Dimmed = styled(FloatingOverlay).withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  justify-items: center;
  z-index: 50;

  animation: ${({ isOpen }) => (isOpen ? enter : exit)} 0.15s forwards;
`

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 50;

  background-color: ${({ theme }) => theme.colors.neutral[0]};

  height: 80vh;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s cubic-bezier(0.32, 0.72, 0, 1)
    forwards;
`

export const BottomSheetContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function BottomSheetContent(props, ref) {
    const { context: floatingContext, ...context } = useBottomSheetContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const dimmerRef = useRef<HTMLDivElement>(null)
    const [isMounted, setMounted] = useState(false)

    ref = useMergeRefs([context.refs.setFloating, ref, contentRef]) // ref 병합

    useEffect(() => {
      if (floatingContext.open) {
        setMounted(true)
      } else if (contentRef.current) {
        const handleAnimationEnd = () => {
          setMounted(false)
        }

        const contentElement = contentRef.current

        contentElement?.addEventListener('animationend', handleAnimationEnd)

        return () => {
          if (handleAnimationEnd && contentElement) {
            contentElement.removeEventListener('animationend', handleAnimationEnd)
          }
        }
      }
    }, [floatingContext.open])

    if (!isMounted) {
      return null
    }

    return (
      <FloatingPortal>
        <Dimmed ref={dimmerRef} isOpen={floatingContext.open} lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <Content
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              isOpen={floatingContext.open}
              {...context.getFloatingProps(props)}
            >
              {props.children}
            </Content>
          </FloatingFocusManager>
        </Dimmed>
      </FloatingPortal>
    )
  },
)
