import { SKIP, visit } from 'unist-util-visit'
import { headingRank } from 'hast-util-heading-rank'

import type { Element, ElementContent, Root, Text } from 'hast'

export const autoLinkHeadings = () => {
  return function (tree: Root) {
    if (!tree || !tree.children) {
      console.error('DOM tree 초기화에 실패했습니다.')
      return
    }

    // 문서의 모든 'element' 타입 노드를 순회
    visit(tree, 'element', (node) => {
      // 헤딩 태그 중 id 속성이 있는 노드를 대상으로 함
      if (headingRank(node) && node.properties && node.properties.id) {
        // 헤딩 노드 children에서 숫자와 나머지 텍스트 분리
        const { numberTag, text } = splitTextNode(node.children)

        if (numberTag && text) {
          const anchorLink = createAnchorLink(node, numberTag)
          const spanElement = createSpanElement(text)
          const spaceNode = createSpaceNode()

          // 원래 텍스트 노드를 anchorLink와 spanElement로 대체
          node.children = [anchorLink, spaceNode, spanElement]
        }
        // 하위 노드 순회하지 않음
        return SKIP
      }
    })
  }
}

const createAnchorLink = (node: Element, numberTag: string): Element => {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: `#${node.properties.id}`,
      dataId: 'accordionAnchor',
      className: ['anchor'],
    },
    children: [{ type: 'text', value: numberTag }],
  }
}

const createSpanElement = (text: string): Element => {
  return {
    type: 'element',
    tagName: 'span',
    properties: {},
    children: [{ type: 'text', value: text }],
  }
}

const createSpaceNode = (): Text => {
  return {
    type: 'text',
    value: ' ',
  }
}

const splitTextNode = (children: Element['children']): { numberTag: string; text: string } => {
  let text = ''
  for (const child of children) {
    if (isText(child)) {
      text += child.value
    }
  }

  const match = text.match(/^(\d+(\.\d+)*\.?)(?:\s+)(.*)/)
  if (match) {
    return { numberTag: match[1], text: match[3] }
  }
  return { numberTag: '', text: text }
}

const isText = (node: ElementContent): node is Text => {
  return node.type === 'text'
}
