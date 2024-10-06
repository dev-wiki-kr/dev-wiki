import { Editor } from '@tiptap/core'
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'

export interface ShouldShowProps {
  editor?: Editor
  view: EditorView
  state?: EditorState
  oldState?: EditorState
  from?: number
  to?: number
}
