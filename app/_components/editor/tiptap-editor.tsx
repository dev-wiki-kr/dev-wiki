import { useEditor, EditorContent, ReactNodeViewRenderer, Extensions } from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import { CodeBlock } from './code-block'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import StarterKit from '@tiptap/starter-kit'
import './code-block-style.css'
import './placeholder.css'
import { useCallback, useEffect, useRef } from 'react'
import TableColumnMenu from './table-menu'
import { TableCell, tableCellPluginKey } from './table-cell'

const lowlight = createLowlight(all)

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Placeholder.configure({
    placeholder: '글을 작성해주세요.',
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty',
    showOnlyWhenEditable: true,
  }),
  Link.configure({
    defaultProtocol: 'https',
    protocols: ['https'],
  }),
  Table,
  TableRow,
  TableHeader,
  TableCell,
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlock)
    },
  }).configure({ lowlight }),
]
// 제출형식 -> https://tiptap.dev/docs/guides/output-json-html
// https://tiptap.dev/docs/examples/advanced/syntax-highlighting -> code syntax highlighting (code-block-lowlight)
// @tiptap-pro/extension-drag-handle => 드래그
// @tiptap-pro/extension-file-handler -> 파일 드래그해서 업로드
// @tiptap-pro/extension-table-of-contents => Toc
// Link
// @tiptap/extension-placeholder
/**
 * @tiptap/extension-table
@tiptap/extension-table-header
@tiptap/extension-table-row
 * 
 */
//https://tiptap.dev/docs/examples/experiments/slash-commands#page-title -> / commands -> https://codesandbox.io/p/sandbox/tiptap-react-slash-command-e3j3u?file=%2Fsrc%2Ftiptap.jsx%3A4%2C46-4%2C51
// https://tiptap.dev/docs/examples/experiments/trailing-node -> trailing node
// @tiptap-pro/extension-unique-id
// custom h1, h2가 되는지 파악필요.
// ``` 누르면 바로 코드블록 됬으면함. enter없이

// h1, h2 처리 CustomHeading에서 바로 div, h1들로 때려박을 수 있지 않을까? 가능해보임.
// h1일때 1. xxx 등 무조건 숫자가 나오도록 validation이 필요.
// bold, code등의 Style처리 필요함.

const content = '<p>Hello World!</p>'

export const Tiptap = () => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const editor = useEditor({
    extensions: extensions as Extensions,
    content,
  })

  if (editor === null) {
    return null
  }

  const handleSetLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const handleTableSetting = () => {
    editor.on('selectionUpdate', ({ editor: editorInstance }) => {
      const pos = editorInstance.view.state.selection.$head.pos

      const transaction = editorInstance.state.tr.setMeta(tableCellPluginKey, {
        showBubbleMenu: false,
        position: pos,
      })

      editorInstance.view.dispatch(transaction)
    })
  }

  useEffect(() => {
    handleTableSetting()
  }, [])

  return (
    <>
      <button onClick={handleSetLink} className={editor.isActive('link') ? 'is-active' : ''}>
        Set link
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        Unset link
      </button>
      <button
        onClick={() => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }}
      >
        set table
      </button>
      <button onClick={() => editor.chain().focus()}>Add row after</button>

      <div ref={editorRef}>
        <EditorContent editor={editor} width={1200}></EditorContent>
        <TableColumnMenu editor={editor} appendTo={editorRef} />
      </div>
    </>
  )
}

// 1. table column 부여 방식 처리
// 2. / command 처리
// 3. text menu 처리
// 3. drap handle 처리
// 4. file handler 처리
// 5. table of contents 처리
// 6. custom h1, h2 처리
// 7. trailing node 처리
// 8. custom link 처리
