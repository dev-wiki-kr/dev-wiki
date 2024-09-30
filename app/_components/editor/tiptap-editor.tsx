import { useEditor, EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

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
]
// 제출형식 -> https://tiptap.dev/docs/guides/output-json-html
// https://tiptap.dev/docs/examples/advanced/syntax-highlighting -> code syntax highlighting (code-block-lowlight)
// @tiptap-pro/extension-drag-handle => 드래그
// @tiptap-pro/extension-file-handler -> 파일 드래그해서 업로드
// @tiptap-pro/extension-table-of-contents => Toc
// Link
// @tiptap/extension-history
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
//

const content = '<p>Hello World!</p>'

export const Tiptap = () => {
  const { editor } = useCurrentEditor()

  return (
    <>
      <EditorProvider extensions={extensions} content={content}></EditorProvider>
    </>
  )
}
