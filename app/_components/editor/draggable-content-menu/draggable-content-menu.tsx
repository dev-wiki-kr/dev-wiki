import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { Editor } from '@tiptap/react'

import { useEffect, useState } from 'react'
import { useData } from './use-data'
import styled from 'styled-components'
import { useContentItemActions } from './use-content-menu-action'

export type DraggableContentMenuProps = {
  editor: Editor
}

const Container = styled.div`
  display: flex;
`

export const DraggableContentMenu = ({ editor }: DraggableContentMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNodePos)

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true)
    } else {
      editor.commands.setMeta('lockDragHandle', false)
    }
  }, [editor, menuOpen])

  //TODO: + 는 누르면 /command와 동일한 행동을 하도록 설정하자.

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 10],
        zIndex: 99,
      }}
    >
      <Container>
        <button onClick={() => setMenuOpen(true)}>밍</button>
        {menuOpen && (
          <button
            onClick={() => {
              actions.deleteNode()
              setMenuOpen(false)
            }}
          >
            삭제
          </button>
        )}
      </Container>
    </DragHandle>
  )
}
