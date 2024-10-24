import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { NodeViewProps } from '@tiptap/core'
import styled from 'styled-components'
import { CustomHeading } from '../../_shared/heading'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const StyledNodeViewWrapper = styled(NodeViewWrapper)`
  position: relative;
`

export const HeadingComponent: React.FC<NodeViewProps> = ({ node, editor, getPos }) => {
  const [numbering, setNumbering] = useState('')

  const tag = node.attrs.tag || ''
  const level = node.attrs.level === 1 ? 2 : node.attrs.level

  useEffect(() => {
    const updateNumbering = () => {
      const doc = editor.state.doc
      const headingCounts = [0, 0, 0, 0, 0] // h2 ~ h6 추적 (5개 레벨)

      doc.descendants((child, pos) => {
        if (child.type.name === 'heading' && child.attrs.level > 1) {
          const level = child.attrs.level - 2 // h2 = 0, h3 = 1, ...

          // 헤더 번호 증가 및 하위 레벨 초기화
          headingCounts[level]++
          for (let i = level + 1; i < headingCounts.length; i++) {
            headingCounts[i] = 0
          }

          // 번호 생성 (예: 1.1, 2.1 등)
          const generatedNumbering = headingCounts.slice(0, level + 1).join('.')

          // 현재 헤더에 번호 부여
          if (getPos() === pos) {
            setNumbering(generatedNumbering)
          }
        }
      })
    }

    // 에디터가 업데이트될 때마다 번호 갱신
    editor.on('update', updateNumbering)

    return () => {
      editor.off('update', updateNumbering)
    }
  }, [editor, getPos])

  return (
    <StyledNodeViewWrapper className="heading">
      <CustomHeading level={level}>
        <Link
          href={`#${tag}`}
          id={`#${tag}`}
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="anchor"
        >
          {/* 현재 setState를 통해 이 값을 변경하려고 하면 줄 바꿈 발생, 그냥 박아넣을시 줄바꿈 x */}
          {`${numbering}`}
        </Link>
        <NodeViewContent as="span" />
      </CustomHeading>
    </StyledNodeViewWrapper>
  )
}
