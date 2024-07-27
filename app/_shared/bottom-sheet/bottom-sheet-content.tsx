import {
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react'
import { HTMLProps, forwardRef } from 'react'
import { useBottomSheetContext } from './context'
import styled from 'styled-components'

const Dimmed = styled(FloatingOverlay)`
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  justify-items: center;
  z-index: 50;
  transition: opacity cubic-bezier(0.32, 0.72, 0, 1);
`

const Content = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 50;

  background-color: ${({ theme }) => theme.colors.neutral[0]};

  height: 80vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: transform cubic-bezier(0.32, 0.72, 0, 1);
`

export const BottomSheetContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function BottomSheetContent(props, ref) {
    const { context: floatingContext, ...context } = useBottomSheetContext()

    const { isMounted: isDimmerMounted, styles: dimmerStyles } = useTransitionStyles(
      floatingContext,
      {
        duration: 400,
        initial: {
          opacity: 0,
        },
        open: {
          opacity: 1,
        },
        close: {
          opacity: 0,
        },
      },
    )

    const { isMounted: isContentMounted, styles: contentStyles } = useTransitionStyles(
      floatingContext,
      {
        duration: 500,
        initial: {
          transform: 'translate3d(0, 100%, 0)',
        },
        open: {
          transform: 'translate3d(0, 0, 0)',
        },
        close: {
          transform: 'translate3d(0, 100%, 0)',
        },
      },
    )

    ref = useMergeRefs([context.refs.setFloating, ref])

    if (!isDimmerMounted || !isContentMounted) {
      return null
    }

    return (
      <FloatingPortal>
        <Dimmed style={dimmerStyles} lockScroll />
        <FloatingFocusManager context={floatingContext}>
          <Content
            ref={ref}
            style={contentStyles}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </Content>
        </FloatingFocusManager>
      </FloatingPortal>
    )
  },
)
