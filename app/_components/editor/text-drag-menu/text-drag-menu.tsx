import { Editor } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/react'
import { useTextmenuStates } from './use-text-drag-menu-state'
import styled from 'styled-components'

interface TextDragMenuProps {
  editor: Editor
}

const MenuButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #f5f5f5;
  `}
`

export function TextDragMenu({ editor }: TextDragMenuProps) {
  const states = useTextmenuStates(editor)

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            popperOptions: {
              placement: 'top-start',
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    boundary: 'viewport',
                    padding: 8,
                  },
                },
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
                  },
                },
              ],
            },
            maxWidth: 'calc(100vw - 16px)',
          }}
          shouldShow={states.shouldShow}
          pluginKey="textMenu"
          updateDelay={500}
        >
          <div className="bubble-menu">
            <MenuButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={states.isBold}
            >
              Bold
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={states.isItalic}
            >
              Italic
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={states.isStrike}
            >
              Strike
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={states.isUnderline}
            >
              Underline
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={states.isCode}
            >
              Code
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={states.isCodeBlock}
            >
              Code Block
            </MenuButton>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}
