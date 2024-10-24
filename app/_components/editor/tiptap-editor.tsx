'use client'

import {
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
  Extensions,
  BubbleMenu,
  Editor,
} from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import { CodeBlock } from './code-block'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import FileHandler from '@tiptap-pro/extension-file-handler'

import StarterKit from '@tiptap/starter-kit'
import './code-block-style.css'
import './placeholder.css'
import { useCallback, useEffect, useRef } from 'react'
import TableColumnMenu from './table-menu'
import { TableCell, tableCellPluginKey } from './table-cell'
import SlashCommand from './slash-command'
import { TextDragMenu } from './text-drag-menu/text-drag-menu'
import { DraggableContentMenu } from './draggable-content-menu/draggable-content-menu'
import { uploadImage } from '../../_service/editor'
import { TrailingNode } from './trailing-node'
import Heading from '@tiptap/extension-heading'
import { HeadingComponent } from './custom-heading'

const lowlight = createLowlight(all)

function calculateHeadingNumbers(doc: Editor['state']['doc']) {
  const numbers: number[] = [] // 각 레벨의 번호를 저장
  const headingNodes: { node: any; tag: string }[] = [] // 노드와 태그 저장

  doc.forEach((node) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level
      // 해당 레벨의 번호 계산 및 저장
      numbers[level - 1] = (numbers[level - 1] || 0) + 1
      // 하위 레벨 초기화
      numbers.fill(0, level)
      // 번호 형식을 생성 ("1", "1.1", "1.1.1")
      const tag = numbers.slice(0, level).join('.')
      headingNodes.push({ node, tag })
    }
  })

  return headingNodes
}

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
    heading: false,
  }),
  Placeholder.configure({
    placeholder: '텍스트를 입력하거나 / 커맨드를 입력하세요',
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty',
    showOnlyWhenEditable: true,
    showOnlyCurrent: true,
  }),
  Link.configure({
    defaultProtocol: 'https',
    protocols: ['https'],
  }),
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Underline,
  Image,
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlock)
    },
  }).configure({ lowlight }),
  SlashCommand,
  Image,
  TrailingNode,
  Heading.extend({
    addNodeView() {
      return ReactNodeViewRenderer(HeadingComponent)
    },
  }),
  FileHandler.configure({
    allowedMimeTypes: [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/jpg',
      'image/avif',
    ],
    onDrop: (currentEditor, files, pos) => {
      const setImage = async (file: File) => {
        const image = await uploadImage({ file })

        currentEditor
          .chain()
          .insertContentAt(pos, {
            type: 'image',
            attrs: {
              src: image.cloudFrontUrl,
            },
          })
          .focus()
          .run()
      }

      files.forEach((file) => {
        setImage(file)
      })
    },
    onPaste: (currentEditor, files, htmlContent) => {
      const setImage = async (file: File) => {
        const image = await uploadImage({ file })

        currentEditor
          .chain()
          .insertContentAt(currentEditor.state.selection.anchor, {
            type: 'image',
            attrs: {
              src: image.cloudFrontUrl,
            },
          })
          .focus()
          .run()
      }

      files.forEach((file) => {
        if (htmlContent) {
          // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
          // you could extract the pasted file from this url string and upload it to a server for example
          console.log(htmlContent) // eslint-disable-line no-console
          return false
        }

        setImage(file)
      })
    },
  }),
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
    immediatelyRender: false,
  })

  const handleSetLink = () => {
    if (editor === null) {
      return
    }

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
  }

  const handleTableSetting = useCallback(() => {
    if (editor === null) {
      return
    }

    editor.on('selectionUpdate', ({ editor: editorInstance }) => {
      const pos = editorInstance.view.state.selection.$head.pos

      const transaction = editorInstance.state.tr.setMeta(tableCellPluginKey, {
        showBubbleMenu: false,
        position: pos,
      })

      editorInstance.view.dispatch(transaction)
    })
  }, [editor])

  useEffect(() => {
    handleTableSetting()
  }, [editor])

  if (editor === null) {
    return null
  }

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
      <button
        onClick={() => {
          console.log(editor.getJSON())
        }}
      >
        getJSON
      </button>

      <div ref={editorRef}>
        <TextDragMenu editor={editor} />
        <EditorContent editor={editor} width={500}></EditorContent>
        <DraggableContentMenu editor={editor} />
        <TableColumnMenu editor={editor} appendTo={editorRef} />
      </div>
    </>
  )
}

// 1. table column 부여 방식 처리 x
// 2. / command 처리 x
// 3. text menu 처리 x
// 4. reference menu 처리
// 3. drag handle 처리 x
// 4. file handler 처리 - x
// 5. table of contents 처리
// 6. custom h1, h2 처리
// 7. trailing node 처리 - x
// 8. custom link 처리
