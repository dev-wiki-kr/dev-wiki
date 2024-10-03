import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { tableCellPluginKey } from './table-cell'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 4px 11px rgba(0, 0, 0, 0.18);
`

const Button = styled.button`
  padding: 5px;
  margin: 5px 0;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e5e5;
  }
`

export const TableColumnMenu = ({ editor, appendTo }): JSX.Element => {
  const shouldShow = ({ view, state, from }) => {
    const pluginState = tableCellPluginKey.getState(editor.state)
    console.log({ pluginState })

    return pluginState?.showBubbleMenu || false
  }

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        offset: [30, 30],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        placement: 'right',
        hideOnClick: true,
      }}
      shouldShow={shouldShow}
    >
      <Container>
        <Button onClick={onAddColumnBefore}>왼쪽에 열 추가</Button>
        <Button onClick={onAddColumnAfter}>오른쪽에 열 추가</Button>
        <Button onClick={onAddRowAfter}>아래에 행 추가</Button>
        <Button onClick={onDeleteColumn}>열 제거</Button>
        <Button onClick={onDeleteRow}>행 제거</Button>
      </Container>
    </BaseBubbleMenu>
  )
}

export default TableColumnMenu
