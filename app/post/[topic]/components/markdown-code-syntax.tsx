'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {value}
    </SyntaxHighlighter>
  )
}

export const InlineCode = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <code
      style={{ backgroundColor: '#f0f0f0', padding: '2px 4px', borderRadius: '3px', color: 'red' }}
    >
      {children}
    </code>
  )
}
