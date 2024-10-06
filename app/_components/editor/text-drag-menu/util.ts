import { isTextSelection } from '@tiptap/core'

import { Editor } from '@tiptap/react'

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    'link',
    'image',
    'table',
    'tableHeader',
    'tableRow',
    'tableCell',
    'codeBlock',
    'codeBlockLine',
    'heading',
    'horizontalRule',
  ]

  return customNodes.some((type) => editor.isActive(type))
}

export const isTextSelected = ({ editor }: { editor: Editor }) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor

  const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection)

  if (empty || isEmptyTextBlock || !editor.isEditable) {
    return false
  }

  return true
}
