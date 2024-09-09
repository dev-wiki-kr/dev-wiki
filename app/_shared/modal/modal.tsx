import React from 'react'
import styled from 'styled-components'

const ModalOuter = styled.div<{ $dimColor?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$dimColor || 'rgba(0, 0, 0, 0.4)'};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div<{ $top?: number; $left?: number }>`
  position: absolute;
  top: ${(props) => props.$top || 0}px;
  left: ${(props) => props.$left || 0}px;
`

interface ModalProps {
  isOpen: boolean
  handleModal: () => void
  children: React.ReactNode
  position?: { top: number; left: number }
  dimColor?: string
}

export function Modal({
  isOpen,
  handleModal,
  children,
  position,
  dimColor,
}: ModalProps): JSX.Element | null {
  if (!isOpen) return null

  return (
    <ModalOuter $dimColor={dimColor} onClick={handleModal}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $top={position?.top}
        $left={position?.left}
      >
        {children}
      </ModalContent>
    </ModalOuter>
  )
}
