import { Editor, useEditorState } from '@tiptap/react'
import { useCallback } from 'react'
import { isCustomNodeSelected, isTextSelected } from './util'
import { ShouldShowProps } from '../type'

export const useTextmenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold'),
        isItalic: ctx.editor.isActive('italic'),
        isStrike: ctx.editor.isActive('strike'),
        isUnderline: ctx.editor.isActive('underline'),
        isCode: ctx.editor.isActive('code'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        // isSubscript: ctx.editor.isActive('subscript'),
        // isSuperscript: ctx.editor.isActive('superscript'),
      }
    },
  })

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view || editor.view.dragging) {
        return false
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
      const node = nodeDOM || domAtPos

      console.log({ node })

      if (isCustomNodeSelected(editor, node)) {
        return false
      }

      return isTextSelected({ editor })
    },
    [editor],
  )

  return {
    shouldShow,
    ...states,
  }
}
