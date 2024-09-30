import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { NodeViewProps } from '@tiptap/core'
import styled from 'styled-components'

const StyledNodeViewWrapper = styled(NodeViewWrapper)`
  position: relative;

  select {
    position: absolute;
    background-color: #fff;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="Black" d="M7 10l5 5 5-5z"/></svg>')
      no-repeat;
    right: 0.5rem;
    top: 0.5rem;
  }
`

export const CodeBlock: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  extension,
  editor,
}) => {
  const { language } = node.attrs

  return (
    <StyledNodeViewWrapper className="code-block">
      <select
        contentEditable={false}
        defaultValue={language}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </StyledNodeViewWrapper>
  )
}
