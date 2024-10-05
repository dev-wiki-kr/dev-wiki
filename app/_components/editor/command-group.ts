import { Command } from './slash-menu-list'

export interface Group {
  name: string
  title: string
  commands: Command[]
}

export const GROUPS: Group[] = [
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: '테이블',
        label: '테이블',
        iconName: 'Table',
        description: 'Insert a table',
        shouldBeHidden: (editor) => editor.isActive('columns'),
        action: (editor) => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        name: '구분선',
        label: '구분선',
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
    ],
  },
]

export default GROUPS
